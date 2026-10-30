const {
  createTaskSchema,
  updateTaskSchema,
  updateTaskStatusSchema,
  assignTaskSchema,
  taskParamsSchema,
} = require("./validators/task.validation");

const validId = "507f1f77bcf86cd799439011";

const tests = [
  {
    name: "Valid task creation",
    schema: createTaskSchema,
    input: { title: "Build login page" },
    expected: true,
  },
  {
    name: "Task title too short",
    schema: createTaskSchema,
    input: { title: "A" },
    expected: false,
  },
  {
    name: "Unknown task field",
    schema: createTaskSchema,
    input: { title: "Build login page", unknown: true },
    expected: false,
  },
  {
    name: "Valid task update",
    schema: updateTaskSchema,
    input: { status: "in_progress" },
    expected: true,
  },
  {
    name: "Empty task update",
    schema: updateTaskSchema,
    input: {},
    expected: false,
  },
  {
    name: "Valid status update",
    schema: updateTaskStatusSchema,
    input: { status: "done" },
    expected: true,
  },
  {
    name: "Invalid status update",
    schema: updateTaskStatusSchema,
    input: { status: "completed" },
    expected: false,
  },
  {
    name: "Valid task assignment",
    schema: assignTaskSchema,
    input: { assigneeId: validId },
    expected: true,
  },
  {
    name: "Unassign task",
    schema: assignTaskSchema,
    input: { assigneeId: null },
    expected: true,
  },
  {
    name: "Valid task route parameters",
    schema: taskParamsSchema,
    input: { projectId: validId, taskId: validId },
    expected: true,
  },
];

let failed = 0;

for (const test of tests) {
  const result = test.schema.safeParse(test.input);
  const passed = result.success === test.expected;

  console.log(`${passed ? "PASS" : "FAIL"}: ${test.name}`);

  if (!passed) {
    failed++;
    if (!result.success) {
      console.error(result.error.issues);
    }
  }
}

if (failed > 0) {
  console.error(`\n${failed} task test(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nAll task validation tests passed.");
}