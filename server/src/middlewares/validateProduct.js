import Joi from "joi";

export const productSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  code: Joi.string().required(),
  stock: Joi.number().required(),
  category: Joi.string().required(),
  thumbnails: Joi.optional(),
});

export const validateProduct = (req, res, next) => {
  // Validate product data
  const valildator = productSchema.validate(
    req.body,
    { abortEarly: false } // Return all errors
  );

  // return error response
  if (valildator.error) {
    return res.status(400).json({
      message: "Invalid product data",
      errors: valildator.error.details.map((err) => err.message),
    });
  }

  // If no errors, continue to next handler
  next();
};
