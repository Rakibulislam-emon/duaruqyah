"use client";
import React, { useEffect, useState } from "react";
import CategoryContentCard from "./CategoryContentCard";
import { useSearch } from "./SearchContext";
//
export default function CategoryContents() {
  const url = process.env.NEXT_PUBLIC_API_URL;

  const { searchTerm } = useSearch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/api/categories`);
        console.log('response:', response)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result); // Store the fetched data in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Call fetchData to load the data
  }, [url]); // Empty dependency array to ensure it runs only once when the component mounts

  // Filter data based on the searchTerm if it exists, otherwise show all data
  const filteredData = searchTerm
    ? data.filter((item) =>
        item?.cat_name_en?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  // Show loading or error states if applicable
  if (loading) return <p className="text-center">loading....</p>;
  if (error) return <p>Error: {error}</p>;

  // Return the data, either filtered or all data if no search term
  return (
    <div className="border w-full">
      {filteredData.length > 0 ? (
        <CategoryContentCard getData={filteredData} />
      ) : (
        <p>No categories found</p> // Display message if no data matches the search
      )}
    </div>
  );
}
