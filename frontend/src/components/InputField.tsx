import React from "react";

export default function InputField({ type = "text", label, name }) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm/6 font-medium text-gray-900"
      >
        Email address
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={name}
          id={label}
          autoComplete="email"
          required
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        />
      </div>
    </div>
  );
}
