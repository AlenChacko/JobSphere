import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchJobById, updateJob } from "../../redux/slices/jobSlice";

const jobTypes = ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"];
const experienceLevels = ["Fresher", "Mid-Level", "Senior", "Manager"];

const EditJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    salaryRange: "",
    skillsRequired: "",
    description: "",
    openings: 1,
    deadline: "",
  });

  useEffect(() => {
    dispatch(fetchJobById(id)).then((res) => {
      if (res.payload) {
        const job = res.payload;
        setFormData({
          title: job.title || "",
          company: job.company || "",
          location: job.location || "",
          jobType: job.jobType || "",
          experienceLevel: job.experienceLevel || "",
          salaryRange: job.salaryRange || "",
          skillsRequired: Array.isArray(job.skillsRequired)
            ? job.skillsRequired.join(", ")
            : "",
          description: job.description || "",
          openings: job.openings || 1,
          deadline: job.deadline
            ? new Date(job.deadline).toISOString().slice(0, 10)
            : "",
        });
      } else {
        toast.error("Job not found");
      }
    });
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
    };

    const result = await dispatch(updateJob({ id, updatedData }));

    if (result.type.includes("fulfilled")) {
      navigate("/recruiter/view-jobs");
    } else {
      toast.error(result.payload || "Failed to update job");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-6"
    >
      <h2 className="text-3xl font-bold">Edit Job</h2>

      {/* --- Job Title --- */}
      <div>
        <label className="block mb-1 font-medium">Job Title</label>
        <input
          type="text"
          name="title"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      {/* --- Company --- */}
      <div>
        <label className="block mb-1 font-medium">Company Name</label>
        <input
          type="text"
          name="company"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={formData.company}
          onChange={handleChange}
          required
        />
      </div>

      {/* --- Location --- */}
      <div>
        <label className="block mb-1 font-medium">Location</label>
        <input
          type="text"
          name="location"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      {/* --- Job Type & Experience --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Job Type</label>
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
        </div>

        <div>
          <label className="block mb-1 font-medium">Experience Level</label>
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
      </div>

      {/* --- Salary Range --- */}
      <div>
        <label className="block mb-1 font-medium">Salary Range</label>
        <input
          type="text"
          name="salaryRange"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={formData.salaryRange}
          onChange={handleChange}
        />
      </div>

      {/* --- Skills --- */}
      <div>
        <label className="block mb-1 font-medium">Skills Required</label>
        <input
          type="text"
          name="skillsRequired"
          className="w-full border border-gray-300 rounded px-4 py-2"
          value={formData.skillsRequired}
          onChange={handleChange}
        />
      </div>

      {/* --- Description --- */}
      <div>
        <label className="block mb-1 font-medium">Job Description</label>
        <textarea
          name="description"
          className="w-full border border-gray-300 rounded px-4 py-2"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      {/* --- Openings & Deadline --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Number of Openings</label>
          <input
            type="number"
            name="openings"
            className="w-full border border-gray-300 rounded px-4 py-2"
            min={1}
            value={formData.openings}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Application Deadline</label>
          <input
            type="date"
            name="deadline"
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* --- Submit Button --- */}
      <button
        type="submit"
        className="bg-blue-600 text-white font-medium px-6 py-2 rounded hover:bg-blue-700 transition-all"
      >
        Update Job
      </button>
    </form>
  );
};

export default EditJob;
