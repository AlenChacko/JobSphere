import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { fetchEmployeeProfile } from "../../redux/slices/employeeSlice";

const EmployeeProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employeeInfo, loading, error } = useSelector(
    (state) => state.employee
  );

  useEffect(() => {
    dispatch(fetchEmployeeProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCompleteProfile = () => {
    navigate("/employee/edit-profile");
  };

  const isProfileIncomplete =
    !employeeInfo?.fullName ||
    !employeeInfo?.designation ||
    !employeeInfo?.profileImage;

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-xl rounded-xl px-6 py-10 max-w-3xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-24 h-24 rounded-full overflow-hidden border shadow">
          {employeeInfo?.profileImage ? (
            <img
              src={employeeInfo.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xl text-gray-500">
              Img
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">
          {`${employeeInfo?.firstName || ""} ${
            employeeInfo?.lastName || ""
          }`.trim() || "Full Name"}
        </h2>
        <p className="text-sm text-gray-500">
          {employeeInfo?.designation || "Add Profession"}
        </p>

        <button
          onClick={handleLogout}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-4 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* About Me */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">About Me</h3>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          {employeeInfo?.aboutMe || "No bio added yet."}
        </p>
      </div>

      {/* Incomplete Profile Banner */}
      {isProfileIncomplete && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md text-sm">
          <p className="font-semibold">⚠️ Your profile is incomplete.</p>
          <button
            onClick={handleCompleteProfile}
            className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-4 py-2 rounded-md"
          >
            Complete Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfileCard;
