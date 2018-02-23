import { INVALID_KEYWORD_ERROR } from "../errors";
import * as keywords from "./keywords";
import Type from "./Type";

export default class Keyword {
  constructor(keyword, type) {
    if (!keywords.includes(keyword.toLowerCase())) throw new INVALID_KEYWORD_ERROR(keyword);

    this.keyword = keyword.toLowerCase();
    this.type = new Type(type); // type must be valid
    this.isArray = keywords.ARRAY.includes(keyword);
  }

  toString() {
    return `[Keyword] ${ this.keyword } ${ this.type.toString() }`;
  }
}
