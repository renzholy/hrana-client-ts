// TypeScript types for the messages in the Hrana protocol
//
// The structure of this file follows the specification in HRANA_SPEC.md

export type int32 = number

// ## Messages

export type ClientMsg =
    | HelloMsg
    | RequestMsg

export type ServerMsg =
    | HelloOkMsg
    | HelloErrorMsg
    | ResponseOkMsg
    | ResponseErrorMsg

// ### Hello

export type HelloMsg = {
    "type": "hello",
    "jwt": string | null,
}

export type HelloOkMsg = {
    "type": "hello_ok",
}

export type HelloErrorMsg = {
    "type": "hello_error",
    "error": Error,
}

// ### Request/response

export type RequestMsg = {
    "type": "request",
    "request_id": int32,
    "request": Request,
}

export type ResponseOkMsg = {
    "type": "response_ok",
    "request_id": int32,
    "response": Response,
}

export type ResponseErrorMsg = {
    "type": "response_error",
    "request_id": int32,
    "error": Error,
}

// ### Errors

export type Error = {
    "message": string,
}

// ## Requests

export type Request =
    | OpenStreamReq
    | CloseStreamReq
    | ExecuteReq
    | ProgReq

export type Response =
    | OpenStreamResp
    | CloseStreamResp
    | ExecuteResp
    | ProgResp

// ### Open stream

export type OpenStreamReq = {
    "type": "open_stream",
    "stream_id": int32,
}

export type OpenStreamResp = {
    "type": "open_stream",
}

// ### Close stream

export type CloseStreamReq = {
    "type": "close_stream",
    "stream_id": int32,
}

export type CloseStreamResp = {
    "type": "close_stream",
}

// ### Execute a statement

export type ExecuteReq = {
    "type": "execute",
    "stream_id": int32,
    "stmt": Stmt,
}

export type ExecuteResp = {
    "type": "execute",
    "result": StmtResult,
}

export type Stmt = {
    "sql": string,
    "args"?: Array<Value>,
    "named_args"?: Array<NamedArg>,
    "want_rows": boolean,
}

export type NamedArg = {
    "name": string,
    "value": Value,
}

export type StmtResult = {
    "cols": Array<Col>,
    "rows": Array<Array<Value>>,
    "affected_row_count": number,
    "last_insert_rowid"?: string | null,
}

export type Col = {
    "name": string | null,
}

// ### Execute a program

export type ProgReq = {
    "type": "prog",
    "stream_id": int32,
    "prog": Prog,
}

export type ProgResp = {
    "type": "prog",
    "result": ProgResult,
}

// ### Programs

export type Prog = {
    "steps": Array<ProgStep>,
}

export type ProgStep =
    | ExecuteStep
    | OutputStep
    | OpStep

export type ExecuteStep = {
    "type": "execute",
    "stmt": Stmt,
    "condition"?: ProgExpr | null,
    "on_ok"?: Array<ProgOp>,
    "on_error"?: Array<ProgOp>,
}

export type OutputStep = {
    "type": "output",
    "expr": ProgExpr,
}

export type OpStep = {
    "type": "op",
    "ops": Array<ProgOp>,
}

export type ProgResult = {
    "execute_results": Array<StmtResult | null>,
    "execute_errors": Array<Error | null>,
    "outputs": Array<Value>,
}

// ### Values

export type Value =
    | { "type": "null" }
    | { "type": "integer", "value": string }
    | { "type": "float", "value": number }
    | { "type": "text", "value": string }
    | { "type": "blob", "base64": string }

// ### Program operations and expressions

export type ProgOp =
    | { "type": "set", "var": int32, "expr": ProgExpr }

export type ProgExpr =
    | Value
    | { "type": "var", "var": int32 }
    | { "type": "not", "expr": ProgExpr }
