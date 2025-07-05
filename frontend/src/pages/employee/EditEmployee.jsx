import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  fetchEmployeeProfile,
  updateEmployeeProfile,
} from "../../redux/slices/employeeSlice";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employeeInfo, loading, error } = useSelector(
    (state) => state.employee
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    designation: "",
    country: "",
    state: "",
    city: "",
    skills: "",
    github: "",
    linkedIn: "",
    portfolio: "",
    email: "",
    aboutMe: "",
  });

  const [experience, setExperience] = useState([]);
  const [currentRole, setCurrentRole] = useState({
    title: "",
    from: "",
    to: "",
    currentlyWorking: false,
  });

  const [education, setEducation] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const years = Array.from({ length: 60 }, (_, i) => 1980 + i);

  useEffect(() => {
    dispatch(fetchEmployeeProfile());
  }, [dispatch]);

  useEffect(() => {
    if (employeeInfo) {
      setFormData({
        firstName: employeeInfo.firstName || "",
        lastName: employeeInfo.lastName || "",
        email: employeeInfo.email || "",
        phone: employeeInfo.phone || "",
        designation: employeeInfo.designation || "",
        country: employeeInfo.employeeInfo?.location?.country || "",
        state: employeeInfo.employeeInfo?.location?.state || "",
        city: employeeInfo.employeeInfo?.location?.city || "",
        skills: employeeInfo.employeeInfo?.skills?.join(", ") || "",
        github: employeeInfo.links?.github || "",
        linkedIn: employeeInfo.links?.linkedIn || "",
        portfolio: employeeInfo.links?.portfolio || "",
        aboutMe: employeeInfo.aboutMe || "",
      });

      const rawExperience = employeeInfo.employeeInfo?.experience || [];
      const safeExperience = Array.isArray(rawExperience)
        ? rawExperience.map((exp) =>
            typeof exp === "object" && exp !== null
              ? exp
              : {
                  company: "",
                  designation: "",
                  from: "",
                  to: "",
                  currentlyWorking: false,
                }
          )
        : [];

      setExperience(safeExperience);

      setCurrentRole(
        employeeInfo.employeeInfo?.currentRole || {
          title: "",
          from: "",
          to: "",
          currentlyWorking: false,
        }
      );

      const rawEducation = employeeInfo.employeeInfo?.education || [];
      const safeEducation = Array.isArray(rawEducation)
        ? rawEducation.map((edu) =>
            typeof edu === "object" && edu !== null
              ? edu
              : {
                  institute: "",
                  degree: "",
                  from: "",
                  to: "",
                  currentlyStudying: false,
                }
          )
        : [];

      setEducation(safeEducation);
    }
  }, [employeeInfo]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];

    // Prevent crash from corrupted entry
    if (typeof updated[index] !== "object" || updated[index] === null) {
      updated[index] = {
        company: "",
        designation: "",
        from: "",
        to: "",
        currentlyWorking: false,
      };
    }

    updated[index][field] = value;
    setExperience(updated);
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const handleCurrentRoleChange = (field, value) => {
    setCurrentRole((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        designation: "",
        from: "",
        to: "",
        currentlyWorking: false,
      },
    ]);
  };

  const handleAddEducation = () => {
    setEducation([
      ...education,
      { institute: "", degree: "", from: "", to: "", currentlyStudying: false },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      fd.append(key, value);
    });

    fd.append("experience", JSON.stringify(experience));
    fd.append("currentRole", JSON.stringify(currentRole));
    fd.append("education", JSON.stringify(education));
    fd.append("skills", formData.skills);

    if (profileImage) fd.append("profileImage", profileImage);
    if (resume) fd.append("resume", resume);

    const result = await dispatch(updateEmployeeProfile(fd));
    if (result.type.includes("fulfilled")) {
      toast.success("Profile updated successfully!");
      navigate("/employee/dashboard");
    } else {
      toast.error(result.payload || "Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6"
    >
      <h2 className="text-3xl font-bold">Edit Employee Profile</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="firstName"
          type="text"
          className="input"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          type="text"
          className="input"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          name="phone"
          type="text"
          className="input"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          className="input bg-gray-100 cursor-not-allowed"
          placeholder="Email"
          value={formData.email}
          disabled
        />
        <input
          name="designation"
          type="text"
          className="input"
          placeholder="Designation"
          value={formData.designation}
          onChange={handleChange}
        />
      </div>
      <h3 className="text-xl font-semibold">About Me</h3>
      <textarea
        name="aboutMe"
        rows={5}
        className="input resize-none"
        placeholder="Tell us about yourself..."
        value={formData.aboutMe}
        onChange={handleChange}
      />

      <h3 className="text-xl font-semibold">Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="country"
          type="text"
          className="input"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <input
          name="state"
          type="text"
          className="input"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        <input
          name="city"
          type="text"
          className="input"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      <h3 className="text-xl font-semibold">Profile Image</h3>
      <input
        type="file"
        accept="image/*"
        className="input"
        onChange={(e) => setProfileImage(e.target.files[0])}
      />
      {profileImage && (
        <img
          src={URL.createObjectURL(profileImage)}
          className="w-32 h-32 object-cover mt-2 rounded border"
          alt="preview"
        />
      )}

      <h3 className="text-xl font-semibold">Resume</h3>
      <input
        type="file"
        accept="application/pdf"
        className="input"
        onChange={(e) => setResume(e.target.files[0])}
      />

      <h3 className="text-xl font-semibold flex items-center justify-between">
        Experience
        <button
          onClick={handleAddExperience}
          type="button"
          className="text-blue-600 text-sm underline"
        >
          + Add More
        </button>
      </h3>
      {experience.map((exp, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
          <input
            type="text"
            className="input"
            placeholder="Company"
            value={exp.company}
            onChange={(e) =>
              handleExperienceChange(idx, "company", e.target.value)
            }
          />
          <input
            type="text"
            className="input"
            placeholder="Designation"
            value={exp.designation}
            onChange={(e) =>
              handleExperienceChange(idx, "designation", e.target.value)
            }
          />
          <select
            className="input"
            value={exp.from}
            onChange={(e) =>
              handleExperienceChange(idx, "from", e.target.value)
            }
          >
            <option value="">From</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={exp.to}
            onChange={(e) => handleExperienceChange(idx, "to", e.target.value)}
          >
            <option value="">To</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exp.currentlyWorking}
              onChange={(e) =>
                handleExperienceChange(
                  idx,
                  "currentlyWorking",
                  e.target.checked
                )
              }
            />
            Currently Working
          </label>
        </div>
      ))}

      <h3 className="text-xl font-semibold">Current Role</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          className="input"
          placeholder="Title"
          value={currentRole.title}
          onChange={(e) => handleCurrentRoleChange("title", e.target.value)}
        />
        <select
          className="input"
          value={currentRole.from}
          onChange={(e) => handleCurrentRoleChange("from", e.target.value)}
        >
          <option value="">From</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="input"
          value={currentRole.to}
          onChange={(e) => handleCurrentRoleChange("to", e.target.value)}
        >
          <option value="">To</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={currentRole.currentlyWorking}
            onChange={(e) =>
              handleCurrentRoleChange("currentlyWorking", e.target.checked)
            }
          />
          Currently Working
        </label>
      </div>

      <h3 className="text-xl font-semibold flex items-center justify-between">
        Education
        <button
          onClick={handleAddEducation}
          type="button"
          className="text-blue-600 text-sm underline"
        >
          + Add More
        </button>
      </h3>
      {education.map((edu, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-2">
          <input
            type="text"
            className="input"
            placeholder="Institute"
            value={edu.institute}
            onChange={(e) =>
              handleEducationChange(idx, "institute", e.target.value)
            }
          />
          <input
            type="text"
            className="input"
            placeholder="Degree"
            value={edu.degree}
            onChange={(e) =>
              handleEducationChange(idx, "degree", e.target.value)
            }
          />
          <select
            className="input"
            value={edu.from}
            onChange={(e) => handleEducationChange(idx, "from", e.target.value)}
          >
            <option value="">From</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            className="input"
            value={edu.to}
            onChange={(e) => handleEducationChange(idx, "to", e.target.value)}
          >
            <option value="">To</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={edu.currentlyStudying}
              onChange={(e) =>
                handleEducationChange(
                  idx,
                  "currentlyStudying",
                  e.target.checked
                )
              }
            />
            Currently Studying
          </label>
        </div>
      ))}

      <input
        name="skills"
        type="text"
        className="input"
        placeholder="Skills (comma separated)"
        value={formData.skills}
        onChange={handleChange}
      />

      <h3 className="text-xl font-semibold">Social Links</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="github"
          type="text"
          className="input"
          placeholder="GitHub"
          value={formData.github}
          onChange={handleChange}
        />
        <input
          name="linkedIn"
          type="text"
          className="input"
          placeholder="LinkedIn"
          value={formData.linkedIn}
          onChange={handleChange}
        />
        <input
          name="portfolio"
          type="text"
          className="input"
          placeholder="Portfolio"
          value={formData.portfolio}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-primary w-full md:w-fit mt-4">
        Update Profile
      </button>
    </form>
  );
};

export default EditEmployee;
