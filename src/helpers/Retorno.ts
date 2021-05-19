abstract class Response {
  Mensagem!: string;
}

export class SuccessResponse<T> extends Response {
  Dados!: T;
}

export class ErrorResponse {
  Erros!: string[];
}

export class CustomResponse<T> {
  Dados!: T;
}
