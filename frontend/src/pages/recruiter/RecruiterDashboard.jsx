import { Link } from "react-router-dom";
import RecruiterProfileCard from "../../components/recruiter/RecruiterProfileCard";
import {
  FaEdit,
  FaBriefcase,
  FaList,
  FaEnvelope,
  FaUserEdit,
  FaChartBar,
} from "react-icons/fa";

const RecruiterDashboard = () => {
  const actions = [
    {
      title: "Edit Profile",
      icon: <FaUserEdit className="text-blue-600 text-3xl" />,
      description: "Update your company and recruiter information.",
      path: "/recruiter/edit-profile",
    },
    {
      title: "Post Job",
      icon: <FaBriefcase className="text-green-600 text-3xl" />,
      description: "Create and publish new job listings.",
      path: "/recruiter/post-job",
    },
    {
      title: "View Posted Jobs",
      icon: <FaList className="text-purple-600 text-3xl" />,
      description: "See all the jobs you've posted.",
      path: "/recruiter/view-jobs",
    },
    {
      title: "View Applications",
      icon: <FaEdit className="text-orange-600 text-3xl" />,
      description: "Manage applications received from candidates.",
      path: "/recruiter/applications",
    },
    {
      title: "Inbox",
      icon: <FaEnvelope className="text-red-600 text-3xl" />,
      description: "Read and respond to candidate messages.",
      path: "/recruiter/inbox",
    },
    {
      title: "Stats",
      icon: <FaChartBar className="text-cyan-600 text-3xl" />,
      description: "Track job postings, applications, and response rates.",
      path: "/recruiter/stats",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6">Welcome, Recruiter</h2>

      {/* Profile */}
      <RecruiterProfileCard />

      {/* Dashboard Action Cards */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, idx) => (
          <Link to={action.path} key={idx}>
            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300 cursor-pointer h-full">
              <div className="mb-4">{action.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{action.title}</h3>
              <p className="text-gray-600 text-sm">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
