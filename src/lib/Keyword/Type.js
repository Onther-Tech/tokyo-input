import { INVALID_TYPE_ERROR } from "../errors";
import * as types from "./types";

/**
 * @title Type
 * @notice handle keyword's type
 */
export default class Type {
  constructor(type) {
    if (!types.includes(type.toLowerCase())) throw new INVALID_TYPE_ERROR(type);

    this.type = type.toLowerCase();
  }

  toString() {
    return `[Type] ${ this.type }`;
  }
}
