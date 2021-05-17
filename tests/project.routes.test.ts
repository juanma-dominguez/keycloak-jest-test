import { ProjectDomainModel } from '@domainModels';
import { CREATED } from '@errors';
import { NewProjectInputDto } from '@infrastructure/dtos';
import { server } from '@infrastructure/server';
import { getAccessToken } from '@testingFixtures';
import supertest, { SuperTest, Test } from 'supertest';

describe(`[POST] /projects`, () => {
  let request: SuperTest<Test>;
  let access_token: string;

  beforeAll(async () => {
    request = supertest(server);
    const token = await getAccessToken('customer', 'pass');
    if (token) access_token = token;
  }, 1000000);

  const mockedProjectData: NewProjectInputDto = {
    name: 'New Project',
    desc: 'description',
    ownerName: 'Jhon Dow',
  };

  it('must return a CREATED (201) and a new project record', async (done) => {
    const newProjectData = { ...mockedProjectData };
    await request
      .post('/projects')
      .set({ Authorization: access_token })
      .send(newProjectData)
      .expect(CREATED)
      .then(async ({ body }) => {
        const createdProject: ProjectDomainModel = body;

        expect(createdProject.id).not.toBeNull();
        expect(createdProject.name).toBe(newProjectData.name);
      });

    done();
  });
});
