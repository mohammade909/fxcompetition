import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "../../../actions/plan";
import { Fragment } from "react";
import { getUserOrdersById } from "../../../actions/order";
import {
  CheckIcon,
  ChevronDownIcon,
  MinusIcon,
} from "@heroicons/react/20/solid";
import OrderSummary from "../components/OrderSummary";

const tiers = [
  {
    name: "Basic",
    href: "#",
    priceMonthly: 9,
    description: "Quis suspendisse ut fermentum neque vivamus non tellus.",
  },
  {
    name: "Essential",
    href: "#",
    priceMonthly: 29,
    description: "Quis eleifend a tincidunt pellentesque. A tempor in sed.",
  },
  {
    name: "Premium",
    href: "#",
    priceMonthly: 59,
    description:
      "Orci volutpat ut sed sed neque, dui eget. Quis tristique non.",
  },
];
const sections = [
  {
    name: "Features",
    features: [
      {
        name: "Molestie lobortis massa.",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "Urna purus felis.",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "Tellus pulvinar sit dictum.",
        tiers: { Essential: true, Premium: true },
      },
      {
        name: "Convallis.",
        tiers: { Essential: "Up to 20 users", Premium: "Up to 50 users" },
      },
    ],
  },
  {
    name: "Reporting",
    features: [
      {
        name: "Adipiscing.",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      {
        name: "Eget risus integer.",
        tiers: { Essential: true, Premium: true },
      },
      { name: "Gravida leo urna velit.", tiers: { Premium: true } },
      {
        name: "Elementum ut dapibus mi feugiat cras nisl.",
        tiers: { Premium: true },
      },
    ],
  },
  {
    name: "Support",
    features: [
      {
        name: "Sit dignissim.",
        tiers: { Basic: true, Essential: true, Premium: true },
      },
      { name: "Congue at nibh et.", tiers: { Essential: true, Premium: true } },
      {
        name: "Volutpat feugiat mattis.",
        tiers: { Essential: true, Premium: true },
      },
      {
        name: "Tristique pellentesque ornare diam sapien.",
        tiers: { Premium: true },
      },
    ],
  },
];

const footerNavigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Pricing", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
    { name: "API Status", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ],
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "X",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Dribbble",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Pricing() {
  const dispatch = useDispatch();
  const { plans, loading, error } = useSelector((state) => state.plans);
  const { orders } = useSelector((state) => state.orders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState();
  const handlePlan = (plan) => {
    const startDate = new Date(); // Current date
    const endDate = new Date(); // Another date instance for end_date
    endDate.setFullYear(startDate.getFullYear() + 1); // Add 1 year to the current date

    const tax = 10; // Fixed tax value
    const totalAmount = Number(tax) + Number(plan.price); // Calculate total amount

    setOrderDetails({
      ...plan,
      tax: tax,
      total_amount: totalAmount, // Set the total amount
      start_date: startDate,
      end_date: endDate, // Set the end date to one year later
    });
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (auth.user_id) {
      dispatch(getUserOrdersById(auth.user_id));
    }
  }, [dispatch, auth.user_id]);

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading plans...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">Failed to load plans: {error}</p>
    );
  }
  return (
    <div className=" bg-opacity-5 backdrop-blur-md  p-6">
      <div
        className="flex p-5 justify-center items-center mb-8 bg-cover bg-center relative h-48 rounded-lg"
        style={{ backgroundImage: "url('/pricing_banner.jpg')" }}
      >
        <h1 className="text-5xl font-bold text-white z-10 backdrop-blur-lg bg-white bg-opacity-30 p-6 rounded-md relative ">
          Pricing
        </h1>

        {/* Optional: Add overlay for additional effect */}
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Comparison table */}
      <div className="mx-auto max-w-2xl  bg-[#DDE5FB] py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* xs to lg */}
        <div className="space-y-24 lg:hidden">
          {plans.map((tier) => (
            <section key={tier.name}>
              <div className="mb-8 px-6 sm:px-4">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  {tier.name}
                </h2>
                <p className="mt-4">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    ${tier.price}
                  </span>
                  <span className="text-base font-medium text-gray-500">
                    /mo
                  </span>
                </p>
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
                {orders.length > 0 ? (
                  <div>
                    {orders[orders.length - 1].plan_id === tier.plan_id ? (
                      <button
                        disabled
                        type="button"
                        className="mt-6 block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                      >
                        Current Plan
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePlan(tier)}
                        type="button"
                        className="mt-6 block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                      >
                        Want to upgrade Plan?
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => handlePlan(tier)}
                    type="button"
                    className="mt-6 block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                  >
                    Buy {tier.plan_name}
                  </button>
                )}
              </div>

              {sections.map((section) => (
                <table key={section.name} className="w-full">
                  <caption className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-left text-sm font-medium text-gray-900 sm:px-4">
                    {section.name}
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col" className="sr-only">
                        Feature
                      </th>
                      <th scope="col" className="sr-only">
                        Included
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {section.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-t border-gray-200"
                      >
                        <th
                          scope="row"
                          className="px-6 py-5 text-left text-sm font-normal text-gray-500 sm:px-4"
                        >
                          {feature.name}
                        </th>
                        <td className="py-5 pr-6 sm:pr-4">
                          {typeof feature.tiers[tier.name] === "string" ? (
                            <span className="block text-right text-sm text-gray-700">
                              {feature.tiers[tier.name]}
                            </span>
                          ) : (
                            <>
                              {feature.tiers[tier.name] === true ? (
                                <CheckIcon
                                  aria-hidden="true"
                                  className="ml-auto h-5 w-5 text-green-500"
                                />
                              ) : (
                                <MinusIcon
                                  aria-hidden="true"
                                  className="ml-auto h-5 w-5 text-gray-400"
                                />
                              )}
                              <span className="sr-only">
                                {feature.tiers[tier.name] === true
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}

              <div className="border-t border-gray-200 px-6 pt-5 sm:px-4">
                <a
                  href="#"
                  className="block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                >
                  Buy {tier.name}
                </a>
              </div>
            </section>
          ))}
        </div>

        {/* lg+ */}
        <div className="hidden lg:block">
          <table className="h-px w-full table-fixed">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="pb-4 pl-6 pr-6 text-left text-sm font-medium text-gray-900"
                >
                  <span className="sr-only">Feature by</span>
                  <span>Plans</span>
                </th>
                {tiers.map((tier) => (
                  <th
                    key={tier.name}
                    scope="col"
                    className="w-1/4 px-6 pb-4 text-left text-lg font-medium leading-6 text-gray-900"
                  >
                    {tier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 border-t border-gray-200">
              <tr>
                <th
                  scope="row"
                  className="py-8 pl-6 pr-6 text-left align-top text-sm font-medium text-gray-900"
                >
                  Pricing
                </th>
                {plans.map((tier) => (
                  <td key={tier.name} className="h-full px-6 py-8 align-top">
                    <div className="flex h-full flex-col justify-between">
                      <div>
                        <p>
                          <span className="text-4xl font-bold tracking-tight text-gray-900">
                            ${tier.price}
                          </span>
                          <span className="text-base font-medium text-gray-500">
                            /mo
                          </span>
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                          {tier.description}
                        </p>
                      </div>
                      {orders.length > 0 ? (
                        <div>
                          {orders[orders.length - 1].plan_id ===
                          tier.plan_id ? (
                            <button
                              disabled
                              type="button"
                              className="mt-6 block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                            >
                              Current Plan
                            </button>
                          ) : (
                            <button
                              onClick={() => handlePlan(tier)}
                              type="button"
                              className="mt-6 block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                            >
                              want to upgrade Plan?
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => handlePlan(tier)}
                          type="button"
                          className="mt-6 block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                        >
                          Buy {tier.plan_name}
                        </button>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
              {sections.map((section) => (
                <Fragment key={section.name}>
                  <tr>
                    <th
                      scope="colgroup"
                      colSpan={4}
                      className="bg-gray-50 py-3 pl-6 text-left text-sm font-medium text-gray-900"
                    >
                      {section.name}
                    </th>
                  </tr>
                  {section.features.map((feature) => (
                    <tr key={feature.name}>
                      <th
                        scope="row"
                        className="py-5 pl-6 pr-6 text-left text-sm font-normal text-gray-500"
                      >
                        {feature.name}
                      </th>
                      {tiers.map((tier) => (
                        <td key={tier.name} className="px-6 py-5">
                          {typeof feature.tiers[tier.name] === "string" ? (
                            <span className="block text-sm text-gray-700">
                              {feature.tiers[tier.name]}
                            </span>
                          ) : (
                            <>
                              {feature.tiers[tier.name] === true ? (
                                <CheckIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-green-500"
                                />
                              ) : (
                                <MinusIcon
                                  aria-hidden="true"
                                  className="h-5 w-5 text-gray-400"
                                />
                              )}

                              <span className="sr-only">
                                {feature.tiers[tier.name] === true
                                  ? "Included"
                                  : "Not included"}{" "}
                                in {tier.name}
                              </span>
                            </>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200">
                <th scope="row" className="sr-only">
                  Choose your plan
                </th>
                {tiers.map((tier) => (
                  <td key={tier.plan_name} className="px-6 pt-5">
                    <a
                      href="#"
                      className="block w-full rounded-md border border-transparent bg-gradient-to-r from-orange-500 to-pink-500 py-2 text-center text-sm font-semibold text-white shadow hover:to-pink-600"
                    >
                      Buy {tier.plan_name}
                    </a>
                  </td>
                ))}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <OrderSummary
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orderDetails={orderDetails}
      />

      {/* Logo cloud */}
      <div className="mx-auto max-w-7xl border-t border-gray-200 px-6 py-12 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              alt="Tuple"
              src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
              className="h-12"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              alt="Mirage"
              src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg"
              className="h-12"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
            <img
              alt="StaticKit"
              src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
              className="h-12"
            />
          </div>
          <div className="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
            <img
              alt="Transistor"
              src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg"
              className="h-12"
            />
          </div>
          <div className="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
            <img
              alt="Workcation"
              src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
              className="h-12"
            />
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mx-auto mt-12 max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        <h2 className="sr-only">Footer</h2>
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-base font-medium text-gray-900">
                  Solutions
                </h4>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="text-base font-medium text-gray-900">Support</h4>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.support.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-base font-medium text-gray-900">Company</h4>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.company.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="text-base font-medium text-gray-900">Legal</h4>
                <ul role="list" className="mt-4 space-y-4">
                  {footerNavigation.legal.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-500 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 xl:mt-0">
            <h4 className="text-base font-medium text-gray-900">
              Subscribe to our newsletter
            </h4>
            <p className="mt-4 text-base text-gray-500">
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <form className="mt-4 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full min-w-0 rounded-md border-gray-300 bg-white px-4 py-2 placeholder-gray-500 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
              />
              <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-orange-100 px-4 py-2 text-base font-medium text-red-600 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            {footerNavigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
