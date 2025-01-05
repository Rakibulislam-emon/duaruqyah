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

  const handleGetSubData = async (categoryId) => {
    if (expandedCategoryId === categoryId) {
      setExpandedCategoryId(null); // Collapse if already expanded
      return;
    }

    try {
      const response = await fetch(
        `${url}/api/subcategories?categoryId=${categoryId}`
      );
      console.log(response);
      const data = await response.json();
      console.log('data:', data)
      setSubcategories(data || []); // Ensure fallback to empty array
      setExpandedCategoryId(categoryId);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      setSubcategories([]); // Handle errors gracefully
    }
  };

  // Automatically expand the first category on initial render
  useEffect(() => {
    if (getData.length > 0) {
      const firstCategoryId = getData[0].cat_id;

      // Only fetch if the expandedCategoryId is not already set
      if (expandedCategoryId === null) {
        handleGetSubData(firstCategoryId);
      }
    }
    // Removed `handleGetSubData` from the dependency array
    // Added `expandedCategoryId` to ensure one-time execution
  }, []);

  const getIconForCategory = (categoryId) => {
    const icon = categoryIcons.find((icon) => icon.id === categoryId);
    return icon ? icon.icon : null;
  };

  return (
    <div className="overflow-y-auto lg:max-h-[70vh]">
      {getData.map((category) => (
        <div key={category.cat_id} className="p-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => handleGetSubData(category.cat_id)}
          >
            <div className="flex gap-x-3">
              {/* Display the category icon */}
              {getIconForCategory(category.cat_id) && (
                <Image
                  src={getIconForCategory(category.cat_id)}
                  width={40}
                  height={40}
                  alt="category icon"
                  style={{ width: "40px", height: "auto" }}
                />
              )}
              <div>
                <h2>{category.cat_name_en}</h2>
                <h2>Subcategory: {category.no_of_subcat}</h2>
              </div>
            </div>
            <div className="text-center border-l-2">
              <p className="px-4">
                {category.no_of_dua} <br /> dua
              </p>
            </div>
          </div>

          {/* Render subcategories if the category is expanded */}
          {expandedCategoryId === category.cat_id && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
              <ul className="mt-2 list-decimal pl-4">
                {subcategories.length > 0 ? (
                  subcategories.map((subcat) => (
                    <li
                      key={subcat.subcat_id}
                      onClick={() => setSubcategoryId(subcat.subcat_id)}
                      className="p-2 border-b cursor-pointer hover:bg-gray-100"
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
