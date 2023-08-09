/** @format */

import { Validator } from 'node-input-validator';

const addCommentValidation = async (req, res, next) => {
  const validate = new Validator(req.body, {
    text: 'required',
  });

  validate.check().then((matched) => {
    if (!matched) {
      return res.status(400).json({ success: false, err: validate.errors });
    }
    next();
  });
};

export default addCommentValidation;
