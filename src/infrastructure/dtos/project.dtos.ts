import { ProjectDomainModel } from '@domainModels';

export interface GetProjectsDto {
  userId: string;
}

export type NewProjectInputDto = Omit<ProjectDomainModel, 'id'>;
