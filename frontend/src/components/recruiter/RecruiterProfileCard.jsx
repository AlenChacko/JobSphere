import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice"; // make sure this import exists

const RecruiterProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCompleteProfile = () => {
    navigate("/recruiter/edit-profile");
  };

  // Check if any essential fields are missing
  const isProfileIncomplete =
    !user?.recruiterName || !user?.website || !user?.phone || !user?.companyLogo;

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Company Logo */}
      <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
        {user?.companyLogo ? (
          <img
            src={user.companyLogo}
            alt="Company Logo"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-2xl text-gray-500">Logo</span>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {user?.companyName || "Company Name"}
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-gray-600 font-semibold">Recruiter Name</p>
            <p className="text-gray-700">{user?.recruiterName || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Email</p>
            <p className="text-gray-700">{user?.email || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Website</p>
            <p className="text-gray-700">{user?.website || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Phone</p>
            <p className="text-gray-700">{user?.phone || "N/A"}</p>
          </div>
        </div>

        {/* 🔸 Incomplete profile warning */}
        {isProfileIncomplete && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-lg">
            <p className="font-medium">⚠️ Your profile is incomplete.</p>
            <button
              onClick={handleCompleteProfile}
              className="mt-2 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition duration-200"
            >
              Complete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfileCard;
