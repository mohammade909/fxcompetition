import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // To get competition ID from URL
import { getCompetitionDetails } from "../../../actions/competitions"; // Assuming this action is defined
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { HiBadgeCheck } from "react-icons/hi";

const CompetitionDetails = () => {
  const { id } = useParams(); // Get competition ID from route parameters
  const dispatch = useDispatch();
  const [active, setActive] = useState("Prize pool");

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  // Fetch competition details when component mounts
  useEffect(() => {
    if (id) {
      dispatch(getCompetitionDetails(id)); // Dispatch action to get competition details
    }
  }, [dispatch, id]);

  // Retrieve competition details from the Redux store
  const { competition } = useSelector((state) => state.competitions);
  const loading = useSelector((state) => state.competitions.loading);
  const error = useSelector((state) => state.competitions.error);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const levels = ["beginner", "intermediate", "advanced", "expert"];

  const competitionRules = [
    {
      id: 1,
      title: "Eligibility",
      description:
        "Participants must be 18 years or older and have a valid Forex trading account. The competition is open to both novice and professional traders.",
    },
    {
      id: 2,
      title: "Trading Platform",
      description:
        "All participants must use the designated trading platform (e.g., MetaTrader 4 or 5) provided by the competition organizers.",
    },
    {
      id: 3,
      title: "Leverage",
      description:
        "The maximum leverage allowed during the competition is 1:100. Participants exceeding this limit will be disqualified.",
    },
    {
      id: 4,
      title: "Minimum Account Balance",
      description:
        "A minimum starting balance of $1000 is required to participate in the competition.",
    },
    {
      id: 5,
      title: "Trading Instruments",
      description:
        "Participants are allowed to trade major currency pairs, commodities, and indices as specified by the competition organizer.",
    },
    {
      id: 6,
      title: "Trading Hours",
      description:
        "The competition will run 24/5, in alignment with global Forex market hours, starting from Monday at 00:00 (GMT) and ending on Friday at 23:59 (GMT).",
    },
    {
      id: 7,
      title: "Risk Management",
      description:
        "Participants must adhere to the risk management guidelines, with a maximum drawdown of 20% allowed on their account. Violating this rule may result in disqualification.",
    },
    {
      id: 8,
      title: "Trading Styles",
      description:
        "All trading styles are allowed, including scalping, hedging, and algorithmic trading, as long as they comply with the competition rules.",
    },
    {
      id: 9,
      title: "Prize Distribution",
      description:
        "The top three participants with the highest account balance at the end of the competition will be awarded the following prizes: 1st place: $10,000, 2nd place: $5,000, 3rd place: $2,500.",
    },
    {
      id: 10,
      title: "Withdrawals",
      description:
        "Participants are not allowed to withdraw funds from their competition accounts during the competition period. Any withdrawals will result in immediate disqualification.",
    },
    {
      id: 11,
      title: "Account Monitoring",
      description:
        "The competition organizer reserves the right to monitor all accounts for rule violations. Any suspicious activity, including but not limited to manipulation or insider trading, will result in disqualification.",
    },
    {
      id: 12,
      title: "Final Decision",
      description:
        "The competition organizer's decision is final in all matters related to rule interpretation and participant performance.",
    },
    {
      id: 13,
      title: "Multiple Accounts",
      description:
        "Participants are allowed to have only one competition account. Any participant found using multiple accounts will be disqualified.",
    },
    {
      id: 14,
      title: "Start and End Date",
      description:
        "The competition will start on September 20, 2024, at 00:00 (GMT) and will end on October 20, 2024, at 23:59 (GMT).",
    },
  ];

  return competition ? (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div
        className="relative detail-modal-bg w-full max-w-5xl p-8 shadow-lg rounded-lg no-scrollbar overflow-x-auto"
        style={{ maxHeight: "90vh" }} // Limit the height and make it scrollable vertically if needed
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full"
          onClick={() => window.history.back()}
        >
          Close
        </button>

        {/* Tab Buttons */}
        <div className="flex justify-center py-6 mb-4 m-auto p-3  ">
          <div className="bg-white p-2 rounded-full">
            {["Prize pool", "Rules"].map((item, index) => (
              <button
                onClick={() => setActive(item)}
                key={index}
                className={`${
                  active === item
                    ? "bg-[#afc4f1] text-gray-600"
                    : "text-gray-600"
                } px-4 py-2 rounded-full mx-2`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-500 to-pink-500 mb-6">
          {competition.name}
        </h1>

        {/* Conditional Content */}
        {active === "Prize pool" && (
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-x-6 items-center w-full">
            <div className=" w-full h-64 flex flex-col items-center rounded-md shadow-lg">
              <h2 className="font-mono text-xl rounded-t-md font-bold tracking-wide w-full text-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-500 p-2 mt-4 border border-gray-300">
                2nd
              </h2>
              <img
                src="/images/silver_trophy.png"
                width="150"
                alt="silver-trophy"
              />
            </div>

            <div className="w-full  h-80 flex flex-col items-center rounded-md shadow-lg">
              <h2 className="rounded-t-md font-mono text-xl font-bold tracking-wide w-full text-center bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 text-gray-500 p-2 mt-4 border border-gray-300">
                1st
              </h2>
              <img
                src="/images/gold_trophy.png"
                width="200"
                alt="gold-trophy"
              />
              <div>
                <p>
                  <HiBadgeCheck className="h-10 w-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-purple-500 to-pink-500" />
                </p>
                <p></p>
              </div>
            </div>

            <div className="w-full  h-64 flex flex-col items-center rounded-md shadow-lg">
              <h2 className="font-mono rounded-t-md text-xl font-bold tracking-wide w-full text-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 text-gray-500 p-2 mt-4 border border-gray-300">
                3rd
              </h2>
              <img
                src="/images/bronze_trophy.png"
                width="150"
                alt="bronze-trophy"
              />
            </div>
          </div>
        )}

        {active === "Rules" && (
          <div className="text-gray-600">
            <h2 className="text-xl font-bold mb-4">Competition Rules</h2>
            <ul className="list-none ml-0">
              {competitionRules.map((rule, index) => (
                <li key={index} className="mb-4">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center text-left p-3 bg-blue-100 rounded-lg focus:outline-none"
                  >
                    <span className="font-semibold">{rule.title}</span>
                    <span>{openAccordionIndex === index ? "-" : "+"}</span>
                  </button>
                  {/* Accordion Body */}
                  {openAccordionIndex === index && (
                    <div className="mt-2 p-3 bg-white rounded-lg shadow-md border border-gray-200">
                      <p>{rule.description}</p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>No competition data available</div>
  );
};

export default CompetitionDetails;
