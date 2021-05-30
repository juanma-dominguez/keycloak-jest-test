interface IApiError {
  status: number;
  message: string;
}

export class ApiError extends Error implements IApiError {
  constructor(public status: number, public message: string) {
    super();
  }
}
