import Joi from "joi";

export const signupUserSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "Email cannot be empty",
  }),
  username: Joi.string()
    .required()
    .min(3)
    .max(50)
    .pattern(/^[A-Za-z\s]+$/, "only letters and spaces")
    .messages({
      "string.empty": "User Name cannot be empty.",
      "string.min": "User Name must be at least 3 characters.",
      "string.max": "User Name must be at most 50 characters.",
      "string.pattern.base": "User Name must contain only letters and spaces.",
    }),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      "Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "Email cannot be empty",
  }),
  password: Joi.string()
  .required()
  .min(8)
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
    "Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character"
  )
  .messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters",
  }),
});


export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required().messages({
    "string.empty": "Old Password cannot be empty",
  }),
  newPassword: Joi.string()
  .required()
  .min(8)
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/,
    "Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character"
  )
  .messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters",
  }),
})
