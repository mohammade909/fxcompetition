import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  CogIcon,
  ArchiveBoxIcon,
  AdjustmentsVerticalIcon,
  PaperClipIcon,
  DocumentChartBarIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PowerIcon,
} from "@heroicons/react/20/solid";
import { Outlet } from "react-router-dom";
const navigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: true,
  },
  { name: "Users", href: "/admin/users", icon: UsersIcon, current: false },
  {
    name: "Configuration",
    href: "#",
    icon: CogIcon,
    current: false,
    subItems: [
      { name: "Competitions", href: "/admin/competitions" },
      { name: "Plans", href: "/admin/plans" },
      { name: "Orders", href: "/admin/orders" },
    ],
  },
  {
    name: "Notifications",
    href: "/admin/notifications",
    icon: BellIcon,
    current: false,
  },
  {
    name: "Analytics",
    href: "#",
    icon: ChartPieIcon,
    current: false,
    subItems: [
      { name: "Reports", href: "/admin/reports" },
      { name: "Statistics", href: "/admin/statistics" },
      { name: "Insights", href: "/admin/insights" },
    ],
  },
  {
    name: "Control Panel",
    href: "/admin/control-panel",
    subItems: [
      { name: "Permissions", href: "/admin/permissions" },
      { name: "Executives", href: "/admin/executives" },
    ],
    icon: AdjustmentsVerticalIcon,
    current: false,
  },
  {
    name: "Reports",
    href: "/admin/achievers",
    icon: DocumentChartBarIcon,
    current: false,
  },
  {
    name: "Transactions",
    href: "/admin/transactions",
    icon: ArrowsRightLeftIcon,
    current: false,
  },
  {
    name: "Manage Server",
    href: "/admin/server",
    icon: PowerIcon,
    current: false,
  },
];

const teams = [];
const userNavigation = [
  { name: "Your profile", href: "#" },
  { name: "Sign out", type: "button" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");
  const { auth } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const [activeDropdown, setActiveDropdown] = useState("");

  const handleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? "" : name);
  };
  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-white border transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full border max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full border-r border-gray-200"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 ring-1 ring-white/10 border-r border-gray-200">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) =>
                          item.subItems ? (
                            <li key={item.name} className="relative">
                              <button
                                type="button"
                                className={classNames(
                                  item.name === activeDropdown
                                    ? "bg-teal-100 text-teal-800"
                                    : "text-teal-700 hover:bg-teal-100 hover:text-teal-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full"
                                )}
                                aria-expanded="false"
                                aria-haspopup="true"
                                onClick={() => handleDropdown(item.name)} // Toggle the dropdown visibility
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="h-6 w-6 shrink-0"
                                />
                                {item.name}
                              </button>

                              {activeDropdown === item.name && (
                                <ul
                                  style={{ zIndex: "100" }}
                                  className="absolute left-0 mt-2 w-48  bg-white border border-gray-200 rounded-md shadow-lg"
                                >
                                  {item.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                      <Link
                                        to={subItem.href}
                                        className="block px-4 py-2 text-sm text-teal-700 hover:bg-teal-100 hover:text-teal-800"
                                      >
                                        {subItem.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ) : (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-teal-100 text-teal-800"
                                    : "text-teal-700 hover:bg-teal-100 hover:text-teal-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className="h-6 w-6 shrink-0"
                                />
                                {item.name}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-teal-700">
                        Your teams
                      </div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">
                        {teams.map((team) => (
                          <li key={team.name}>
                            <a
                              href={team.href}
                              className={classNames(
                                team.current
                                  ? "bg-teal-100 text-teal-800"
                                  : "text-teal-700 hover:bg-teal-100 hover:text-teal-800",
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                              )}
                            >
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-teal-100 text-[0.625rem] font-medium text-teal-700 group-hover:text-white">
                                {team.initial}
                              </span>
                              <span className="truncate">{team.name}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-teal-700 hover:bg-teal-100 hover:text-teal-800"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-gray-200">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) =>
                      item.subItems ? (
                        <li key={item.name} className="relative">
                          <button
                            type="button"
                            className={classNames(
                              item.name === activeDropdown
                                ? "bg-teal-100 text-teal-800"
                                : "text-teal-700 hover:bg-teal-100 hover:text-teal-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full"
                            )}
                            aria-expanded="false"
                            aria-haspopup="true"
                            onClick={() => handleDropdown(item.name)} // Toggle the dropdown visibility
                          >
                            <item.icon
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0"
                            />
                            {item.name}
                          </button>

                          {activeDropdown === item.name && (
                            <ul className="absolute z-50 left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                              {item.subItems.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    to={subItem.href}
                                    className="block px-4 py-2 text-sm text-teal-700 hover:bg-teal-100 hover:text-teal-800"
                                  >
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-teal-100 text-teal-800"
                                : "text-teal-700 hover:bg-teal-100 hover:text-teal-800",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0"
                            />
                            {item.name}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-teal-700">
                    Your teams
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? "bg-teal-100 text-teal-800"
                              : "text-teal-700 hover:bg-teal-100 hover:text-teal-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-teal-100 text-[0.625rem] font-medium text-teal-700 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-teal-700 hover:bg-teal-100 hover:text-teal-800"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-teal-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="relative flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-teal-700"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-teal-700 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-teal-700 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>

                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                  aria-hidden="true"
                />

                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=W9g63Ilo6k&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      >
                        {auth ? auth.username : "User"}
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-teal-700"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                    <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          {({ active }) =>
                            item.type === "button" ? (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900"
                                )}
                              >
                                {item.name}
                              </button>
                            ) : (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                {item.name}
                              </a>
                            )
                          }
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10 custom-bg">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
