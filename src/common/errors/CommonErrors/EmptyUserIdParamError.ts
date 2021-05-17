import { ApiError, BAD_REQUEST } from '@errors';

const message = 'Empty user id param not allowed';

export class EmptyUserIdParamError extends ApiError {
  constructor(description?: string) {
    super(BAD_REQUEST, message, description);
  }
}
