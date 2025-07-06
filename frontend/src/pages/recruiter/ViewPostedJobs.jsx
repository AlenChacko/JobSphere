import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecruiterJobs, deleteJob } from "../../redux/slices/jobSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewPostedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchRecruiterJobs());
  }, [dispatch]);

  const handleDelete = (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      dispatch(deleteJob(jobId)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          
        } else {
          toast.error("Failed to delete job");
        }
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Your Posted Jobs</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs posted yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-5 rounded-2xl shadow-md border flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-blue-800">
                    {job.title}
                  </h3>
                  <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {job.jobType}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-1">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>Experience:</strong> {job.experienceLevel}
                </p>
                <p className="text-gray-700 text-sm mb-1">
                  <strong>Salary:</strong> {job.salaryRange || "Not specified"}
                </p>
                <p className="text-gray-700 text-sm mb-2">
                  <strong>Skills:</strong>{" "}
                  {job.skillsRequired?.join(", ") || "N/A"}
                </p>

                <p className="text-gray-600 text-sm italic line-clamp-2 mb-3">
                  {job.description}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500">
                  <p>
                    <strong>Openings:</strong> {job.openings}
                  </p>
                  <p>
                    <strong>Deadline:</strong>{" "}
                    {job.deadline
                      ? new Date(job.deadline).toDateString()
                      : "N/A"}
                  </p>
                </div>

                <p className="text-xs text-right text-gray-400 mt-3">
                  Posted on: {new Date(job.createdAt).toDateString()}
                </p>
              </div>

              {/* 🔻 Edit & Delete Buttons */}
              <div className="flex justify-end gap-3 mt-5">
                <button
                  onClick={() => navigate(`/recruiter/edit-job/${job._id}`)}
                  className="px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded shadow"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewPostedJobs;
