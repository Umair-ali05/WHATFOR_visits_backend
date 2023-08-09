/** @format */

import Base from './base.js';
import RatingModel from '../db/models/rating.js';

class RatingRepo extends Base {
  async createRating(data) {
    return this.createRecord(data);
  }
  async viewRating(data) {
    return this.getRecord(data);
  }
}

export default new RatingRepo(RatingModel);
