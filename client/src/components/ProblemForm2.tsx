import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

type Form = {
  firstName: String;
  lastName: String;
  issue: String;
  phoneNumber: Number;
  email: String;
  address: String;
};

export default function ProblemForm2() {
  const navigate = useNavigate();
  let formType = useParams();
  const server = "https://barnett-server-0ed9053145e3.herokuapp.com";
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    issue: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const key = "HOrDSminglINtIONAlMANTEreStERONyVeLEClINENDOWEAmBi";

    try {
      const config = {
        method: "post",
        url: `${server}/api/form/${formType.type}/${key}`,
        headers: { "Content-Type": "application/json" },
        data: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          issue: formData.issue,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          address: formData.address,
        },
      };
      const result = await axios(config);
      // go to thank you page.
    } catch (error) {
      console.log("Error Submitting to Server");
    }
    navigate("/thankyou");
  };

  return (
    <div className="">
      <h1 className="mt-2 text-4xl font-bold text-center">{formType.type}</h1>
      <form
        className="w-full max-w-lg p-5 m-auto mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-first-name"
            >
              First Name
            </label>
            <input
              className={`block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white`}
              id="grid-first-name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              type="text"
              placeholder="John"
              required
            />
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-last-name"
            >
              Last Name
            </label>
            <input
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              placeholder="Doe"
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-password"
            >
              {formType.type === "development"
                ? "Give a descrtiption of your idea/needs"
                : "Describe your issue."}
            </label>
            <textarea
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-issue"
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              rows={5}
              maxLength={500}
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              type="string"
              placeholder="(203) 123-4567"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3">
            <label
              className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
              htmlFor="grid-email"
            >
              Email
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="John.Doe@email.com"
              required
            />
          </div>
        </div>
        {formType.type != "development" && (
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <label
                className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase"
                htmlFor="grid-email"
              >
                Address
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-email"
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="string"
                placeholder="84 S Main St, Cheshire, CT 06410"
                required
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <div className="p-3 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
