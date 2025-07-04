import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { fetchRecruiterProfile } from "../../redux/slices/recruiterSlice";
import { FaGlobe, FaLinkedin, FaTwitter } from "react-icons/fa"; // add to top

const RecruiterProfileCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recruiterInfo, loading, error } = useSelector(
    (state) => state.recruiter
  );

  useEffect(() => {
    dispatch(fetchRecruiterProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCompleteProfile = () => {
    navigate("/recruiter/edit-profile");
  };

  const isProfileIncomplete =
    !recruiterInfo?.recruiterName ||
    !recruiterInfo?.links?.website ||
    !recruiterInfo?.phone ||
    !recruiterInfo?.companyLogo;

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow-xl rounded-xl px-6 py-10 max-w-5xl mx-auto space-y-10">
      {/* Centered Logo and Company Info */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-28 h-28 rounded-full overflow-hidden border shadow">
          {recruiterInfo?.companyLogo ? (
            <img
              src={recruiterInfo.companyLogo}
              alt="Company Logo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-xl text-gray-500">
              Logo
            </div>
          )}
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          {recruiterInfo?.companyName || "Company Name"}
        </h2>
        <button
          onClick={handleLogout}
          className="mt-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-1 px-4 rounded-md transition duration-200"
        >
          Logout
        </button>
      </div>

      {/* About Section */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          About Company
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          {recruiterInfo?.aboutCompany || "No company description added yet."}
        </p>
      </div>

      {/* Detailed Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <InfoCard label="Recruiter Name" value={recruiterInfo?.recruiterName} />
        <InfoCard label="Email" value={recruiterInfo?.email} />
        <InfoCard label="Phone" value={recruiterInfo?.phone} />
        <InfoCard
          label="Company Size"
          value={
            recruiterInfo?.companySize
              ? `${recruiterInfo.companySize} employees`
              : null
          }
        />

        <InfoCard label="Industry" value={recruiterInfo?.industry} />
        <InfoCard label="Country" value={recruiterInfo?.location?.country} />
        <InfoCard label="State" value={recruiterInfo?.location?.state} />
        <InfoCard label="City" value={recruiterInfo?.location?.city} />
        {/* Social Links Section */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center items-center gap-6 flex-wrap mt-4">
          {recruiterInfo?.links?.website && (
            <a
              href={recruiterInfo.links.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:underline"
            >
              <FaGlobe className="text-xl" />
              <span className="hidden sm:inline">Website</span>
            </a>
          )}
          {recruiterInfo?.links?.linkedIn && (
            <a
              href={recruiterInfo.links.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:underline"
            >
              <FaLinkedin className="text-xl" />
              <span className="hidden sm:inline">LinkedIn</span>
            </a>
          )}
          {recruiterInfo?.links?.twitter && (
            <a
              href={recruiterInfo.links.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-700 hover:underline"
            >
              <FaTwitter className="text-xl" />
              <span className="hidden sm:inline">Twitter</span>
            </a>
          )}
        </div>
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

// Reusable Info row
const InfoCard = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
    <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
    <p className="text-base text-gray-800 font-semibold break-words">
      {value || "Not added yet"}
    </p>
  </div>
);

export default RecruiterProfileCard;
