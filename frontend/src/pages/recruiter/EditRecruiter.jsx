import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecruiterProfile, updateRecruiterProfile } from "../../redux/slices/recruiterSlice";
import { toast } from "react-toastify";

const companySizeOptions = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
];

const EditRecruiter = () => {
  const [logoPreview, setLogoPreview] = useState("");
  const [logoFile, setLogoFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { recruiterInfo, loading } = useSelector((state) => state.recruiter);

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    recruiterName: "",
    phone: "",
    companySize: "",
    industry: "",
    location: {
      country: "",
      state: "",
      city: "",
    },
    links: {
      linkedIn: "",
      website: "",
      twitter: "",
    },
    aboutCompany: "",
  });

  useEffect(() => {
    dispatch(fetchRecruiterProfile());
  }, [dispatch]);

  useEffect(() => {
    if (recruiterInfo) {
      setForm({
        companyName: recruiterInfo.companyName || "",
        email: recruiterInfo.email || "",
        recruiterName: recruiterInfo.recruiterName || "",
        phone: recruiterInfo.phone || "",
        companySize: recruiterInfo.companySize || "",
        industry: recruiterInfo.industry || "",
        location: {
          country: recruiterInfo.location?.country || "",
          state: recruiterInfo.location?.state || "",
          city: recruiterInfo.location?.city || "",
        },
        links: {
          linkedIn: recruiterInfo.links?.linkedIn || "",
          website: recruiterInfo.links?.website || "",
          twitter: recruiterInfo.links?.twitter || "",
        },
        aboutCompany: recruiterInfo.aboutCompany || "",
      });

      setLogoPreview(recruiterInfo.companyLogo || "");
    }
  }, [recruiterInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form) {
      setForm({ ...form, [name]: value });
    }
  };

  const handleNestedChange = (section, key, value) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogoPreview(imageUrl);
      setLogoFile(file);
    }
  };

  const removePreview = () => {
    setLogoPreview("");
    setLogoFile(null);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("companyName", form.companyName);
    formData.append("recruiterName", form.recruiterName);
    formData.append("phone", form.phone);
    formData.append("companySize", form.companySize);
    formData.append("industry", form.industry);
    formData.append("aboutCompany", form.aboutCompany);
    formData.append("country", form.location.country);
    formData.append("state", form.location.state);
    formData.append("city", form.location.city);
    formData.append("linkedIn", form.links.linkedIn);
    formData.append("website", form.links.website);
    formData.append("twitter", form.links.twitter);

    if (logoFile) {
      formData.append("companyLogo", logoFile);
    }

    try {
      await dispatch(updateRecruiterProfile(formData)).unwrap();
      toast.success("Profile updated successfully");
      navigate("/recruiter/dashboard");
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8 text-center">Edit Recruiter Profile</h2>

      <form className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={form.companyName}
              onChange={handleChange}
              placeholder="Company Name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              disabled
              className="w-full p-2 border rounded bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block mb-1">Recruiter Name</label>
            <input
              type="text"
              name="recruiterName"
              value={form.recruiterName}
              onChange={handleChange}
              placeholder="Recruiter Name"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Company Size</label>
            <select
              name="companySize"
              value={form.companySize}
              onChange={handleChange}
              className="w-full p-2 border rounded bg-white"
            >
              <option value="">Select Size</option>
              {companySizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Industry</label>
            <input
              type="text"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              placeholder="Industry"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              value={form.location.country}
              onChange={(e) => handleNestedChange("location", "country", e.target.value)}
              placeholder="Country"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">State</label>
            <input
              type="text"
              value={form.location.state}
              onChange={(e) => handleNestedChange("location", "state", e.target.value)}
              placeholder="State"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">City</label>
            <input
              type="text"
              value={form.location.city}
              onChange={(e) => handleNestedChange("location", "city", e.target.value)}
              placeholder="City"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-1">LinkedIn</label>
            <input
              type="text"
              value={form.links.linkedIn}
              onChange={(e) => handleNestedChange("links", "linkedIn", e.target.value)}
              placeholder="LinkedIn URL"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Website</label>
            <input
              type="text"
              value={form.links.website}
              onChange={(e) => handleNestedChange("links", "website", e.target.value)}
              placeholder="Website URL"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1">Twitter</label>
            <input
              type="text"
              value={form.links.twitter}
              onChange={(e) => handleNestedChange("links", "twitter", e.target.value)}
              placeholder="Twitter URL"
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* About Company */}
        <div>
          <label className="block mb-1">About Company</label>
          <textarea
            value={form.aboutCompany}
            onChange={(e) => setForm({ ...form, aboutCompany: e.target.value })}
            placeholder="Write about your company..."
            rows="4"
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* Company Logo */}
        <div>
          <label className="block mb-2">Company Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImagePreview}
            className="w-full"
          />
          {logoPreview && (
            <div className="relative inline-block mt-3">
              <button
                type="button"
                onClick={removePreview}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
              >
                X
              </button>
              <img
                src={logoPreview}
                alt="Company Logo Preview"
                className="h-24 object-contain border rounded"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecruiter;
