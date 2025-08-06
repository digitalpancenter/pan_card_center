import React, { useState } from 'react';
import axios from 'axios';

const PanForm = () => {
  const [form, setForm] = useState({
    lastName: '',
    firstName: '',
    nameOnCard: '',
    gender: '',
    dob: '',
    parentType: '',
    parentName: '',
    addressType: '',
    address: '',
    mobile: '',
    email: '',
    aadhaar: '',
    aadhaarName: '',
    incomeSource: '',
    identityProof: '',
    addressProof: '',
    dobProof: '',
    applicantStatus: '', // ✅ Added
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updatedForm = {
        ...prev,
        [name]: value,
      };

      // Auto-update name on card
      if (name === 'firstName' || name === 'lastName') {
        updatedForm.nameOnCard = `${name === 'firstName' ? value : prev.firstName} ${name === 'lastName' ? value : prev.lastName}`;
      }

      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/pan-application', form);
      alert('Form submitted successfully');
      setForm({
        lastName: '',
        firstName: '',
        nameOnCard: '',
        gender: '',
        dob: '',
        parentType: '',
        parentName: '',
        addressType: '',
        address: '',
        mobile: '',
        email: '',
        aadhaar: '',
        aadhaarName: '',
        incomeSource: '',
        identityProof: '',
        addressProof: '',
        dobProof: '',
        applicantStatus: '', // ✅ Reset
      });
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <div className='pandetal'>
 <div className="relative overflow-hidden bg-yellow-100 border border-red-500">
      <div className="whitespace-nowrap animate-marquee px-4 text-red-700 font-semibold text-lg">
        <span className="mx-10">
          💳 Per PAN Card ₹110 rupaye debit hoga
        </span>
        <span className="mx-10">
          ⏰ Working Time: Subah 10:00 se Shaam 8:00 baje tak
        </span>
      </div>
    </div>
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto p-6 bg-white rounded shadow space-y-6"
    >
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name / Surname" className="border p-2 rounded w-full text-sm placeholder-gray-400" />
        <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" className="border p-2 rounded w-full text-sm placeholder-gray-400" />
        <input name="nameOnCard" value={form.nameOnCard} readOnly className="border p-2 rounded bg-gray-100 w-full text-sm placeholder-gray-400" placeholder="Name on PAN Card" />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select name="gender" value={form.gender} onChange={handleChange} className="border p-2 rounded w-full text-sm text-gray-600">
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input name="dob" type="date" value={form.dob} onChange={handleChange} className="border p-2 rounded w-full text-sm text-gray-600" />

        <select name="parentType" value={form.parentType} onChange={handleChange} className="border p-2 rounded w-full text-sm text-gray-600">
          <option value="">Select Parent Type</option>
          <option value="Mother">Mother</option>
          <option value="Father">Father</option>
        </select>
      </div>

      {/* Row 3 - Conditional Parent Name */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {form.parentType && (
          <input
            name="parentName"
            value={form.parentName}
            onChange={handleChange}
            placeholder={`${form.parentType}'s Name`}
            className="border p-2 rounded w-full text-sm placeholder-gray-400"
          />
        )}
      </div>

      {/* Row 4 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="addressType" value={form.addressType} onChange={handleChange} className="border p-2 rounded w-full text-sm text-gray-600">
          <option value="">Select Address Type</option>
          <option value="Residence">Residence Address</option>
          <option value="Office">Office Address</option>
        </select>

        {form.addressType && (
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder={form.addressType === 'Residence' ? 'Home Full Address' : 'Office Full Address'}
            className="border p-2 rounded w-full text-sm placeholder-gray-400"
          />
        )}
      </div>

      {/* Row 5 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" className="border p-2 rounded w-full text-sm placeholder-gray-400" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email ID" className="border p-2 rounded w-full text-sm placeholder-gray-400" />

        {/* ✅ Status of Applicant Dropdown */}
        <select name="applicantStatus" value={form.applicantStatus} onChange={handleChange} className="border p-2 rounded w-full text-sm text-gray-600">
          <option value="">Please select status</option>
          <option value="Government">Government</option>
          <option value="Individual">Individual</option>
          <option value="Hindu Undivided Family">Hindu Undivided Family</option>
          <option value="Company">Company</option>
          <option value="Partnership Firm">Partnership Firm</option>
          <option value="Association of Persons">Association of Persons</option>
          <option value="Trusts">Trusts</option>
          <option value="Body of Individuals">Body of Individuals</option>
          <option value="Local Authority">Local Authority</option>
          <option value="Artificial Juridical Persons">Artificial Juridical Persons</option>
          <option value="Limited Liability Partnership">Limited Liability Partnership</option>
        </select>
      </div>

      {/* Row 6 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="aadhaar" value={form.aadhaar} onChange={handleChange} placeholder="Aadhaar Number" className="border p-2 rounded w-full text-sm placeholder-gray-400" />

        <input name="aadhaarName" value={form.aadhaarName} onChange={handleChange} placeholder="Name as per Aadhaar" className="border p-2 rounded w-full text-sm placeholder-gray-400" />

        <select name="incomeSource" value={form.incomeSource} onChange={handleChange} className="border p-2 rounded w-full text-sm text-gray-600">
          <option value="">Select Income Source</option>
          <option>Salary</option>
          <option>Capital Gains</option>
          <option>Income from Business / Profession</option>
          <option>Income from Other sources</option>
          <option>Income from House property</option>
          <option>No Income</option>
        </select>
      </div>

      {/* Row 7 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input name="identityProof" value={form.identityProof} onChange={handleChange} placeholder="Proof of Identity" className="border p-2 rounded w-full text-sm placeholder-gray-400" />
        <input name="addressProof" value={form.addressProof} onChange={handleChange} placeholder="Proof of Address" className="border p-2 rounded w-full text-sm placeholder-gray-400" />
        <input name="dobProof" value={form.dobProof} onChange={handleChange} placeholder="Proof of Date of Birth" className="border p-2 rounded w-full text-sm placeholder-gray-400" />
      </div>

      <div className="text-center">
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mt-4">
          Submit
        </button>
      </div>
    </form>
    </div>
  );
};

export default PanForm;
