import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateRecruiterProfile,
  fetchRecruiterById,
} from "../../redux/slices/recruiterSlice";

const EditRecruiter = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { profile: recruiterProfile, loading } = useSelector(
    (state) => state.recruiter
  );

  const [form, setForm] = useState({
    companyName: "",
    recruiterName: "",
    industry: "",
    aboutCompany: "",
    phone: "",
    designation: "",
    location: { country: "", state: "", city: "" },
    links: { linkedIn: "", website: "", twitter: "" },
  });

  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);

  // 🔹 Fetch recruiter data on mount
  useEffect(() => {
    if (id && token) {
      dispatch(fetchRecruiterById({ id, token }));
    }
  }, [id, token, dispatch]);

  // 🔹 Set form values once recruiter data is fetched
  useEffect(() => {
    if (recruiterProfile) {
      setForm({
        companyName: recruiterProfile.companyName || "",
        recruiterName: recruiterProfile.recruiterName || "",
        industry: recruiterProfile.industry || "",
        aboutCompany: recruiterProfile.aboutCompany || "",
        phone: recruiterProfile.phone || "",
        designation: recruiterProfile.designation || "",
        location: recruiterProfile.location || {
          country: "",
          state: "",
          city: "",
        },
        links: recruiterProfile.links || {
          linkedIn: "",
          website: "",
          twitter: "",
        },
      });
      setCompanyLogoPreview(recruiterProfile.companyLogo || null);
    }
  }, [recruiterProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("location.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else if (name.includes("links.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        links: { ...prev.links, [key]: value },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompanyLogo(file);
    setCompanyLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let key in form) {
      if (typeof form[key] === "object") {
        formData.append(key, JSON.stringify(form[key]));
      } else {
        formData.append(key, form[key]);
      }
    }

    if (companyLogo) formData.append("companyLogo", companyLogo);

    try {
      const resultAction = await dispatch(
        updateRecruiterProfile({ formData, token })
      );

      if (updateRecruiterProfile.fulfilled.match(resultAction)) {
        const updatedRecruiter = resultAction.payload;
        navigate(`/recruiter/dashboard/${updatedRecruiter._id}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ✅ Render loader while fetching recruiter profile
  if (loading || !recruiterProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Edit Recruiter Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Company Logo Upload */}
        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">
            Company Logo
          </label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {companyLogoPreview && (
            <img
              src={companyLogoPreview}
              alt="Preview"
              className="mt-3 h-24 rounded-lg object-cover border"
            />
          )}
        </div>

        <InputField
          name="companyName"
          label="Company Name"
          value={form.companyName}
          onChange={handleInputChange}
          required
        />
        <InputField
          name="recruiterName"
          label="Recruiter Name"
          value={form.recruiterName}
          onChange={handleInputChange}
        />
        <InputField
          name="industry"
          label="Industry"
          value={form.industry}
          onChange={handleInputChange}
        />
        <InputField
          name="designation"
          label="Designation"
          value={form.designation}
          onChange={handleInputChange}
        />

        <div className="md:col-span-2">
          <label className="block font-medium text-gray-700 mb-1">
            About Company
          </label>
          <textarea
            name="aboutCompany"
            value={form.aboutCompany}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded-md"
            rows="3"
          />
        </div>

        <InputField
          name="phone"
          label="Phone"
          value={form.phone}
          onChange={handleInputChange}
        />
        <InputField
          name="links.website"
          label="Website"
          value={form.links.website}
          onChange={handleInputChange}
        />
        <InputField
          name="links.linkedIn"
          label="LinkedIn"
          value={form.links.linkedIn}
          onChange={handleInputChange}
        />
        <InputField
          name="links.twitter"
          label="Twitter"
          value={form.links.twitter}
          onChange={handleInputChange}
        />
        <InputField
          name="location.country"
          label="Country"
          value={form.location.country}
          onChange={handleInputChange}
        />
        <InputField
          name="location.state"
          label="State"
          value={form.location.state}
          onChange={handleInputChange}
        />
        <InputField
          name="location.city"
          label="City"
          value={form.location.city}
          onChange={handleInputChange}
        />

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-md mt-4"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

// 🔸 Reusable InputField component
const InputField = ({ name, label, value, onChange, required = false }) => (
  <div>
    <label className="block font-medium text-gray-700 mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border px-3 py-2 rounded-md"
    />
  </div>
);

export default EditRecruiter;
