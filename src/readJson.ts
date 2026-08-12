import type { IncomingMessage } from "node:http";

export class InvalidJsonError extends Error {}

export class PayloadTooLargeError extends Error {}

export class RequestBodyError extends Error {}

const EMPTY_BODY = Object.freeze({});

export const readJson = async (
  req: IncomingMessage,
  limitBytes: number,
): Promise<unknown> => {
  const chunks: Buffer[] = [];
  let receivedBytes = 0;

  try {
    for await (const chunk of req) {
      const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      receivedBytes += buf.length;

      if (receivedBytes > limitBytes) {
        chunks.length = 0;
        req.resume();
        throw new PayloadTooLargeError();
      }

      chunks.push(buf);
    }
  } catch (err) {
    if (err instanceof PayloadTooLargeError) {
      throw err;
    }
    throw new RequestBodyError();
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");

  if (!rawBody) {
    return EMPTY_BODY;
  }

  try {
    return JSON.parse(rawBody) as unknown;
  } catch {
    throw new InvalidJsonError();
  }
};
