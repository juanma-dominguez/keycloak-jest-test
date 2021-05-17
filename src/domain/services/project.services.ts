import { ProjectDomainModel } from '@domainModels';
import { CreatingProjectError } from '@errors';
import { projectDataSource } from '@infrastructure/dataSources';
import { NewProjectInputDto } from '@infrastructure/dtos/project.dtos';

export const addProject = async (project: NewProjectInputDto): Promise<ProjectDomainModel> => {
  try {
    return projectDataSource.addProject(project);
  } catch ({ message }) {
    throw new CreatingProjectError(`Error creating project '${project?.name}'. ${message}`);
  }
};
