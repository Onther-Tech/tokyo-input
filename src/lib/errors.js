export class INVALID_TYPE_ERROR {
  constructor(type) {
    this.type = type;
  }

  toString() {
    return `${ this.type } is invalid type`;
  }
}
export class INVALID_KEYWORD_ERROR {
  constructor(keyword) {
    this.keyword = keyword;
  }

  toString() {
    return `${ this.keyword } is invalid keyword`;
  }
}
