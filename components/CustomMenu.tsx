import React from 'react'

import { Menu } from "@headlessui/react";
import Image from "next/image";

export type CustomMenuProps = {
  title: string;state: string;
  filters: string[];
  setState: (value: string) => void;
}

const CustomMenu = (props: CustomMenuProps) => {
  const { title, state, filters, setState } = props;
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="">
        {title}
      </label>
      <Menu className="self-start relative" as="div">
        <div>
          <Menu.Button className="flexCenter custom_menu-btn">
            { state || "Select a category"}
            <Image
              src="./arrow-down.svg"
              width={10}
              height={5}
              alt="Arrow down"
            />
          </Menu.Button>
        </div>
        <Menu.Items className="flexStart custom_menu-items">
          {
            (filters.map((tag: string) => (
              <Menu.Item key={tag}>
                <button
                  type="button"
                  value={tag}
                  className="custom_menu-item"
                  onClick={(e) => setState(e.currentTarget.value)}
                >
                  {tag}
                </button>
              </Menu.Item>
            )))
          }
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default CustomMenu