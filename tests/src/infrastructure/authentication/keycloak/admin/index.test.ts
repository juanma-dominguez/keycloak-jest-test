import { kc, kcApi } from '@infrastructure/authentication/keycloak/admin';

describe(`Keycloak Admin Client`, () => {
  const mockUser = {
    firstName: 'KeycloakMockTestUser',
    lastName: 'KeycloakMockTestUserLastName',
    email: 'KeycloakMockTestUser@gmail.com',
    password: '76sdfgs7df6g7',
  };
  let userCreatedId: string;

  afterAll(async () => {
    await kcApi.users.del({ id: userCreatedId });
  });

  it('Create a keycloak user', async (done) => {
    const userId = await kc.createUser(mockUser);
    expect(userId).toHaveProperty('id');
    userCreatedId = userId.id;
    const user = await kcApi.users.findOne({ id: userId.id });
    expect(user).toHaveProperty('firstName');
    expect(user.firstName).toBe(mockUser.firstName);
    done();
  });

  it('Create same user return 409 error', async (done) => {
    try {
      const userId = await kc.createUser(mockUser);
    } catch (error) {
      expect(error.status).toBe(409);
    }
    done();
  });
});
