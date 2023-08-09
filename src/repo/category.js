/** @format */

import Base from './base.js';
import CategoryModel from '../db/models/category.js';

class CategoryRepo extends Base {
  async createCategory(data) {
    return this.createRecord(data);
  }

  async getCategories(query) {
    return this.getRecords(query);
  }
}

export default new CategoryRepo(CategoryModel);
