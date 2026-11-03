const mongoose = require("mongoose");

const projectMembershipSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: [true, "Project is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    role: {
      type: String,
      enum: ["admin", "project_manager", "member"],
      required: [true, "Membership role is required"],
      default: "member",
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent the same user from joining a project more than once.
projectMembershipSchema.index(
  { project: 1, user: 1 },
  { unique: true }
);

// Helps find memberships by user and role.
projectMembershipSchema.index({ user: 1, role: 1 });

const ProjectMembership = mongoose.model(
  "ProjectMembership",
  projectMembershipSchema
);

module.exports = ProjectMembership;
