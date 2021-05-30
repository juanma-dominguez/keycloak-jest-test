import { KeycloakUserFromInput } from '@domainMappers';
import { NewUserInputDto } from '@infrastructure/dtos';

describe(`Testing mappers`, () => {
  const mockedUserData: NewUserInputDto = {
    email: 'mockUserApi@gmail.com',
    password: 'mockpass1234',
    firstName: 'MockUserApiFirstName',
    lastName: 'MockUserApiLastName',
  };

  it('Test KeycloakUserFromInput', async (done) => {
    const userReadyForKeycloak = KeycloakUserFromInput(mockedUserData);
    console.log('info', userReadyForKeycloak);
    expect(userReadyForKeycloak.enabled).toBe(true);
    expect(userReadyForKeycloak.emailVerified).toBe(true);
    expect(userReadyForKeycloak.credentials).toMatchObject([
      { temporary: false, type: 'password', value: mockedUserData.password },
    ]);
    done();
  });
});
