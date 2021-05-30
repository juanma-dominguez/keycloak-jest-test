import { KeycloakUserFromInput } from '@domainMappers';
import { ApiError } from '@errors';
import { NewUserInputDto } from '@infrastructure/dtos';
import { kcApi } from './keycloakClient';

export const createUser = async (user: NewUserInputDto): Promise<{ id: string }> => {
  try {
    return await kcApi.users.create(KeycloakUserFromInput(user));
  } catch (error) {
    throw new ApiError(error.response?.status, error.response?.data?.errorMessage);
  }
};

export const kc = {
  createUser,
};
