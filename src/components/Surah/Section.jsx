"use client";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDuaContext } from "./ContextProvider";
import { useState, useEffect, useRef } from "react";
import Category from "../Category/Category";

export default function Section() {
  const { sectionTitle } = useDuaContext();
  const [open, setOpen] = useState(false);
  const categoryRef = useRef(null); // Reference for the Category component

  // Toggle the "open" state
  const toggle = () => setOpen((prev) => !prev);

  // Close the category if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setOpen(false); // Close the category
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header with Hamburger Menu */}
      <div className="lg:hidden flex gap-x-2 items-center px-2 py-4 border bg-white my-4  ">
        <button onClick={toggle}>
          <GiHamburgerMenu size={30} className="cursor-pointer" />
        </button>
        <span className="text-xl">Dua s Importance</span>
      </div>

      {/* Section Title */}
      {sectionTitle && (
        <div className="border border-black p-2 bg-white rounded-md">
          <h1 className="text-base">
            <span className="text-green-500 font-medium">Section:</span>
            <span className="pl-4">{sectionTitle}</span>
          </h1>
        </div>
      )}

      {/* Category */}
      <div ref={categoryRef} className="lg:hidden ">
        <Category isOpen={open} />
      </div>
    </>
  );
}
