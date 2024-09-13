import { useSelector, useDispatch } from "react-redux";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
  UserIcon,
  WalletIcon,
  BellSlashIcon,
  BellAlertIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link, Outlet } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";

const navigation = [
  { name: "Home", href: "/user/dashboard", icon: HomeIcon, current: true },
  {
    name: "Profile",
    href: "/user/dashboard/profile",
    icon: UserIcon,
    current: false,
  },
  {
    name: "Pricing",
    href: "/user/dashboard/pricing",
    icon: FaMoneyBill,
    current: false,
  },
  {
    name: "Wallet",
    href: "/user/dashboard/wallet",
    icon: WalletIcon,
    current: false,
  },
  {
    name: "My Plans",
    href: "/user/dashboard/plans",
    icon: CurrencyDollarIcon,
    current: false,
  },
  {
    name: "My Competitions",
    href: "/user/dashboard/enrolled",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Accounts",
    href: "/user/dashboard/accounts",
    icon: UserGroupIcon,
    current: false,
  },
  {
    name: "Notifications",
    href: "/user/dashboard/notifications",
    icon: BellAlertIcon,
    current: false,
  },
  { name: "Reports", href: "#", icon: DocumentChartBarIcon, current: false },
];
const secondaryNavigation = [];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { auth } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div className="min-h-full">
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 shadow-c bg-gray-600 bg-opacity-75 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative flex w-full max-w-xs flex-1 transform flex-col bg-[#82A6F3] pb-4 pt-5 transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute right-0 top-0 -mr-12 pt-2 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="relative ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex flex-shrink-0 items-center px-4">
                <img
                  alt="Easywire logo"
                  src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=300"
                  className="h-8 w-auto"
                />
              </div>
              <nav
                aria-label="Sidebar"
                className="mt-5 h-full flex-shrink-0 divide-y divide-gray-800 overflow-y-auto no-scrollbar"
              >
                <div className="space-y-1 pl-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      onClick={() => setActiveTab(item.name)}
                      className={classNames(
                        activeTab === item.name
                          ? "bg-[#DDE5FB] text-gray-700"
                          : "text-gray-100 hover:bg-gray-600 hover:text-white",
                        "group flex items-center rounded-md px-2 py-2 text-base font-medium"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className="mr-4 h-6 w-6 flex-shrink-0 text-gray-200"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="space-y-1 pl-6">
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-100 hover:bg-gray-600 hover:text-white"
                      >
                        <item.icon
                          aria-hidden="true"
                          className="mr-4 h-6 w-6 text-gray-200"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </DialogPanel>
            <div aria-hidden="true" className="w-14 flex-shrink-0">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto no-scrollbar bg-[#82A6F3]  pb-4 pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                alt="Easywire logo"
                src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=300"
                className="h-8 w-auto"
              />
            </div>
            <nav
              aria-label="Sidebar"
              className="mt-5 flex flex-1 flex-col divide-y divide-gray-800 overflow-y-auto no-scrollbar"
            >
              <div className="space-y-1 pl-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => setActiveTab(item.name)}
                    className={classNames(
                      activeTab === item.name
                        ? "bg-[#DDE5FB] text-gray-700 shadow-lg "
                        : "hover:bg-[#DDE5FB]",
                      "group flex items-center rounded-l-full px-2 py-3 text-sm font-medium leading-6 transition-colors duration-300 ease-in-out"
                    )}
                  >
                    <item.icon
                      aria-hidden="true"
                      className="mr-4 h-6 w-6 flex-shrink-0 text-gray-700"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="space-y-1 pl-6">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-gray-100 hover:bg-gray-600 hover:text-white"
                    >
                      <item.icon
                        aria-hidden="true"
                        className="mr-4 h-6 w-6 text-gray-200"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-1 flex-col lg:pl-64">
          <div className="flex flex-shrink-0 bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-20 rounded-lg lg:border-none p-5">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-between shadow-md rounded-md border-b px-4 sm:px-6 lg:mx-auto lg:max-w-6xl bg-white lg:px-8">
              <div className="flex flex-1">
                <form action="#" method="GET" className="flex w-full md:ml-0">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
                    >
                      <MagnifyingGlassIcon
                        aria-hidden="true"
                        className="h-5 w-5"
                      />
                    </div>
                    <input
                      id="search-field"
                      name="search-field"
                      type="search"
                      placeholder="Search transactions"
                      className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <span className="absolute -inset-1.5 lg:hidden" />
                      <img
                        alt=""
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="h-8 w-8 rounded-full"
                      />
                      <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>
                        {auth.username}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                      />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <Link
                        to="/dashboard/user/profile"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Your Profile
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Settings
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8 ">
            {/* Page header */}

            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
