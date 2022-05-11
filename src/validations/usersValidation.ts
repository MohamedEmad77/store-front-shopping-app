import { User, UserModel } from '../models/user';
import joi from 'joi';

export const userCreationValidation = (data: User) => {
  const schema = joi.object().keys({
    firstName: joi.string().min(3).required(),
    lastName: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6),
  });

  return schema.validate(data);
};
