"use client";
import { useEffect, useState } from "react";
import { useDuaContext } from "./ContextProvider";
import DuaCard from "./DuaCard";
import { useSearch } from "../Category/SearchContext";

export default function SurahCard() {
    const url = process.env.NEXT_PUBLIC_API_URL

    const { search } = useSearch()

    const { subcategoryId, setSectionTitle } = useDuaContext();
    const [duas, setDuas] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const fetchDuas = async () => {
            setLoading(true);
            try {
                const response = await fetch(subcategoryId ? `${url}/api/duas?subcategoryId=${subcategoryId}` : `${url}/api/duas?subcategoryId=${1}`);
                const data = await response.json();
                setSectionTitle(data[1]?.dua_name_en
                )
                setDuas(data);
            } catch (error) {
                console.error("Error fetching duas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDuas();
    }, [subcategoryId]);
    const filteredData = search
        ? duas.filter((item) =>
            item?.refference_en?.toLowerCase().includes(search.toLowerCase())
        )
        : duas;


    return (
        <div className="w-full p-6 bg-gray-50">

            {loading ? (
                <p className="text-center">Loading......</p>
            ) : (
                <DuaCard duas={filteredData} />
            )}
        </div>
    );
}
