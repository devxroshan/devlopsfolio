export class HttpException extends Error {
  public statusCode: number = 500;
  public msg: string = "Internal Server Exception";
  public details: any = "An unexpected error occurred on the server.";
  public code: string = "INTERNAL_SERVER_ERROR";

  constructor(statusCode: number, msg: string, code: string, details?: any) {
    super(msg);
    this.statusCode = statusCode;
    this.msg = msg;
    this.details = details || {};
    this.code = code;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

function exceptionCode(error: unknown, fallback: string): string {
  if (
    error !== null &&
    typeof error === "object" &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }
  return fallback;
}

export class BadRequestException extends HttpException {
  constructor(
    message = "Bad Request",
    error?: { code?: string; [key: string]: unknown },
  ) {
    super(400, message, exceptionCode(error, "BAD_REQUEST"), error);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized", error?: string | object) {
    super(401, message, exceptionCode(error, "UNAUTHORIZED"), error);
  }
}

export class PaymentRequiredException extends HttpException {
  constructor(message = "Payment Required", error?: string | object) {
    super(402, message, exceptionCode(error, "PAYMENT_REQUIRED"), error);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = "Forbidden", error?: string | object) {
    super(403, message, exceptionCode(error, "FORBIDDEN"), error);
  }
}

export class NotFoundException extends HttpException {
  constructor(message = "Not Found", error?: string | object) {
    super(404, message, exceptionCode(error, "NOT_FOUND"), error);
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(message = "Method Not Allowed", error?: string | object) {
    super(405, message, exceptionCode(error, "METHOD_NOT_ALLOWED"), error);
  }
}

export class NotAcceptableException extends HttpException {
  constructor(message = "Not Acceptable", error?: string | object) {
    super(406, message, exceptionCode(error, "NOT_ACCEPTABLE"), error);
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(
    message = "Proxy Authentication Required",
    error?: string | object,
  ) {
    super(
      407,
      message,
      exceptionCode(error, "PROXY_AUTHENTICATION_REQUIRED"),
      error,
    );
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(message = "Request Timeout", error?: string | object) {
    super(408, message, exceptionCode(error, "REQUEST_TIMEOUT"), error);
  }
}

export class ConflictException extends HttpException {
  constructor(message = "Conflict", error?: string | object) {
    super(409, message, exceptionCode(error, "CONFLICT"), error);
  }
}

export class GoneException extends HttpException {
  constructor(message = "Gone", error?: string | object) {
    super(410, message, exceptionCode(error, "GONE"), error);
  }
}

export class LengthRequiredException extends HttpException {
  constructor(message = "Length Required", error?: string | object) {
    super(411, message, exceptionCode(error, "LENGTH_REQUIRED"), error);
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(message = "Precondition Failed", error?: string | object) {
    super(412, message, exceptionCode(error, "PRECONDITION_FAILED"), error);
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(message = "Payload Too Large", error?: string | object) {
    super(413, message, exceptionCode(error, "PAYLOAD_TOO_LARGE"), error);
  }
}

export class URITooLongException extends HttpException {
  constructor(message = "URI Too Long", error?: string | object) {
    super(414, message, exceptionCode(error, "URI_TOO_LONG"), error);
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message = "Unsupported Media Type", error?: string | object) {
    super(415, message, exceptionCode(error, "UNSUPPORTED_MEDIA_TYPE"), error);
  }
}

export class RangeNotSatisfiableException extends HttpException {
  constructor(message = "Range Not Satisfiable", error?: string | object) {
    super(416, message, exceptionCode(error, "RANGE_NOT_SATISFIABLE"), error);
  }
}

export class ExpectationFailedException extends HttpException {
  constructor(message = "Expectation Failed", error?: string | object) {
    super(417, message, exceptionCode(error, "EXPECTATION_FAILED"), error);
  }
}

export class ImATeapotException extends HttpException {
  constructor(message = "I am a teapot", error?: string | object) {
    super(418, message, exceptionCode(error, "IM_A_TEAPOT"), error);
  }
}

export class MisdirectedRequestException extends HttpException {
  constructor(message = "Misdirected Request", error?: string | object) {
    super(421, message, exceptionCode(error, "MISDIRECTED_REQUEST"), error);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message = "Unprocessable Entity", error?: string | object) {
    super(422, message, exceptionCode(error, "UNPROCESSABLE_ENTITY"), error);
  }
}

export class LockedException extends HttpException {
  constructor(message = "Locked", error?: string | object) {
    super(423, message, exceptionCode(error, "LOCKED"), error);
  }
}

export class FailedDependencyException extends HttpException {
  constructor(message = "Failed Dependency", error?: string | object) {
    super(424, message, exceptionCode(error, "FAILED_DEPENDENCY"), error);
  }
}

export class TooEarlyException extends HttpException {
  constructor(message = "Too Early", error?: string | object) {
    super(425, message, exceptionCode(error, "TOO_EARLY"), error);
  }
}

export class UpgradeRequiredException extends HttpException {
  constructor(message = "Upgrade Required", error?: string | object) {
    super(426, message, exceptionCode(error, "UPGRADE_REQUIRED"), error);
  }
}

export class PreconditionRequiredException extends HttpException {
  constructor(message = "Precondition Required", error?: string | object) {
    super(428, message, exceptionCode(error, "PRECONDITION_REQUIRED"), error);
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message = "Too Many Requests", error?: string | object) {
    super(429, message, exceptionCode(error, "TOO_MANY_REQUESTS"), error);
  }
}

export class RequestHeaderFieldsTooLargeException extends HttpException {
  constructor(
    message = "Request Header Fields Too Large",
    error?: string | object,
  ) {
    super(
      431,
      message,
      exceptionCode(error, "REQUEST_HEADER_FIELDS_TOO_LARGE"),
      error,
    );
  }
}

export class UnavailableForLegalReasonsException extends HttpException {
  constructor(
    message = "Unavailable For Legal Reasons",
    error?: string | object,
  ) {
    super(
      451,
      message,
      exceptionCode(error, "UNAVAILABLE_FOR_LEGAL_REASONS"),
      error,
    );
  }
}

export class InternalServerException extends HttpException {
  constructor(message = "Internal Server Exception", error?: string | object) {
    super(500, message, exceptionCode(error, "INTERNAL_SERVER_ERROR"), error);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message = "Not Implemented", error?: string | object) {
    super(501, message, exceptionCode(error, "NOT_IMPLEMENTED"), error);
  }
}

export class BadGatewayException extends HttpException {
  constructor(message = "Bad Gateway", error?: string | object) {
    super(502, message, exceptionCode(error, "BAD_GATEWAY"), error);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message = "Service Unavailable", error?: string | object) {
    super(503, message, exceptionCode(error, "SERVICE_UNAVAILABLE"), error);
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message = "Gateway Timeout", error?: string | object) {
    super(504, message, exceptionCode(error, "GATEWAY_TIMEOUT"), error);
  }
}

export class HTTPVersionNotSupportedException extends HttpException {
  constructor(message = "HTTP Version Not Supported", error?: string | object) {
    super(
      505,
      message,
      exceptionCode(error, "HTTP_VERSION_NOT_SUPPORTED"),
      error,
    );
  }
}

export class VariantAlsoNegotiatesException extends HttpException {
  constructor(message = "Variant Also Negotiates", error?: string | object) {
    super(506, message, exceptionCode(error, "VARIANT_ALSO_NEGOTIATES"), error);
  }
}

export class InsufficientStorageException extends HttpException {
  constructor(message = "Insufficient Storage", error?: string | object) {
    super(507, message, exceptionCode(error, "INSUFFICIENT_STORAGE"), error);
  }
}

export class LoopDetectedException extends HttpException {
  constructor(message = "Loop Detected", error?: string | object) {
    super(508, message, exceptionCode(error, "LOOP_DETECTED"), error);
  }
}

export class NotExtendedException extends HttpException {
  constructor(message = "Not Extended", error?: string | object) {
    super(510, message, exceptionCode(error, "NOT_EXTENDED"), error);
  }
}

export class NetworkAuthenticationRequiredException extends HttpException {
  constructor(
    message = "Network Authentication Required",
    error?: string | object,
  ) {
    super(
      511,
      message,
      exceptionCode(error, "NETWORK_AUTHENTICATION_REQUIRED"),
      error,
    );
  }
}
