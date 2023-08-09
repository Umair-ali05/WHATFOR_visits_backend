/** @format */

import Base from './base.js';
import PlaceModel from '../db/models/place.js';

class PackageRepo extends Base {
  async createPlace(data) {
    return this.createRecord(data);
  }

  async getPlaces(query) {
    return this.getRecords(query);
  }

  async getPlacesWithAggregations(query) {
    console.log(query);
    return this.getRecordsWithAggregation(query);
  }

  async getPlace(query) {
    if (query._id) {
      query = query;
    } else {
      query = {
        placeType: query.placeType,
        placeName: { $regex: query.placeName },
      };
    }
    return this.getRecord(query);
  }

  async updatePlace(query, body) {
    return this.updateRecord(query, body);
  }

  async deletePlace(query) {
    return this.deleteRecord(query);
  }
}

export default new PackageRepo(PlaceModel);
