const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Project owner is required"],
    },

    status: {
      type: String,
      enum: ["active", "archived"],
      default: "active",
    },

    startDate: {
      type: Date,
      default: null,
    },

    dueDate: {
      type: Date,
      default: null,
      validate: {
        validator: function (value) {
          return !value || !this.startDate || value >= this.startDate;
        },
        message: "Due date cannot be before the start date",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for filtering and sorting projects.
projectSchema.index({ owner: 1, status: 1 });
projectSchema.index({ updatedAt: -1 });

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
