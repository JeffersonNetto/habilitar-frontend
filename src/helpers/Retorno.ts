abstract class Response {
  Mensagem!: string;
}

export class SuccessResponse<T> extends Response {
  Dados!: T;
}

export class ErrorResponse extends Response {
  Erros!: string[];
}
