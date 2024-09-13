import React, { useState, useEffect } from "react";
import { fetchAllCompetitions } from "../../../actions/competitions";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { getUserOrdersById } from "../../../actions/order";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CalendarDateRangeIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  PercentBadgeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  createEnrollment,
  getEnrollmentsByUserId,
} from "../../../actions/enrollment";
const CompetitionList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const { orders, loading, error } = useSelector((state) => state.orders);
  const { competitions } = useSelector((state) => state.competitions);

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllCompetitions());
  }, [dispatch]);

  useEffect(() => {
    if (auth.user_id) {
      dispatch(getUserOrdersById(auth.user_id));
    }
  }, [dispatch, auth.user_id]);

  const { enrollments } = useSelector((state) => state.enrollments);

  useEffect(() => {
    if (auth.user_id) {
      dispatch(getEnrollmentsByUserId(auth.user_id));
    }
  }, [dispatch, auth.user_id, openSuccess]);

  const sortedCompetitions = competitions
    .slice()
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const filteredCompetitions = sortedCompetitions.filter((competition) =>
    filterStatus === "all" ? true : competition.status === filterStatus
  );

  const getSvgColor = (status) => {
    switch (status) {
      case "active":
        return (
          <svg
            width="42"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.343 20.03l-1.413-.354C5.991 18.44 2.46 13.94 2.46 8.85V7.383h6.728a1.23 1.23 0 100-2.461H1.23c-.68 0-1.23.55-1.23 1.23V8.85c0 6.222 4.297 11.703 10.334 13.212l1.413.354a1.228 1.228 0 001.492-.896 1.229 1.229 0 00-.896-1.49z"
              fill="#FEA832"
            ></path>
            <path
              d="M40.768 4.922H32.81a1.23 1.23 0 100 2.46h6.727V9.4c0 4.877-3.21 9.208-7.865 10.656l-2.748.855a1.23 1.23 0 00.73 2.35l2.749-.855c5.69-1.771 9.595-7.047 9.595-13.006V6.152c0-.68-.55-1.23-1.23-1.23z"
              fill="#FE9923"
            ></path>
            <path
              d="M24.691 24.691h-7.383v12.387h7.383V24.691z"
              fill="#FEA832"
            ></path>
            <path
              d="M24.691 24.691H21v12.387h3.691V24.691z"
              fill="#FE9923"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H13.617c-.69 0-1.23-.541-1.23-1.23v-4.922a3.686 3.686 0 013.69-3.692h9.845a3.686 3.686 0 013.691 3.692z"
              fill="#FEDB41"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H21v-9.844h4.922a3.686 3.686 0 013.691 3.692z"
              fill="#FC3"
            ></path>
            <path
              d="M34.537 1.354L33.06 16.25c-.64 6.227-5.808 10.902-12.059 10.902-6.25 0-11.418-4.675-12.058-10.902L7.466 1.354C7.417.664 7.91.074 8.574 0h24.855a1.259 1.259 0 011.108 1.354z"
              fill="#FEDB41"
            ></path>
            <path
              d="M34.535 1.354L33.058 16.25C32.418 22.477 27.25 27.152 21 27.152V0h12.428a1.259 1.259 0 011.107 1.354z"
              fill="#FC3"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H6.233c-.689 0-1.23-.54-1.23-1.23 0-.689.541-1.23 1.23-1.23h29.531c.69 0 1.23.541 1.23 1.23z"
              fill="#FEA832"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H21V0h14.765c.69 0 1.23.541 1.23 1.23z"
              fill="#FE9923"
            ></path>
            <path
              d="M27.546 9.793l-3.765-.566-1.673-3.396c-.222-.418-.665-.64-1.108-.64-.443 0-.886.222-1.107.64l-1.674 3.396-3.765.566c-1.009.123-1.427 1.378-.689 2.092l2.732 2.658-.64 3.823c-.172 1.009.886 1.771 1.772 1.304L21 17.898l3.372 1.772c.886.467 1.944-.296 1.772-1.304l-.64-3.823 2.731-2.658c.739-.714.32-1.969-.689-2.092z"
              fill="#FEA832"
            ></path>
            <path
              d="M28.235 11.885l-2.732 2.658.64 3.823c.172 1.009-.886 1.771-1.772 1.304L21 17.898V5.191c.443 0 .886.222 1.107.64l1.674 3.396 3.765.566c1.01.123 1.427 1.378.69 2.092z"
              fill="#FE9923"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H11.155c-.69 0-1.23-.541-1.23-1.23 0-.69.54-1.23 1.23-1.23h19.688c.689 0 1.23.54 1.23 1.23z"
              fill="#FEA832"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H21v-2.46h9.843c.69 0 1.231.54 1.231 1.23z"
              fill="#FE9923"
            ></path>
          </svg>
        ); // Yellow for active competitions
      case "scheduled":
        return (
          <svg
            width="42"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.343 20.03l-1.413-.354C5.991 18.44 2.46 13.94 2.46 8.85V7.383h6.728a1.23 1.23 0 100-2.461H1.23c-.68 0-1.23.55-1.23 1.23V8.85c0 6.222 4.297 11.703 10.334 13.212l1.413.354a1.228 1.228 0 001.492-.896 1.229 1.229 0 00-.896-1.49zM40.768 4.922H32.81a1.23 1.23 0 100 2.46h6.727V9.4c0 4.877-3.21 9.208-7.865 10.656l-2.748.855a1.23 1.23 0 00.73 2.35l2.749-.855c5.69-1.771 9.595-7.047 9.595-13.006V6.152c0-.68-.55-1.23-1.23-1.23zM24.691 24.691h-7.383v12.387h7.383V24.691z"
              fill="#546AE1"
            ></path>
            <path
              d="M24.691 24.691H21v12.387h3.691V24.691z"
              fill="#546AE1"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H13.617c-.69 0-1.23-.541-1.23-1.23v-4.922a3.686 3.686 0 013.69-3.692h9.845a3.686 3.686 0 013.691 3.692z"
              fill="#546AE1"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H21v-9.844h4.922a3.686 3.686 0 013.691 3.692zM34.537 1.354L33.06 16.25c-.64 6.227-5.808 10.902-12.059 10.902-6.25 0-11.418-4.675-12.058-10.902L7.466 1.354C7.417.664 7.91.074 8.574 0h24.855a1.259 1.259 0 011.108 1.354z"
              fill="#546AE1"
            ></path>
            <path
              d="M34.535 1.354L33.058 16.25C32.418 22.477 27.25 27.152 21 27.152V0h12.428a1.259 1.259 0 011.107 1.354z"
              fill="#546AE1"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H6.233c-.689 0-1.23-.54-1.23-1.23 0-.689.541-1.23 1.23-1.23h29.531c.69 0 1.23.541 1.23 1.23z"
              fill="#546AE1"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H21V0h14.765c.69 0 1.23.541 1.23 1.23z"
              fill="#546AE1"
            ></path>
            <path
              d="M27.546 9.794l-3.765-.566-1.673-3.396c-.222-.418-.665-.64-1.108-.64-.443 0-.886.222-1.107.64l-1.674 3.396-3.765.566c-1.009.123-1.427 1.378-.689 2.092l2.732 2.658-.64 3.823c-.172 1.008.886 1.771 1.772 1.304L21 17.899l3.372 1.772c.886.467 1.944-.296 1.772-1.304l-.64-3.823 2.731-2.658c.739-.714.32-1.969-.689-2.092z"
              fill="#fff"
            ></path>
            <path
              d="M28.235 11.886l-2.732 2.658.64 3.823c.172 1.009-.886 1.771-1.772 1.304L21 17.899V5.192c.443 0 .886.222 1.107.64l1.674 3.396 3.765.566c1.009.123 1.427 1.378.689 2.092z"
              fill="#fff"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H11.155c-.69 0-1.23-.541-1.23-1.23 0-.69.54-1.23 1.23-1.23h19.688c.689 0 1.23.54 1.23 1.23z"
              fill="#546AE1"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H21v-2.46h9.843c.69 0 1.231.54 1.231 1.23z"
              fill="#546AE1"
            ></path>
          </svg>
        ); // Blue for scheduled competitions
      case "inactive":
        return (
          <svg
            width="42"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.343 20.03l-1.413-.354C5.991 18.44 2.46 13.94 2.46 8.85V7.383h6.728a1.23 1.23 0 100-2.461H1.23c-.68 0-1.23.55-1.23 1.23V8.85c0 6.222 4.297 11.703 10.334 13.212l1.413.354a1.228 1.228 0 001.492-.896 1.229 1.229 0 00-.896-1.49zM40.768 4.922H32.81a1.23 1.23 0 100 2.46h6.727V9.4c0 4.877-3.21 9.208-7.865 10.656l-2.748.855a1.23 1.23 0 00.73 2.35l2.749-.855c5.69-1.771 9.595-7.047 9.595-13.006V6.152c0-.68-.55-1.23-1.23-1.23zM24.691 24.691h-7.383v12.387h7.383V24.691z"
              fill="#B5B5B5"
            ></path>
            <path
              d="M24.691 24.691H21v12.387h3.691V24.691z"
              fill="#B5B5B6"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H13.617c-.69 0-1.23-.541-1.23-1.23v-4.922a3.686 3.686 0 013.69-3.692h9.845a3.686 3.686 0 013.691 3.692z"
              fill="#B5B5B5"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H21v-9.844h4.922a3.686 3.686 0 013.691 3.692zM34.537 1.354L33.06 16.25c-.64 6.227-5.808 10.902-12.059 10.902-6.25 0-11.418-4.675-12.058-10.902L7.466 1.354C7.417.664 7.91.074 8.574 0h24.855a1.259 1.259 0 011.108 1.354z"
              fill="#B5B5B5"
            ></path>
            <path
              d="M34.535 1.354L33.058 16.25C32.418 22.477 27.25 27.152 21 27.152V0h12.428a1.259 1.259 0 011.107 1.354z"
              fill="#B5B5B5"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H6.233c-.689 0-1.23-.54-1.23-1.23 0-.689.541-1.23 1.23-1.23h29.531c.69 0 1.23.541 1.23 1.23z"
              fill="#B5B5B5"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H21V0h14.765c.69 0 1.23.541 1.23 1.23z"
              fill="#B5B5B5"
            ></path>
            <path
              d="M27.546 9.794l-3.765-.566-1.673-3.396c-.222-.418-.665-.64-1.108-.64-.443 0-.886.222-1.107.64l-1.674 3.396-3.765.566c-1.009.123-1.427 1.378-.689 2.092l2.732 2.658-.64 3.823c-.172 1.008.886 1.771 1.772 1.304L21 17.899l3.372 1.772c.886.467 1.944-.296 1.772-1.304l-.64-3.823 2.731-2.658c.739-.714.32-1.969-.689-2.092z"
              fill="#fff"
            ></path>
            <path
              d="M28.235 11.886l-2.732 2.658.64 3.823c.172 1.009-.886 1.771-1.772 1.304L21 17.899V5.192c.443 0 .886.222 1.107.64l1.674 3.396 3.765.566c1.009.123 1.427 1.378.689 2.092z"
              fill="#fff"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H11.155c-.69 0-1.23-.541-1.23-1.23 0-.69.54-1.23 1.23-1.23h19.688c.689 0 1.23.54 1.23 1.23z"
              fill="#B5B5B5"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H21v-2.46h9.843c.69 0 1.231.54 1.231 1.23z"
              fill="#B5B5B5"
            ></path>
          </svg>
        ); // Gray for inactive competitions
      default:
        return (
          <svg
            width="42"
            height="42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.343 20.03l-1.413-.354C5.991 18.44 2.46 13.94 2.46 8.85V7.383h6.728a1.23 1.23 0 100-2.461H1.23c-.68 0-1.23.55-1.23 1.23V8.85c0 6.222 4.297 11.703 10.334 13.212l1.413.354a1.228 1.228 0 001.492-.896 1.229 1.229 0 00-.896-1.49z"
              fill="#FEA832"
            ></path>
            <path
              d="M40.768 4.922H32.81a1.23 1.23 0 100 2.46h6.727V9.4c0 4.877-3.21 9.208-7.865 10.656l-2.748.855a1.23 1.23 0 00.73 2.35l2.749-.855c5.69-1.771 9.595-7.047 9.595-13.006V6.152c0-.68-.55-1.23-1.23-1.23z"
              fill="#FE9923"
            ></path>
            <path
              d="M24.691 24.691h-7.383v12.387h7.383V24.691z"
              fill="#FEA832"
            ></path>
            <path
              d="M24.691 24.691H21v12.387h3.691V24.691z"
              fill="#FE9923"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H13.617c-.69 0-1.23-.541-1.23-1.23v-4.922a3.686 3.686 0 013.69-3.692h9.845a3.686 3.686 0 013.691 3.692z"
              fill="#FEDB41"
            ></path>
            <path
              d="M29.613 35.848v4.922c0 .688-.541 1.23-1.23 1.23H21v-9.844h4.922a3.686 3.686 0 013.691 3.692z"
              fill="#FC3"
            ></path>
            <path
              d="M34.537 1.354L33.06 16.25c-.64 6.227-5.808 10.902-12.059 10.902-6.25 0-11.418-4.675-12.058-10.902L7.466 1.354C7.417.664 7.91.074 8.574 0h24.855a1.259 1.259 0 011.108 1.354z"
              fill="#FEDB41"
            ></path>
            <path
              d="M34.535 1.354L33.058 16.25C32.418 22.477 27.25 27.152 21 27.152V0h12.428a1.259 1.259 0 011.107 1.354z"
              fill="#FC3"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H6.233c-.689 0-1.23-.54-1.23-1.23 0-.689.541-1.23 1.23-1.23h29.531c.69 0 1.23.541 1.23 1.23z"
              fill="#FEA832"
            ></path>
            <path
              d="M36.996 1.23c0 .69-.541 1.23-1.23 1.23H21V0h14.765c.69 0 1.23.541 1.23 1.23z"
              fill="#FE9923"
            ></path>
            <path
              d="M27.546 9.793l-3.765-.566-1.673-3.396c-.222-.418-.665-.64-1.108-.64-.443 0-.886.222-1.107.64l-1.674 3.396-3.765.566c-1.009.123-1.427 1.378-.689 2.092l2.732 2.658-.64 3.823c-.172 1.009.886 1.771 1.772 1.304L21 17.898l3.372 1.772c.886.467 1.944-.296 1.772-1.304l-.64-3.823 2.731-2.658c.739-.714.32-1.969-.689-2.092z"
              fill="#FEA832"
            ></path>
            <path
              d="M28.235 11.885l-2.732 2.658.64 3.823c.172 1.009-.886 1.771-1.772 1.304L21 17.898V5.191c.443 0 .886.222 1.107.64l1.674 3.396 3.765.566c1.01.123 1.427 1.378.69 2.092z"
              fill="#FE9923"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H11.155c-.69 0-1.23-.541-1.23-1.23 0-.69.54-1.23 1.23-1.23h19.688c.689 0 1.23.54 1.23 1.23z"
              fill="#FEA832"
            ></path>
            <path
              d="M32.074 40.77c0 .688-.541 1.23-1.23 1.23H21v-2.46h9.843c.69 0 1.231.54 1.231 1.23z"
              fill="#FE9923"
            ></path>
          </svg>
        );
    }
  };

  // Countdown Timer
  const calculateTimeLeft = (startDate) => {
    const difference = new Date(startDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const Timer = ({ startDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(startDate));

    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(startDate));
      }, 1000);

      return () => clearInterval(timer);
    }, [startDate]);

    return (
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 mt-4 border border-gray-300 rounded-lg shadow-lg flex justify-between items-center">
        <span className="font-mono text-lg tracking-wide">
          {timeLeft.days ||
          timeLeft.hours ||
          timeLeft.minutes ||
          timeLeft.seconds
            ? `${timeLeft.days} Day${timeLeft.days !== 1 ? "s" : ""}, ${
                timeLeft.hours
              }H ${timeLeft.minutes}M ${timeLeft.seconds}S`
            : "Competition has started!"}
        </span>
      </div>
    );
  };

  const levels = ["beginner", "intermediate", "advanced", "expert"];

  const handleEnrollment = (competition) => {
    const orderLevel = levels.indexOf(orders[orders.length - 1].level);
    const requiredLevel = Number(competition.level_required);

    // Check if the order level is less than the competition level
    if (orderLevel < requiredLevel) {
      alert("Please upgrade the plan.");
    } else {
      setOpen(true);
    }
  };
  const dispacthActions = (competition) => {
    dispatch(
      createEnrollment({
        user_id: auth.user_id,
        competition_id: competition.competition_id,
      })
    );
    setOpen(false);
    setOpenSuccess(true);
  };

  const getLengthOfContestants = (enrolled_users) => {
    const filteredEnrolledUsers =
      enrolled_users?.filter((user) => user !== null) || [];
    return filteredEnrolledUsers.length;
  };
  return (
    <div className="bg-opacity-10 min-h-screen p-6">
      <div
        className="flex p-5 justify-center items-center mb-8 bg-cover bg-center relative h-48 rounded-lg"
        style={{ backgroundImage: "url('/banner_competition.jpg')" }}
      >
        <h1 className="text-5xl font-bold text-white z-10 backdrop-blur-lg bg-white bg-opacity-30 p-6 rounded-md relative ">
          Competitions
        </h1>

        {/* Optional: Add overlay for additional effect */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      <div className="container mx-auto">
        {/* Filter dropdown */}
        <div className="mb-6 flex ">
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#DDE5FB] md:w-[80%] w-full  mx-auto py-1 px-3 justify-between rounded-full">
            {[
              { name: "Competition List", value: "all" },
              { name: "In Progress", value: "active" },
              { name: "Finished", value: "inactive" },
              { name: "Upcoming", value: "scheduled" },
            ].map((status) => (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`
          px-4 py-2  font-semibold font-mono
          ${
            filterStatus === status.value
              ? "bg-[#D3BDF0] text-gray-700 rounded-full"
              : "text-gray-700 hover:bg-blue-200 rounded-full"
          }
        `}
              >
                {status.name}
              </button>
            ))}
          </div>
        </div>

        {/* Competitions list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompetitions.map((competition) => (
            <div
              key={competition.competition_id}
              className="card-bg p-6 shadow-lg opacity-100 rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="w-10 h-10">
                  {getSvgColor(competition.status)}
                </div>

                <h2 className="text-lg font-bold text-gray-800">
                  {competition.name}
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {competition.description}
              </p>
              <p className="text-sm justify-start items-center gap-5 flex text-gray-600 mb-2">
                <CalendarDateRangeIcon className="h-10 w-10 text-2xl" />
                <div>
                  <strong>Start Date: </strong>
                  {format(new Date(competition.start_date), "PPP")}
                  <br />
                  <strong>End Date: </strong>
                  {format(new Date(competition.end_date), "PPP")}
                </div>
              </p>

              <p className="text-sm justify-start items-center gap-5 flex text-gray-600 mb-2">
                <UsersIcon className="h-10 w-10 text-2xl" />
                <div>
                  <strong>Contestains: </strong>
                  <strong>
                    {getLengthOfContestants(competition?.enrolled_users)}
                  </strong>
                  <br />
                </div>
              </p>

              <p className="text-sm justify-start items-center gap-5 flex text-gray-600 mb-2">
                <CheckBadgeIcon className="h-10 w-10 text-2xl" />
                <div>
                  <strong>Required Level: </strong>
                  {levels[Number(competition.level_required) - 1]}
                </div>
              </p>

              <div className="mt-4">
                {competition.status === "scheduled" ? (
                  <div>
                    <div className="flex justify-between px-1">
                      <Link
                        to={`/user/dashboard/competition/${competition.competition_id}`}
                        className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Details
                      </Link>
                      <button
                        className={`${
                          enrollments.some(
                            (enrollment) =>
                              enrollment.competition_id ===
                              competition.competition_id
                          )
                            ? "bg-gray-500 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }  text-white px-4 py-2 rounded-lg`}
                        disabled={enrollments.some(
                          (enrollment) =>
                            enrollment.competition_id ===
                            competition.competition_id
                        )}
                        onClick={() => {
                          handleEnrollment(competition);
                        }}
                      >
                        {enrollments.some(
                          (enrollment) =>
                            enrollment.competition_id ===
                            competition.competition_id
                        )
                          ? "Already Enrolled"
                          : "Enroll Now"}
                      </button>
                    </div>

                    <Timer startDate={competition.start_date} />
                  </div>
                ) : competition.status === "active" ? (
                  <>
                    <Link
                      to={`/user/dashboard/competition/${competition.competition_id}`}
                      className="mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Details
                    </Link>
                    <button
                      disabled
                      className="bg-gray-300 cursor-not-allowed  text-white px-4 py-2 rounded-lg "
                    >
                      Enroll
                    </button>
                  </>
                ) : (
                  <>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg">
                      Winners
                    </button>
                    <div className="bg-gray-300 text-gray-600 p-4 mt-4 border border-gray-400 rounded-lg shadow-lg flex justify-between items-center">
                      <span className="font-mono text-xs">
                        Finished {format(new Date(competition.end_date), "PPP")}
                      </span>
                    </div>
                  </>
                )}
              </div>
              <Dialog open={open} onClose={setOpen} className="relative z-10">
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                      transition
                      className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                            <ExclamationTriangleIcon
                              aria-hidden="true"
                              className="h-6 w-6 text-blue-600"
                            />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <DialogTitle
                              as="h3"
                              className="text-base font-semibold leading-6 text-gray-900"
                            >
                              Are you sure you want to Enroll?
                            </DialogTitle>
                            <div className="mt-2">"</div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          onClick={() => dispacthActions(competition)}
                          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            </div>
          ))}
        </div>
        <Dialog
          open={openSuccess}
          onClose={setOpenSuccess}
          className="relative z-10"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-green-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Successfully Enrolled
                      </DialogTitle>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpenSuccess(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Okay
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default CompetitionList;
