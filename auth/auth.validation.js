const { z } = require("zod");

// Схема регистрации
const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Схема логина
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Middleware для регистрации
const validateRegister = (req, res, next) => {
  try {
    registerSchema.parse(req.body);
    next();
  } catch (err) {
    if (err.name === "ZodError") {
      // используем flatten(), чтобы точно получить ошибки
      const formatted = err.flatten();
      const errors = Object.keys(formatted.fieldErrors).map((field) => ({
        field,
        message: formatted.fieldErrors[field][0],
      }));
      return res.status(400).json({ succes: false, errors });
    }
    next(err);
  }
};

// Middleware для логина
const validateLogin = (req, res, next) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (err) {
    if (err.name === "ZodError") {
      const formatted = err.flatten();
      const errors = Object.keys(formatted.fieldErrors).map((field) => ({
        field,
        message: formatted.fieldErrors[field][0],
      }));
      return res.status(400).json({ succes: false, errors });
    }
    next(err);
  }
};

module.exports = { validateRegister, validateLogin };
