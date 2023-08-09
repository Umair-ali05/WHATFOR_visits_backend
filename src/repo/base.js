/** @format */

class Base {
  constructor(instanceModel) {
    this.instanceModel = instanceModel;
  }

  async createRecord(data) {
    const instance = await this.instanceModel.create(data);
    return instance;
  }

  async getRecords(query) {
    const instance = await this.instanceModel
      .find(query)
      .sort({ totalStars: -1 });

    return instance;
  }

  async getRecordsWithAggregation(query) {
    const instance = await this.instanceModel.aggregate(query);
    return instance;
  }

  async getRecord(query) {
    const instance = await this.instanceModel.findOne(query);
    return instance;
  }

  async getRecords(query) {
    const instance = await this.instanceModel.find(query);
    return instance;
  }

  async updateRecord(query, body) {
    const instance = await this.instanceModel.findOneAndUpdate(query, body, {
      new: true,
    });
    return instance;
  }

  async deleteRecord(query) {
    const instance = await this.instanceModel.delete(query);
    return instance;
  }
}

export default Base;
