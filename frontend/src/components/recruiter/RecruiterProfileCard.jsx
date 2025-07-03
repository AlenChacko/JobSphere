const RecruiterProfileCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6">
      {/* Company Logo */}
      <div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
        {/* Placeholder for company logo image */}
        <span className="text-2xl text-gray-500">Logo</span>
        {/* Replace with: <img src={companyLogoUrl} alt="Company Logo" className="w-full h-full object-cover" /> */}
      </div>

      {/* Details */}
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Company Name</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 font-semibold">Recruiter Name</p>
            <p className="text-gray-700">John Doe</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Email</p>
            <p className="text-gray-700">recruiter@example.com</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Website</p>
            <p className="text-gray-700">www.company.com</p>
          </div>
          <div>
            <p className="text-gray-600 font-semibold">Phone</p>
            <p className="text-gray-700">+1 234 567 8900</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfileCard;
