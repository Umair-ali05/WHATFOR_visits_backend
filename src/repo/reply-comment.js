/** @format */

import Base from './base.js';
import ReplyCommentModel from '../db/models/comment-reply.js';

class PackageRepo extends Base {
  async createComment(data) {
    return this.createRecord(data);
  }

  async getReplyComments(data) {
    return this.getRecords(data);
  }
}

export default new PackageRepo(ReplyCommentModel);
