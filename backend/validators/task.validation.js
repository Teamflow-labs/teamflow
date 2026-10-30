const { z } = require("zod");

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Must be a valid ID");

const taskStatus = z.enum([
  "todo",
  "in_progress",
  "in_review",
  "done",
]);

const taskPriority = z.enum([
  "low",
  "medium",
  "high",
  "urgent",
]);

const taskFields = {
  title: z.string().trim().min(2).max(160),
  description: z.string().trim().max(3000),
  assigneeId: objectIdSchema.nullable(),
  status: taskStatus,
  priority: taskPriority,
  dueDate: z
    .string()
    .trim()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Must be a valid date",
    })
    .nullable(),
};

const createTaskSchema = z
  .object({
    title: taskFields.title,
    description: taskFields.description.optional(),
    assigneeId: taskFields.assigneeId.optional(),
    status: taskFields.status.optional(),
    priority: taskFields.priority.optional(),
    dueDate: taskFields.dueDate.optional(),
  })
  .strict();

const updateTaskSchema = z
  .object(taskFields)
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one task field to update",
  });

const updateTaskStatusSchema = z
  .object({
    status: taskStatus,
  })
  .strict();

const assignTaskSchema = z
  .object({
    assigneeId: objectIdSchema.nullable(),
  })
  .strict();

const taskParamsSchema = z
  .object({
    projectId: objectIdSchema,
    taskId: objectIdSchema,
  })
  .strict();

module.exports = {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  assignTaskSchema,
  taskParamsSchema,
};
