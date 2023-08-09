/** @format */

import { Validator } from 'node-input-validator';

const addBlogValidation = async (req, res, next) => {
  const validate = new Validator(req.body, {
    placeType: 'required',
    placeName: 'required',
    placeDescription: 'required',
    // placeAddress: 'required',
  });

  validate.check().then((matched) => {
    if (!matched) {
      return res.status(400).json({ success: false, err: validate.errors });
    }
    next();
  });
};

export default addBlogValidation;
