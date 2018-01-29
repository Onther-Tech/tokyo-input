import BaseJoi from "joi";
import Extension from "joi-date-extensions";
import BigNumberExtend from "./BigNumberExtend";

export default BaseJoi.extend(Extension).extend(BigNumberExtend);
