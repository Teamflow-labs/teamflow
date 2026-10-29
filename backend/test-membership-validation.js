const {
  addMemberSchema,
  updateMemberRoleSchema,
  projectMembershipParamsSchema,
} = require("./validators/membership.validation");

const validUserId = "507f1f77bcf86cd799439011";
const validProjectId = "507f191e810c19729de860ea";

const tests = [
  {
    name: "Valid member",
    schema: addMemberSchema,
    input: { userId: validUserId, role: "member" },
    expected: true,
  },
  {
    name: "Member with default role",
    schema: addMemberSchema,
    input: { userId: validUserId },
    expected: true,
  },
  {
    name: "Invalid user ID",
    schema: addMemberSchema,
    input: { userId: "invalid-id" },
    expected: false,
  },
  {
    name: "Invalid membership role",
    schema: addMemberSchema,
    input: { userId: validUserId, role: "superuser" },
    expected: false,
  },
  {
    name: "Valid role update",
    schema: updateMemberRoleSchema,
    input: { role: "project_manager" },
    expected: true,
  },
  {
    name: "Invalid role update",
    schema: updateMemberRoleSchema,
    input: { role: "guest" },
    expected: false,
  },
  {
    name: "Valid project membership IDs",
    schema: projectMembershipParamsSchema,
    input: {
      projectId: validProjectId,
      userId: validUserId,
    },
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
  console.error(`\n${failed} membership test(s) failed.`);
  process.exitCode = 1;
} else {
  console.log("\nAll membership validation tests passed.");
}