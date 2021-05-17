import { NewProjectInputDto } from '@infrastructure/dtos';
import Joi from 'joi';

interface ValidationResult {
  error?: string;
  value: NewProjectInputDto;
}

const schema = Joi.object({
  name: Joi.string().required(),
  desc: Joi.string().required(),
  ownerName: Joi.string().required(),
});

export const validateCreateProjectBody = (project: NewProjectInputDto | undefined): ValidationResult => {
  const { error, value } = schema.validate(project);

  return {
    error: error && error.details[0].message,
    value,
  };
};
