import type * as proto from "./proto.js";

/** Generic error produced by the Hrana client. */
export class ClientError extends Error {
    /** @private */
    constructor(message: string) {
        super(message);
        this.name = "ClientError";
    }
}

/** Error thrown when the server violates the protocol. */
export class ProtoError extends ClientError {
    /** @private */
    constructor(message: string) {
        super(message);
        this.name = "ProtoError";
    }
}

/** Error thrown when the server returns an error response. */
export class ResponseError extends ClientError {
    /** @internal */
    proto: proto.Error

    /** @private */
    constructor(message: string, protoError: proto.Error) {
        super(message);
        this.name = "ResponseError";
        this.proto = protoError;
        this.stack = undefined;
    }
}

/** Error thrown when the client or stream is closed. */
export class ClosedError extends ClientError {
    /** @private */
    constructor(message: string, cause: Error) {
        super(message);
        this.cause = cause;
    }
}
