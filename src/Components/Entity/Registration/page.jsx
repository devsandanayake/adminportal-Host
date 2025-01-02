import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerEntity } from "../../../actions/entityAction";

export default function Page() {
  const dispatch = useDispatch();

  // Access Redux state
  const { loading, error, data } = useSelector((state) => state.entity);

  const [formData, setFormData] = useState({
    name: "",
    entityTypeCode: "",
    description: "",
    entityBranches: [{ name: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBranchChange = (index, value) => {
    const updatedBranches = [...formData.entityBranches];
    updatedBranches[index].name = value;
    setFormData({ ...formData, entityBranches: updatedBranches });
  };

  const addBranch = () => {
    setFormData((prev) => ({
      ...prev,
      entityBranches: [...prev.entityBranches, { name: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerEntity(formData)); // Use Redux action to handle API call
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Register New Entity</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter entity name"
            required
          />
        </div>

        {/* Entity Type Code */}
            <div>
          <label className="block font-medium mb-2">Entity Type Code</label>
          <select
            name="entityTypeCode"
            value={formData.entityTypeCode}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            required
          >
            <option value="" disabled>Select entity type code</option>
            <option value="PRIVATE_ENTITY_FULLY_OWNED">PRIVATE_ENTITY_FULLY_OWNED</option>
            <option value="GOVERNMENT_ENTITY_FULLY_OWNED">GOVERNMENT_ENTITY_FULLY_OWNED</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded px-4 py-2 w-full"
            placeholder="Enter description"
            rows={4}
            required
          ></textarea>
        </div>

        {/* Branches */}
        <div>
          <label className="block font-medium mb-2">Branches</label>
          {formData.entityBranches.map((branch, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={branch.name}
                onChange={(e) => handleBranchChange(index, e.target.value)}
                className="border rounded px-4 py-2 flex-grow"
                placeholder={`Branch ${index + 1} name`}
                required
              />
              {index === formData.entityBranches.length - 1 && (
                <button
                  type="button"
                  onClick={addBranch}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Branch
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 rounded text-white ${
            loading ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}

       
      </form>
    </div>
  );
}