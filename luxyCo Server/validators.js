const Joi = require("joi");

const usersSchema = Joi.object({
  department_id: Joi.number(),
  first_name: Joi.string().max(255).required(),
  last_name: Joi.string().max(255).required(),
  password: Joi.string().min(3).required(),
  street: Joi.string().min(5),
  phone_number: Joi.string().min(5),
  salary: Joi.number().greater(15000),
});

const validateUsers = (req, res, next) => {
  const {
    department_id,
    first_name,
    last_name,
    password,
    street,
    phone_number,
    salary,
  } = req.body;

  const { error } = usersSchema.validate(
    {
      department_id,
      first_name,
      last_name,
      password,
      street,
      phone_number,
      salary,
    },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ any_name_exampel_validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = { validateUsers };
