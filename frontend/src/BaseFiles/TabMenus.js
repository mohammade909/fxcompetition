import { useLocation, Link } from "react-router-dom";
import { useState , useEffect} from "react";

function classNames(...classes) {
return classes.filter(Boolean).join(' ');
}

export default function TabMenus({tabs}) {
const location = useLocation();
const [currentTab, setCurrentTab] = useState(tabs[0].name);

useEffect(() => {
  const current = tabs.find(tab => tab.href === location.pathname);
  if (current) {
    setCurrentTab(current.name);
  }
}, [location.pathname]);

return (
  <div>
    <div className="sm:hidden">
      <label htmlFor="tabs" className="sr-only">
        Select a tab
      </label>
      {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
      <select
        id="tabs"
        name="tabs"
        value={currentTab}
        onChange={(e) => {
          const selectedTab = tabs.find(tab => tab.name === e.target.value);
          if (selectedTab) {
            window.location.href = selectedTab.href;
          }
        }}
        className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
      >
        {tabs.map((tab) => (
          <option key={tab.name}>{tab.name}</option>
        ))}
      </select>
    </div>
    <div className="hidden sm:block">
      <nav aria-label="Tabs" className="isolate flex divide-x divide-gray-200 rounded-lg shadow">
        {tabs.map((tab, tabIdx) => (
          <Link
            key={tab.name}
            to={tab.href}
            aria-current={tab.name === currentTab ? 'page' : undefined}
            className={classNames(
              tab.name === currentTab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
              tabIdx === 0 ? 'rounded-l-lg' : '',
              tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
              'group relative min-w-0 flex-1 overflow-hidden bg-white px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10',
            )}
          >
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                tab.name === currentTab ? 'bg-indigo-500' : 'bg-transparent',
                'absolute inset-x-0 bottom-0 h-0.5',
              )}
            />
          </Link>
        ))}
      </nav>
    </div>
  </div>
);
}
