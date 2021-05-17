import { NewProjectInputDto } from '@infrastructure/dtos';
import { Request } from 'express';

export interface RequestDto extends Request {
  projectData?: NewProjectInputDto;
}
