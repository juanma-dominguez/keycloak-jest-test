import { ApiError, BAD_REQUEST } from '@errors';
import { validateCreateProjectBody } from '@infrastructure/server/validators';
import { NextFunction, Response } from 'express';
import { RequestDto } from '../serverDtos';

export const validateCreateProject = async (req: RequestDto, res: Response, next: NextFunction): Promise<void> => {
  try {
    const project = req.body;
    const { error, value } = validateCreateProjectBody(project);

    if (error) {
      throw new ApiError(BAD_REQUEST, error);
    }

    req.projectData = { ...value };

    return next();
  } catch (error) {
    return next(error);
  }
};
