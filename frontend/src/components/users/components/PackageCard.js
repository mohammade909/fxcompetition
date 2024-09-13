import React, { useEffect, useState } from "react";

import { CheckIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const tabs = [
  { name: "weeklyPayout" },
  { name: "Refund" },
  { name: "Min Trade" },
];
const PackageCard = ({
  data,
  selectedSwap,
  selectedLevel,
  selectedAmount,
  onSwapChange,
  onLevelChange,
  onAmountChange,
}) => {
  const {
    package_id,

    package_name,

    swap_fee,
    swap_free,

    broker_name,

    platform_name,

    rule_name,

    amountAndFee,
    levelFees,

    weeklyPayout,
    refund,
    minTrading,
  } = data;
  const [active, setActive] = useState("weeklyPayout");
  const [isRefundSelected, setIsRefundSelected] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [isMinTradeSelected, setIsMinTradeSelected] = useState(false);
  const [minTrade, setMinTrade] = useState(null);

  const [isBiWeeklyPayoutSelected, setIsBiWeeklyPayoutSelected] =
    useState(false);
  const [weeklyPayoutAmount, setWeeklyPayoutAmount] = useState(0);

  const handleCheckboxChange = () => {
    // Toggle the checkbox state
    setIsBiWeeklyPayoutSelected((prevState) => {
      const newState = !prevState;
      if (newState) {
        // Set the amount when checked
        setWeeklyPayoutAmount(weeklyPayout?.amount);
      } else {
        // Clear the amount when unchecked
        setWeeklyPayoutAmount(0);
      }
      return newState;
    });
  };
  const handleRefundCheckboxChange = (rf) => {
    // Toggle the checkbox state
    setIsRefundSelected((prevState) => {
      const newState = !prevState;
      if (newState) {
        // Set the amount when checked
        setRefundAmount(rf);
      } else {
        // Clear the amount when unchecked
        setRefundAmount(0);
      }
      return newState;
    });
  };
  const handleMinTradeCheckboxChange = (trade) => {
    // Toggle the checkbox state
    setIsMinTradeSelected((prevState) => {
      const newState = !prevState;
      if (newState) {
        // Set the amount when checked
        setMinTrade(trade);
      } else {
        // Clear the amount when unchecked
        setMinTrade(null);
      }
      return newState;
    });
  };

  const selectedAmountData =
    amountAndFee.find((item) => item.amount === selectedAmount) ||
    amountAndFee[0];
  const swapAmount =
    selectedSwap === "swapFee" ? parseFloat(swap_fee) : parseFloat(swap_free);
  const levelFee =
    selectedLevel === "level1"
      ? parseFloat(levelFees?.level1_fee)
      : parseFloat(levelFees?.level2_fee);
  const wpa = parseFloat(weeklyPayoutAmount);
  const rfa = parseFloat(refundAmount?.amount || 0);
  const mta = parseFloat(minTrade?.amount || 0);
  const totalFee =
    parseFloat(selectedAmountData.fee) +
    swapAmount +
    levelFee +
    wpa +
    rfa +
    mta;

  return (
    <div className="grid gird-cols-1 md:grid-cols-2 gap-5 items-start">
      <div
        key={package_id}
        className={classNames(
          "ring-1 ring-gray-200 shadow-custom mb-5 p-8 xl:p-10 shadow-lg lg:max-w-sm bg-gray-100 rounded-md",
          selectedSwap === "swapFee"
            ? "ring-2 ring-indigo-600"
            : "ring-1 ring-gray-200"
        )}
      >
        <div className="flex items-center justify-between gap-x-4">
          <h3
            id={package_id}
            className={classNames(
              "text-lg font-semibold leading-8",
              true ? "text-indigo-600" : "text-gray-900"
            )}
          >
            {package_name}
          </h3>
          {true && (
            <p className="rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
              {rule_name}
            </p>
          )}
        </div>

        {/* Swap Options */}
        <div className="space-y-2 mt-6 ">
          <h3 className="text-gray-800 font-semibold text-sm uppercase border-b pb-2">
            Swap Options
          </h3>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
              <input
                type="radio"
                id={`swapFee-${package_id}`}
                name={`swap-${package_id}`}
                className="form-radio h-5 w-5 text-indigo-600"
                checked={selectedSwap === "swapFee"}
                onChange={() => onSwapChange(package_id, "swapFee")}
              />
              <label
                htmlFor={`swapFee-${package_id}`}
                className="text-sm uppercase"
              >
                Swap Fee
              </label>
            </div>
            <div className="flex items-center space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
              <input
                type="radio"
                id={`swapFree-${package_id}`}
                name={`swap-${package_id}`}
                className="form-radio h-5 w-5 text-indigo-600"
                checked={selectedSwap === "swapFree"}
                onChange={() => onSwapChange(package_id, "swapFree")}
              />
              <label
                htmlFor={`swapFree-${package_id}`}
                className="text-sm uppercase"
              >
                Swap-Free
              </label>
            </div>
          </div>
        </div>

        {/* Amount and Fee */}
        <div className="space-y-2 mt-6">
          <h3 className="text-gray-800 font-semibold">Amount and Fee</h3>
          <div className="grid grid-cols-2 gap-3">
            {amountAndFee.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => onAmountChange(data.package_id, item.amount)}
                className={` px-2 text-sm py-2 rounded-lg shadow-custom ${
                  selectedAmount === item.amount
                    ? "bg-indigo-600 text-white"
                    : " bg-indigo-600/10 text-indigo-600"
                }`}
              >
                Amount: ${item.amount}
              </button>
            ))}
          </div>
        </div>

        {/* Broker and Platform */}
        <div className="space-y-2 mt-6">
          <h3 className="text-gray-800 font-semibold border-b pb-2 mb-2">
            Broker & Platform
          </h3>
          {/* {brokerPlatform?.map(item => ( */}
          <div className="text-gray-700 ">
            <p className="flex items-center mb-3 justify-between space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
              <span>Broker</span> <span>{broker_name}</span>
            </p>
            <p className="flex items-center justify-between space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
              <span>Platform</span> <span>{platform_name}</span>
            </p>
          </div>
          {/* ))} */}
        </div>

        {/* Level Fees */}
        <div className="space-y-2 mt-6">
          <h3 className="text-gray-800 font-semibold border-b pb-2">
            Level Fees
          </h3>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex items-center space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
              <input
                type="radio"
                id={`level1-${package_id}`}
                name={`levelFee-${package_id}`}
                className="form-radio h-5 w-5 text-indigo-600"
                checked={selectedLevel === "level1"}
                onChange={() => onLevelChange(package_id, "level1")}
              />
              <label
                htmlFor={`level1-${package_id}`}
                className="text-sm uppercase"
              >
                Level 1 Fee
              </label>
            </div>
            <div className="flex items-center space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
              <input
                type="radio"
                id={`level2-${package_id}`}
                name={`levelFee-${package_id}`}
                className="form-radio h-5 w-5 text-indigo-600"
                checked={selectedLevel === "level2"}
                onChange={() => onLevelChange(package_id, "level2")}
              />
              <label
                htmlFor={`level2-${package_id}`}
                className="text-sm uppercase"
              >
                Level 2 Fee
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <h3 className="text-gray-800 font-semibold border-b pb-2">Addons</h3>
          <ul className="gap-4 flex">
            {tabs.map((tab) => (
              <button
                onClick={() => setActive(tab.name)}
                className={` text-center cursor-pointer flex items-center justify-between space-4 mb-3 rounded-full shadow-custom ${
                  active === tab.name
                    ? "bg-green-600 text-white"
                    : " bg-green-600/10 "
                } px-2.5 py-1 text-xs font-semibold leading-5 text-green-600`}
              >
                {tab.name}
              </button>
            ))}
          </ul>
          {active === "weeklyPayout" && (
            <div>
              <div className="flex items-center space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-indigo-600">
                  <input
                    type="checkbox"
                    id="biWeeklyPayout"
                    checked={isBiWeeklyPayoutSelected}
                    onChange={handleCheckboxChange}
                    className="appearance-none absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {isBiWeeklyPayoutSelected && (
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                  )}
                </div>
                <label htmlFor="biWeeklyPayout" className="text-sm">
                  BI-Weekly Payout ({weeklyPayout?.mode} +{" "}
                  {weeklyPayout?.amount}$)
                </label>
              </div>
            </div>
          )}

          {active === "Refund" && (
            <div>
              {refund.map((item) => (
                <div className="flex mb-2 items-center space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-indigo-600">
                    <input
                      type="checkbox"
                      id="refund"
                      name="refund"
                      checked={isRefundSelected}
                      onChange={() => handleRefundCheckboxChange(item)}
                      className="appearance-none absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {isRefundSelected && (
                      <div className="w-3 h-3 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <label htmlFor="refund" className="text-sm">
                    {item.percent} % Refund ({item.amount})$
                  </label>
                </div>
              ))}
            </div>
          )}
          {active === "Min Trade" && (
            <div>
              {minTrading.map((item) => (
                <div className="flex mb-2 items-center space-x-4 rounded-full shadow-custom bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold text-indigo-600">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-indigo-600">
                    <input
                      type="checkbox"
                      id="minTrading"
                      name="minTrading"
                      checked={isMinTradeSelected}
                      onChange={() => handleMinTradeCheckboxChange(item)}
                      className="appearance-none absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {isMinTradeSelected && (
                      <div className="w-3 h-3 rounded-full bg-indigo-600" />
                    )}
                  </div>
                  <label htmlFor="refund" className="text-sm">
                    {item.trade_days} Trading day ({item.amount})$
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total Fee Calculation */}
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow-custom">
        <h3 className="text-gray-800 font-semibold">Total Fee Calculation</h3>
        <p className="text-cyan-700  font-semibold my-2 bg-cyan-600/10 font-sans text-sm w-full shadow-custom p-2 rounded-md flex justify-between ">
          <span>Amount:</span>
          <span>${selectedAmountData.amount}</span>
        </p>
        <p className="text-cyan-700  font-semibold my-2 bg-cyan-600/10 font-sans text-sm w-full shadow-custom p-2 rounded-md  flex justify-between">
          <span>Fee:</span>
          <span>${selectedAmountData.fee}</span>
        </p>
        <p className="text-cyan-700  font-semibold my-2 bg-cyan-600/10 font-sans text-sm w-full shadow-custom p-2 rounded-md  flex justify-between">
          <span>Swap Fee:</span>
          <span>${swapAmount.toFixed(2)}</span>
        </p>
        <p className="text-cyan-700  font-semibold my-2 bg-cyan-600/10 font-sans text-sm w-full shadow-custom p-2 rounded-md  flex justify-between">
          <span>Level Fee:</span>
          <span> ${levelFee.toFixed(2)}</span>
        </p>
        {weeklyPayoutAmount > 0 && (
          <p className="text-cyan-700  font-semibold my-2 bg-cyan-600/10 font-sans text-sm w-full shadow-custom p-2 rounded-md  flex justify-between">
            <span>Add-ons:</span>

            <span>
              {" "}
              BI-Weekly Payout ({weeklyPayout?.mode} + ${weeklyPayoutAmount})
            </span>
          </p>
        )}
        {refundAmount && refundAmount.amount > 0 && (
          <p className="text-cyan-700  font-semibold my-2 bg-cyan-600/10 font-sans text-sm w-full shadow-custom p-2 rounded-md  flex justify-between">
            <span>Add-ons:</span>
            <span>
              {" "}
              {refundAmount?.percent} % Refund (Price + ${refundAmount?.amount}){" "}
            </span>
          </p>
        )}
        {minTrade && minTrade.amount > 0 && (
          <p className="text-cyan-700  font-semibold my-2 bg-cyan-600/10 font-sans text-sm w-full shadow-custom p-2 rounded-md  flex justify-between">
            <span>Add-ons:</span>
            <span>
              {" "}
              {minTrade.trade_days} Days Min Trade (Price + ${minTrade.amount}){" "}
            </span>
          </p>
        )}

        <hr className="my-2" />
        <p className="text-gray-900 font-bold text-3xl ">
          Total Price: ${totalFee.toFixed(2)}
        </p>
        <button className="bg-green-500 mt-5 shine-effect  text-black hover:text-white px-4 py-2 rounded shadow-custom hover:bg-green-600">
          Enroll Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
