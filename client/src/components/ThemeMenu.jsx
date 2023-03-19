import React, { useState } from "react";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { themes } from "../theme";

export default function ThemeMenu({ handleThemeChange }) {
  const [theme, setTheme] = useState(themes.light);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="flex items-center">
            <span className="mr-2 text-white">Change theme</span>
            {/* <span className="mr-2 text-white font-semibold">Change Theme</span> */}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel className="absolute z-10 top-full left-0 bg-gray-800 text-white rounded-md shadow-lg">
              <div className="py-2">
                {Object.keys(themes).map((key) => (
                  <button
                    key={key}
                    className={`block w-full px-4 py-2 text-left ${
                      themes[key] === theme ? "bg-gray-700 text-white" : ""
                    }`}
                    onClick={() => handleThemeChange(themes[key])}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
