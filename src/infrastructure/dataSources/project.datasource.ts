import { ProjectDomainModel } from '@domainModels';
import { NewProjectInputDto } from '@infrastructure/dtos';
import { v4 as uuidv4 } from 'uuid';

export const addProject = (project: NewProjectInputDto): ProjectDomainModel => {
  return {
    id: uuidv4(),
    ...project,
  };
};
