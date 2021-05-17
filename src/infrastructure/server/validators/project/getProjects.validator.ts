import { GetProjectsDto } from '@infrastructure/dtos';
import Joi from 'joi';

interface ValidationResult {
  error?: string;
  value: GetProjectsDto;
}

const schema = Joi.string().required();

export const validateGetProjectsParams = (userId: string | undefined): ValidationResult => {
  const { error, value } = schema.validate(userId);

  return {
    error: error && error.details[0].message,
    value,
  };
};
