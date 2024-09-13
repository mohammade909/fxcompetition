// PackageCard.js

// Packages.js

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import { fetchAllPackages } from "../../../actions/package";
import { useSelector, useDispatch } from "react-redux";
import PackageCard from "../components/PackageCard";

const Packages = () => {
  const dispatch = useDispatch();
  const [selectedSwap, setSelectedSwap] = useState({});
  const [selectedLevel, setSelectedLevel] = useState({});
  const [selectedAmount, setSelectedAmount] = useState({});
  const { packages } = useSelector((state) => state.packages);
  const [currentTab, setCurrentTab] = useState(packages[0]?.package_name);
  const handleSwapChange = (package_id, selected) => {
    setSelectedSwap((prev) => ({ ...prev, [package_id]: selected }));
  };

  const handleLevelChange = (package_id, selected) => {
    setSelectedLevel((prev) => ({ ...prev, [package_id]: selected }));
  };

  const handleAmountChange = (package_id, amount) => {
    setSelectedAmount((prev) => ({ ...prev, [package_id]: amount }));
  };

  useEffect(() => {
    dispatch(fetchAllPackages());
  }, [currentTab]);
  // Array of data objects representing packages1

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl md:text-2xl font-bold">Packages</h1>
        </div>
        <div className="flex py-5 gap-5">
          {packages?.map((item) => (
            <button
              onClick={() => setCurrentTab(item?.package_name)}
              className={`${
                item.package_name === currentTab
                  ? "border-green-700 border-b-4"
                  : ""
              } bg-green-500 mt-5 shine-effect  text-black hover:text-white px-4 py-2 rounded shadow-custom hover:bg-green-600`}
            >
              {item.package_name}
            </button>
          ))}
        </div>
        <div className="flex justify-around flex-wrap">
          {packages
            ?.filter((item) => item.package_name === currentTab)
            .map((data, index) => (
              <PackageCard
                key={data.package_id}
                data={data}
                selectedSwap={selectedSwap[data.package_id] || "swapFee"}
                selectedLevel={selectedLevel[data.package_id] || "level1"}
                selectedAmount={
                  selectedAmount[data.package_id] || data.amountAndFee[0].amount
                }
                onSwapChange={handleSwapChange}
                onLevelChange={handleLevelChange}
                onAmountChange={handleAmountChange}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
