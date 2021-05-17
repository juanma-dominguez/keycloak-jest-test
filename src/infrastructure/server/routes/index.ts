import { addProject } from '@domainServices';
import { BAD_REQUEST, CREATED } from '@errors';
import { authorization } from '@infrastructure/server/middlewares';
import { validateCreateProject } from '@infrastructure/server/middlewares/validateCreateProject.middleware';
import { RequestDto } from '@infrastructure/server/serverDtos';
import { projectEndpointsLogger } from '@logger';
import { Router } from 'express';

const projectRoutes: Router = Router();

projectRoutes.post('/projects', authorization(), validateCreateProject, async (req: RequestDto, res, next) => {
  const { projectData } = req;
  projectEndpointsLogger('debug', `create project ${projectData?.name}`);
  try {
    if (projectData) {
      const projects = await addProject(projectData);
      res.status(CREATED).json(projects);
    } else {
      res.status(BAD_REQUEST).json();
    }
  } catch (error) {
    next(error);
  }
});

export { projectRoutes };
