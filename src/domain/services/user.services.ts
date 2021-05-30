import { dbRepositories as db } from '@db';
import { UserProfileFromUserDb } from '@domainMappers';
import { UserProfileDomainModel } from '@domainModels';
import { kc } from '@infrastructure/authentication';
import { NewUserInputDto } from '@infrastructure/dtos';

export const createUser = async (user: NewUserInputDto): Promise<UserProfileDomainModel> => {
  const userId = await kc.createUser(user);
  const { User } = db();
  return UserProfileFromUserDb(await User.save({ ...userId, ...user }));
};

export const getUsers = async (): Promise<UserProfileDomainModel[]> => {
  const { User } = db();
  return (await User.find()).map((user) => UserProfileFromUserDb(user));
};

export const getUser = async (userId: string): Promise<UserProfileDomainModel> => {
  const { User } = db();
  return UserProfileFromUserDb(await User.findOne({ id: userId }));
};
