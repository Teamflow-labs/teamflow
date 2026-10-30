const { z } = require("zod");

const projectStatus = z.enum(["active", "archived"]);

const dateString = z
  .string()
  .trim()
  .refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Must be a valid date",
  });

const projectFields = {
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(2000),
  status: projectStatus,
  startDate: dateString.nullable(),
  dueDate: dateString.nullable(),
};

const createProjectSchema = z
  .object({
    name: projectFields.name,
    description: projectFields.description.optional(),
    status: projectFields.status.optional(),
    startDate: projectFields.startDate.optional(),
    dueDate: projectFields.dueDate.optional(),
  })
  .strict()
  .refine(
    (data) =>
      !data.startDate ||
      !data.dueDate ||
      new Date(data.dueDate) >= new Date(data.startDate),
    {
      message: "Due date cannot be earlier than start date",
      path: ["dueDate"],
    }
  );

const updateProjectSchema = z
  .object(projectFields)
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one project field to update",
  })
  .refine(
    (data) =>
      !data.startDate ||
      !data.dueDate ||
      new Date(data.dueDate) >= new Date(data.startDate),
    {
      message: "Due date cannot be earlier than start date",
      path: ["dueDate"],
    }
  );

module.exports = {
  createProjectSchema,
  updateProjectSchema,
};
