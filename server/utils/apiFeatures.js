/**
 * API Features - Reusable query builder for pagination, filtering, sorting, and searching.
 * Usage: new APIFeatures(Model.find(), req.query).search().filter().sort().paginate()
 */
class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    this.totalCount = 0;
  }

  // Text search
  search() {
    if (this.queryString.keyword) {
      const keyword = {
        $or: [
          { name: { $regex: this.queryString.keyword, $options: 'i' } },
          { description: { $regex: this.queryString.keyword, $options: 'i' } },
          { tags: { $regex: this.queryString.keyword, $options: 'i' } },
        ],
      };
      this.query = this.query.find(keyword);
    }
    return this;
  }

  // Filter by fields (category, price range, color, material, stock)
  filter() {
    const queryCopy = { ...this.queryString };
    const removeFields = ['keyword', 'page', 'limit', 'sort', 'fields'];
    removeFields.forEach((field) => delete queryCopy[field]);

    // Price range filter
    if (queryCopy.minPrice || queryCopy.maxPrice) {
      queryCopy.price = {};
      if (queryCopy.minPrice) {
        queryCopy.price.$gte = Number(queryCopy.minPrice);
        delete queryCopy.minPrice;
      }
      if (queryCopy.maxPrice) {
        queryCopy.price.$lte = Number(queryCopy.maxPrice);
        delete queryCopy.maxPrice;
      }
    }

    // Category filter
    if (queryCopy.category) {
      queryCopy.category = queryCopy.category;
    }

    // Boolean filters
    if (queryCopy.isFeatured) {
      queryCopy.isFeatured = queryCopy.isFeatured === 'true';
    }
    if (queryCopy.isActive) {
      queryCopy.isActive = queryCopy.isActive === 'true';
    }

    this.query = this.query.find(queryCopy);
    return this;
  }

  // Sort results
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  // Field selection
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    }
    return this;
  }

  // Pagination
  paginate() {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 12;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    this.page = page;
    this.limit = limit;
    return this;
  }
}

export default APIFeatures;
