import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true, trim: true },
    role: { type: String, default: "employee" },

    phone: { type: String, unique: true, trim: true },

    designation: { type: String, trim: true },

    employeeInfo: {
      location: {
        country: { type: String, trim: true },
        state: { type: String, trim: true },
        city: { type: String, trim: true },
      },

      experience: [
        {
          company: { type: String, trim: true },
          designation: { type: String, trim: true },
          from: { type: String, trim: true }, // e.g., "2023"
          to: { type: String, trim: true },   // e.g., "2025"
          currentlyWorking: { type: Boolean, default: false },
        },
      ],

      currentRole: {
        title: { type: String, trim: true },
        from: { type: String, trim: true },
        to: { type: String, trim: true },
        currentlyWorking: { type: Boolean, default: false },
      },

      skills: {
        type: [String],
        default: [],
      },

      education: [
        {
          institute: { type: String, trim: true },
          degree: { type: String, trim: true },
          from: { type: String, trim: true },
          to: { type: String, trim: true },
          currentlyStudying: { type: Boolean, default: false },
        },
      ],
    },

    resume: {
      url: { type: String, trim: true },
      publicId: { type: String, trim: true },
    },

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
