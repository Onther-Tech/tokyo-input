import Joi from "../Joi";

export default () => Joi.date().format("MM/DD/YYYY HH:mm:ss");
