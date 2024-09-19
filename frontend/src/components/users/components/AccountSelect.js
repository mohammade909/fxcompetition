'use client';

import { useState, useEffect } from 'react';
import { getAccountsByTraderId } from "../../../actions/accounts";
import { setCurrentAccount } from "../../../redux/accountSlice"; // Import the action
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSelector, useDispatch } from "react-redux";

export default function AccountSelect() {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => state.auth);
    const { accounts } = useSelector((state) => state.accounts);
    const { account } = useSelector((state) => state.accounts); // Assuming account is in the accounts slice

    useEffect(() => {
      dispatch(getAccountsByTraderId(auth.user_id));
    }, [dispatch, auth.user_id]);

    // Set default selected account as the first account in the array
    const [selected, setSelected] = useState(accounts[0]);

    // Handle account change and dispatch setCurrentAccount
    const handleAccountChange = (account) => {
      setSelected(account);
      dispatch(setCurrentAccount(account)); // Dispatch action to set current account
    };

    // Update selected account when accounts change
    useEffect(() => {
      if (accounts.length > 0) {
        setSelected(accounts[0]); // Set default selection
        dispatch(setCurrentAccount(accounts[0])); // Dispatch the first account as current by default
      }
    }, [accounts, dispatch]);

  return (
    <Listbox value={selected} onChange={handleAccountChange}>
      <Label className="sr-only">Change account</Label>
      <div className="relative">
        <div className="inline-flex divide-x divide-[#92adf6]">
          <div className="inline-flex items-center gap-x-1.5 px-3 py-2 bg-[#DDE5FB] rounded-l-md text-gray-700">
            <CheckIcon aria-hidden="true" className="-ml-0.5 h-5 w-5" />
            {account && (
              <p className="text-sm font-semibold">
                Account: {account.account_number}, Balance: ${account.balance}
              </p>
            )}
          </div>
          <ListboxButton className="inline-flex items-center rounded-l-none rounded-r-md bg-[#D3BDF0] p-2 hover:bg-[#d3bdf092] focus:outline-none focus:ring-2 focus:bg-[#D3BDF0] focus:ring-offset-2 focus:ring-offset-gray-50">
            <span className="sr-only">Change account</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-white" />
          </ListboxButton>
        </div>

        <ListboxOptions
          transition
          className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {accounts.map((account) => (
            <ListboxOption
              key={account.account_id}
              value={account}
              className="group cursor-default select-none p-4 text-sm text-gray-700 data-[focus]:bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 data-[focus]:text-white"
            >
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <p className="font-normal group-data-[selected]:font-semibold text-gray-800 group-data-[focus]:text-white">
                    Account: {account.account_number}
                  </p>
                  <span className="text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                    <CheckIcon aria-hidden="true" className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-2 text-gray-600 group-data-[focus]:text-white">
                  Balance: ${account.balance} - {account.currency}
                </p>
              </div>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
