import Joi from "../Joi";

export default () => Joi.string().regex(/^0x[a-fA-F0-9]{40}$/).required();
