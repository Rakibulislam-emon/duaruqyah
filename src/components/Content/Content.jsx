import React from "react";
import Navbar from "../Navbar/Navbar";
import Category from "../Category/Category";
import Surah from "../Surah/Surah";
import { DuaProvider } from "../Surah/ContextProvider";

export default function Content() {
  return (
    <div className="lg:mx-10 ">
      {/* nav */}
      <Navbar />

      {/* main body */}
      <DuaProvider>
        <div className=" flex lg:mt-4">
          <div className="lg:w-1/3 ">
            <Category />
          </div>
          <Surah />
        </div>
      </DuaProvider>
    </div>
  );
}
