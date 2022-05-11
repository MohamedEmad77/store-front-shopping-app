import joi from 'joi';

export const orderValidation = (quantity: number) => {
  const schema = joi.object().keys({
    quantity: joi.number().integer().required(),
  });

  return schema.validate({ quantity: quantity });
};
