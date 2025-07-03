import { useNavigate } from "react-router-dom";
import { FaUser, FaUserTie } from "react-icons/fa";

const ChooseRole = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-10">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
        Welcome to <span className="text-gray-800">JobSphere</span>
      </h1>
      <p className="text-gray-600 text-lg mb-10 text-center">
        Start your journey by selecting your role below
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Employee Card */}
        <div
          onClick={() => navigate("/auth-employee")}
          className="bg-white hover:shadow-xl shadow-md border border-gray-200 rounded-2xl p-8 w-72 text-center cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          <div className="flex justify-center mb-4 text-blue-600 text-5xl">
            <FaUser />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            I'm an Employee
          </h2>
          <p className="text-gray-500 text-sm">
            Explore jobs, apply fast, and land interviews effortlessly.
          </p>
        </div>

        {/* Recruiter Card */}
        <div
          onClick={() => navigate("/auth-recruiter")}
          className="bg-white hover:shadow-xl shadow-md border border-gray-200 rounded-2xl p-8 w-72 text-center cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          <div className="flex justify-center mb-4 text-green-600 text-5xl">
            <FaUserTie />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            I'm a Recruiter
          </h2>
          <p className="text-gray-500 text-sm">
            Post jobs and connect with top talent in your industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
