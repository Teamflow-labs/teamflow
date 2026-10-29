const {
  registerSchema,
  loginSchema,
} = require("./validators/auth.validation");

const validRegistration = {
  name: "Michael",
  email: "MICHAEL@example.com",
  password: "securepass123",
};

const invalidRegistration = {
  name: "M",
  email: "not-an-email",
  password: "123",
};

console.log(
  "Valid registration:",
  registerSchema.safeParse(validRegistration)
);

console.log(
  "Invalid registration:",
  registerSchema.safeParse(invalidRegistration)
);

console.log(
  "Valid login:",
  loginSchema.safeParse({
    email: "michael@example.com",
    password: "securepass123",
  })
);
