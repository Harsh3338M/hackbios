"use client"
import { useState } from "react";
import { Upload, Eye, EyeOff } from "lucide-react";
import { create } from "domain";
import { createUser } from "@/lib/User";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    workEmail: "",
    password: "",
    passwordConfirm: "",
    mobilePhone: "",
    legalCompanyName: "",
    companyType: "",
    countryOfRegistration: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    companyWebsite: "",
    businessRegistrationNumber: "",
    taxID: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const companyTypes = [
    "LLC",
    "Ltd.",
    "Corp",
    "Sole Proprietorship",
    "Partnership",
    "LLP",
    "Public Company",
    "Private Company",
    "Cooperative",
    "NGO",
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "India",
    "China",
    "Japan",
    "Australia",
    "Brazil",
    "Mexico",
    "Singapore",
    "UAE",
    "South Korea",
    "Russia",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Switzerland",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (validTypes.includes(file.type)) {
        setUploadedFile(file);
      } else {
        alert("Please upload a PDF or JPG file");
      }
    }
  };


  const handleSubmit = (isDraft: boolean) => {
    if (!isDraft) {
      if (
        !formData.fullName ||
        !formData.jobTitle ||
        !formData.workEmail ||
        !formData.password ||
        !formData.passwordConfirm ||
        !formData.mobilePhone ||
        !formData.legalCompanyName ||
        !formData.companyType ||
        !formData.countryOfRegistration ||
        !formData.streetAddress ||
        !formData.city ||
        !formData.state ||
        !formData.postalCode ||
        !formData.country ||
        !formData.businessRegistrationNumber ||
        !formData.taxID ||
        !uploadedFile
      ) {
        alert("Please fill in all required fields");
        return;
      }

      if (formData.password !== formData.passwordConfirm) {
        alert("Passwords do not match");
        return;
      }

      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail)) {
        alert("Please enter a valid email address");
        return;
      }
    }

    const data = {
      ...formData,
      documentFile: uploadedFile?.name || null,
      timestamp: new Date().toISOString(),
    };

const response = createUser(data);
console.log(response);

    console.log(isDraft ? "Saving draft..." : "Submitting...", data);
    alert(
      isDraft
        ? "Registration draft saved!"
        : "Registration submitted successfully! Please check your email for verification."
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-slate-600">
            Join ShipCo and start trading globally with verified partners
          </p>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Card 1 - User Account Details */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Account Details
          </h2>

          <div className="space-y-6">
            {/* Name and Job Title - Adjacent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  placeholder="e.g., Export Manager"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Work Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Work Email (Login ID) <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="workEmail"
                value={formData.workEmail}
                onChange={handleInputChange}
                placeholder="your.email@company.com"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password (min 8 characters)"
                    className="w-full px-4 py-2 pr-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    className="w-full px-4 py-2 pr-10 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPasswordConfirm ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Mobile Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="mobilePhone"
                value={formData.mobilePhone}
                onChange={handleInputChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Card 2 - Company Details */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Company Details
          </h2>

          <div className="space-y-6">
            {/* Legal Company Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Legal Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="legalCompanyName"
                value={formData.legalCompanyName}
                onChange={handleInputChange}
                placeholder="Enter legal company name"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Company Type and Country - Adjacent */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Company Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">Select company type</option>
                  {companyTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Country of Registration{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="countryOfRegistration"
                  value={formData.countryOfRegistration}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Business Address */}
            <fieldset className="border border-slate-300 rounded-lg p-4">
              <legend className="text-sm font-semibold text-slate-700 px-2">
                Full Business Address <span className="text-red-500">*</span>
              </legend>

              <div className="space-y-4 mt-4">
                {/* Street Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="123 Business Street"
                    className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* City and State - Adjacent */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New York"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      State / Province
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Postal Code and Country - Adjacent */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                    >
                      <option value="">Select country</option>
                      {countries.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Company Website */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Company Website <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleInputChange}
                placeholder="https://www.company.com"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Card 3 - Company Verification */}
        <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Company Verification
          </h2>

          <div className="space-y-6">
            {/* Business Registration Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Business Registration Number{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="businessRegistrationNumber"
                value={formData.businessRegistrationNumber}
                onChange={handleInputChange}
                placeholder="e.g., REG-2024-001234"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Tax ID / VAT Number */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Tax ID / VAT Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="taxID"
                value={formData.taxID}
                onChange={handleInputChange}
                placeholder="e.g., VAT-123456789"
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Upload Business Registration Certificate{" "}
                <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-slate-600 mb-3">
                Accepted formats: PDF, JPG (Max 5MB)
              </p>

              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="hidden"
                  id="fileUpload"
                />
                <label
                  htmlFor="fileUpload"
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-dashed border-slate-300 hover:border-blue-500 cursor-pointer transition-colors"
                >
                  <Upload className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500">
                      PDF, JPG or PNG (max 5MB)
                    </p>
                  </div>
                </label>
              </div>

              {uploadedFile && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center justify-between">
                  <span className="text-sm text-green-700 font-medium">
                    ✓ {uploadedFile.name}
                  </span>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="text-green-600 hover:text-green-700 font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submit Section - Green buttons centered */}
        <div className="flex justify-center gap-4 py-8">
          <button
            onClick={() => handleSubmit(true)}
            className="px-8 py-3 bg-white border-2 border-green-600 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit(false)}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}