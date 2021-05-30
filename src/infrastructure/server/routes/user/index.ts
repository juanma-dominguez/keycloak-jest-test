import { createUser, getUser, getUsers } from '@domainServices';
import { StatusCodes } from '@errors';
import { NewUserInputDto } from '@infrastructure/dtos';
import { logger } from '@logger';
import { Router } from 'express';
import { authorization } from '../../middlewares';

const userRoutes: Router = Router();

userRoutes.post('/signup', async (req, res, next) => {
  const newUserData: NewUserInputDto = req.body;

  logger('debug', `/signup for ${newUserData?.email}.`);

  try {
    const registeredUser = await createUser(newUserData);
    res.status(StatusCodes.CREATED).json(registeredUser);
  } catch (error) {
    next(error);
  }
});

userRoutes.get('/users', authorization(), async (req, res, next) => {
  logger('debug', `/users`);

  try {
    const users = await getUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    next(error);
  }
});

userRoutes.get('/users/:userId', authorization(), async (req, res, next) => {
  const { userId } = req.params;
  logger('debug', `/users`);

  try {
    const user = await getUser(userId);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
});

export { userRoutes };
