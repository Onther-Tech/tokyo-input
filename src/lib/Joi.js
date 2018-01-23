import BaseJoi from "joi";
import Extension from "joi-date-extensions";

const Joi = BaseJoi.extend(Extension);

export default Joi;
