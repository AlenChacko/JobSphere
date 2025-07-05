// pages/employee/EmployeeDashboard.jsx
import {
  FaUser,
  FaBriefcase,
  FaCheckCircle,
  FaHeart,
  FaCog,
  FaEnvelope,
  FaChartLine,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import EmployeeProfileCard from "../../components/employee/EmployeeProfileCard";

const cardData = [
  {
    title: "My Profile",
    icon: FaUser,
    bgColor: "bg-blue-500",
    path: "/employee/profile",
  },
  {
    title: "Explore Jobs",
    icon: FaBriefcase,
    bgColor: "bg-green-500",
    path: "/employee/explore-jobs",
  },
  {
    title: "Applied Jobs",
    icon: FaCheckCircle,
    bgColor: "bg-purple-500",
    path: "/employee/applied-jobs",
  },
  {
    title: "Saved Jobs",
    icon: FaHeart,
    bgColor: "bg-pink-500",
    path: "/employee/saved-jobs",
  },
  {
    title: "Settings",
    icon: FaCog,
    bgColor: "bg-yellow-500",
    path: "/employee/settings",
  },
  {
    title: "Inbox",
    icon: FaEnvelope,
    bgColor: "bg-red-500",
    path: "/employee/inbox",
  },
  {
    title: "Career Insights",
    icon: FaChartLine,
    bgColor: "bg-indigo-500",
    path: "/employee/insights",
  },
];

const EmployeeDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Profile Card */}
      <div className="mb-10">
        <EmployeeProfileCard />
      </div>

      {/* Dashboard Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cardData.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              onClick={() => navigate(card.path)}
              className={`cursor-pointer rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center text-white h-48 hover:scale-105 transition-transform ${card.bgColor}`}
            >
              <Icon size={40} className="mb-4" />
              <h2 className="text-xl font-semibold">{card.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export default EmployeeDashboard;
