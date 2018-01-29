import Joi from "../Joi";

export default () => Joi.number().integer().positive();
