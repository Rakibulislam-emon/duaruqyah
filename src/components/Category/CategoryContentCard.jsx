"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useDuaContext } from "../Surah/ContextProvider";
import categoryIcons from "./categoryIcons";

export default function CategoryContentCard({ getData }) {
  const url = process.env.NEXT_PUBLIC_API_URL;
  const { setSubcategoryId } = useDuaContext();
  const [subcategories, setSubcategories] = useState([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);

  // Memoizing the handleGetSubData function with useCallback
  const handleGetSubData = useCallback(
    async (categoryId) => {
      if (expandedCategoryId === categoryId) {
        // If clicked category is already expanded, collapse it
        setExpandedCategoryId(null);
        return;
      }

      try {
        const response = await fetch(
          `${url}/api/subcategories?categoryId=${categoryId}`
        );
        const data = await response.json();
        setSubcategories(data); // Store fetched subcategories in the state
        setExpandedCategoryId(categoryId); // Set the clicked category as expanded
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    },
    [expandedCategoryId, url]
  );

  // Automatically expand the first category on initial render
  useEffect(() => {
    if (getData.length > 0) {
      setExpandedCategoryId(getData[0].cat_id); // Set the first category as expanded initially
      handleGetSubData(getData[0].cat_id); // Fetch subcategories for the first category
    }
  }, [getData, handleGetSubData]); // Ensure handleGetSubData is included in the dependency array

  // Function to get the corresponding icon based on category id
  const getIconForCategory = (categoryId) => {
    const icon = categoryIcons.find((icon) => icon.id === categoryId); // Match by category id
    return icon ? icon.icon : null; // Return the icon if found, otherwise null
  };

  return (
    <div className="overflow-y-auto lg:max-h-[70vh]">
      {getData.map((category) => (
        <div key={category.id} className="p-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => handleGetSubData(category.cat_id)}
          >
            <div className="flex gap-x-3">
              {/* Display the category icon */}
              <div className="flex gap-x-2">
                {getIconForCategory(category.cat_id) && (
                  <Image
                    src={getIconForCategory(category.cat_id)}
                    width={40} // Only set width
                    height={40} // Remove this to auto calculate height
                    alt="category icon"
                    style={{ width: "40px", height: "auto" }} // CSS ensures aspect ratio is maintained
                  />
                )}
                <div>
                  <h2>{category.cat_name_en}</h2>
                  <h2>Subcategory: {category.no_of_subcat}</h2>
                </div>
              </div>
            </div>
            <div className="text-center border-l-2">
              <p className="px-4">
                {category.no_of_dua} <br /> dua
              </p>
            </div>
          </div>

          {/* Show the subcategories directly below the clicked category */}
          {expandedCategoryId === category.cat_id && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
              <ul className="mt-2 list-decimal pl-4">
                {subcategories.length > 0 ? (
                  subcategories.map((subcat) => (
                    <li
                      onClick={() => setSubcategoryId(subcat.subcat_id)} // Set the clicked subcategory
                      key={subcat.subcat_id}
                      className="p-2 border-b"
                    >
                      <button>{subcat.subcat_name_en}</button>
                    </li>
                  ))
                ) : (
                  <p>No subcategories available.</p>
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
