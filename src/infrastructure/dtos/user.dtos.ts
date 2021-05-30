import { NewUserDomainModel, UserProfileDomainModel } from '@domainModels';

export type UserProfileDto = UserProfileDomainModel;
export type NewUserInputDto = Omit<NewUserDomainModel, 'id'> & { password: string };
