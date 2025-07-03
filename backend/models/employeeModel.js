import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, default: "employee" },

    employeeInfo: {
      phone: { type: String, unique: true, trim: true },
      location: {
        country: { type: String, trim: true },
        state: { type: String, trim: true },
        city: { type: String, trim: true },
      },
      experience: { type: String, trim: true },
      currentRole: { type: String, trim: true },
      skills: [{ type: String, trim: true }],
      education: { type: String, trim: true },
    },

    resumeUrl: { type: String, trim: true },
    profileImage: { type: String, trim: true },

    links: {
      github: { type: String, trim: true },
      linkedIn: { type: String, trim: true },
      portfolio: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model("Employee", employeeSchema);
