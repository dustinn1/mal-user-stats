import { Fragment, ReactElement } from "react";
import { Menu, Transition } from "@headlessui/react";

type Props = {
  menuButton: JSX.Element;
  items: {
    data: any[];
    key?: string;
    width?: string;
    button({ active, item }: { active: boolean; item: any }): JSX.Element;
  };
};

export default function Dropdown({ menuButton, items }: Props) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="w-full">{menuButton}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute right-0 z-50 mt-2 w-${
            items.width ?? "full"
          } origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800`}
        >
          <div className="px-0.5">
            {items.data.map((item) => (
              <Menu.Item key={item.key ? item[item.key] : item.name}>
                {({ active }) => items.button({ active, item })}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
