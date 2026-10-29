const {
  createProjectSchema,
  updateProjectSchema,
} = require("./validators/project.validation");

console.log(
  "Valid project:",
  createProjectSchema.safeParse({
    name: "Teamflow Website",
    description: "A project management platform",
    status: "active",
    startDate: "2026-10-23",
    dueDate: "2026-12-31",
  })
);

console.log(
  "Invalid project:",
  createProjectSchema.safeParse({
    name: "X",
    status: "invalid",
  })
);

console.log(
  "Valid project update:",
  updateProjectSchema.safeParse({
    status: "archived",
  })
);

console.log(
  "Empty project update:",
  updateProjectSchema.safeParse({})
);
