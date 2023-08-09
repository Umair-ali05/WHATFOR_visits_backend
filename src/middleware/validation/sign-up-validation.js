import { Validator } from 'node-input-validator';

const signUpValidation = async (req, res, next) => {
  const validate = new Validator(req.body, {
    name: 'required',
    email: 'required|email',
    password: 'required',
  });

  validate.check().then((matched) => {
    if (!matched) {
      return res.status(400).json({ success: false, err: validate.errors });
    }
    next();
  });
};

export default signUpValidation;
