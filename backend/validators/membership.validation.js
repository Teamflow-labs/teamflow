const { z } = require("zod");

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Must be a valid ID");

const membershipRole = z.enum([
  "admin",
  "project_manager",
  "member",
]);

const addMemberSchema = z
  .object({
    userId: objectIdSchema,
    role: membershipRole.optional().default("member"),
  })
  .strict();

const updateMemberRoleSchema = z
  .object({
    role: membershipRole,
  })
  .strict();

const projectMembershipParamsSchema = z
  .object({
    projectId: objectIdSchema,
    userId: objectIdSchema,
  })
  .strict();

module.exports = {
  addMemberSchema,
  updateMemberRoleSchema,
  projectMembershipParamsSchema,
};
