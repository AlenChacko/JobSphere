import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createJob } from "../../redux/slices/jobSlice";

const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"];
const experienceLevels = ["Fresher", "Mid-Level", "Senior", "Manager"];

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recruiterInfo } = useSelector((state) => state.recruiter);

  const [formData, setFormData] = useState({
    title: "",
    company: recruiterInfo?.company || "",
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryRange: "",
    skillsRequired: "",
    description: "",
    openings: 1,
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = {
      ...formData,
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((skill) => skill.trim()),
    };

    const result = await dispatch(createJob(jobData));

    if (result.type.includes("fulfilled")) {
      toast.success("Job posted successfully!");
      navigate("/recruiter/jobs");
    } else {
      toast.error(result.payload || "Failed to post job");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6"
    >
      <h2 className="text-3xl font-bold">Post a New Job</h2>

      <input
        type="text"
        name="title"
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="company"
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Company Name"
        value={formData.company}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="location"
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          name="jobType"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={formData.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          name="experienceLevel"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={formData.experienceLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select Experience Level</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        name="salaryRange"
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Salary Range (e.g. 5-8 LPA)"
        value={formData.salaryRange}
        onChange={handleChange}
      />

      <input
        type="text"
        name="skillsRequired"
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Skills (comma separated)"
        value={formData.skillsRequired}
        onChange={handleChange}
      />

      <textarea
        name="description"
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="Job Description"
        rows="4"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          name="openings"
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Number of Openings"
          min={1}
          value={formData.openings}
          onChange={handleChange}
        />
        <input
          type="date"
          name="deadline"
          className="w-full border border-gray-300 rounded px-4 py-2"
          placeholder="Application Deadline"
          value={formData.deadline}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition-all"
      >
        Post Job
      </button>
    </form>
  );
};

export default AddJob;
