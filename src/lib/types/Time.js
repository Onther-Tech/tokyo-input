import Joi from "../Joi";

export default () => Joi.date().format("YYYY/MM/DD HH:mm:ss");
