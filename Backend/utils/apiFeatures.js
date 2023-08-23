class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    let queryCopy = { ...this.queryStr };

    // Remove Extra Field
    let arrayRemoveFields = ["keyword", "page", "limit"];

    arrayRemoveFields.forEach((key) => {
      delete queryCopy[key];
    });
    this.query = this.query.find(queryCopy);
    return this;
  }
}

module.exports = ApiFeatures;
