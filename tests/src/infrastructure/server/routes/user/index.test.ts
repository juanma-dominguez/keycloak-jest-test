import { runDB, stopDB } from '@db';
import { UserProfileDomainModel } from '@domainModels';
import { StatusCodes } from '@errors';
import { kcApi } from '@infrastructure/authentication';
import { NewUserInputDto } from '@infrastructure/dtos';
import { server } from '@infrastructure/server';
import { getAccessToken } from '@testingFixtures';
import supertest, { SuperTest, Test } from 'supertest';

describe('API User', () => {
  let request: SuperTest<Test>;
  let userCreatedId: string;

  const mockedUserData: NewUserInputDto = {
    email: 'mockUserApi@gmail.com',
    password: 'mockpass1234',
    firstName: 'MockUserApiFirstName',
    lastName: 'MockUserApiLastName',
  };

  const accessToken = async () => getAccessToken(mockedUserData.email, mockedUserData.password);

  beforeAll(async () => {
    await runDB();
    request = supertest(server);
  });

  afterAll(async () => {
    await kcApi.users.del({ id: userCreatedId });
    await stopDB();
  });

  it('must return a CREATED (201) and a record the new user', async (done) => {
    const newUserData = { ...mockedUserData };

    await request
      .post('/api/v1/signup')
      .send(newUserData)
      .expect(StatusCodes.CREATED)
      .then(async ({ body }) => {
        const registeredUser: UserProfileDomainModel = body;

        expect(registeredUser.id).not.toBeNull();
        expect(registeredUser.email).toBe(newUserData.email);
        expect(registeredUser.firstName).toBe(newUserData.firstName);
        userCreatedId = registeredUser.id;
      });

    done();
  });

  describe(`[GET] /api/v1/users/:userId`, () => {
    it('must return a user record', async (done) => {
      await request
        .get(`/api/v1/users/${userCreatedId}`)
        .set({ Authorization: await accessToken() })
        .expect(StatusCodes.OK)
        .then(async ({ body }) => {
          const registeredUser: UserProfileDomainModel = body;
          expect(registeredUser.id).toBe(userCreatedId);
          expect(registeredUser.firstName).toBe(mockedUserData.firstName);
        });

      done();
    });
  });

  describe(`[GET] /api/v1/users`, () => {
    it('must return users', async (done) => {
      await request
        .get(`/api/v1/users`)
        .set({ Authorization: await accessToken() })
        .expect(StatusCodes.OK)
        .then(async ({ body }) => {
          const registeredUsers: UserProfileDomainModel[] = body;
          expect(registeredUsers[0].id).not.toBeNull();
          expect(registeredUsers[0].firstName).not.toBeNull();
        });

      done();
    });
  });
});
