/** @format */

import Base from './base.js';
import CommentModel from '../db/models/comment.js';

class PackageRepo extends Base {
  async createComment(data) {
    return this.createRecord(data);
  }

  async getComments(data) {
    return this.getRecords(data);
  }
}

export default new PackageRepo(CommentModel);
