import { UserProfileDomainModel } from '@domainModels';
import { NewUserInputDto } from '@infrastructure/dtos';
import { projection } from '@infrastructure/utils';

export const KeycloakUserFromInput = projection({
  username: 'email',
  enabled: () => true,
  emailVerified: () => true,
  credentials: (data: NewUserInputDto) => [
    {
      temporary: false,
      type: 'password',
      value: data.password,
    },
  ],
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
});

export const NewUserModelFromNewUserInput = projection({
  id: 'id',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
});

export const UserProfileFromUserDb: <T>(_: T) => UserProfileDomainModel = projection({
  id: 'id',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
});
