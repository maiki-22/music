import React from "react";
import { useLocation } from "react-router-dom";

export function SideMenuItem({ href, children }) {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li>
      <a
        href={href}
        className={`flex gap-4 text-zinc-600 items-center py-3 px-5 font-medium hover:text-red-500 hover:bg-zinc-800 transition duration-300 p-2 cursor-pointer rounded-lg ${isActive ? 'bg-zinc-800 text-red-500' : ''}`}
      >
        {children}
      </a>
    </li>
  );
}

export default SideMenuItem;