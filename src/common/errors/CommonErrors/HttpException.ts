export class HttpException extends Error {
  status: number;
  message: string;
  errors: Array<{
    path: string;
    message: string;
    error_code?: string;
  }> = [];
  path?: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
