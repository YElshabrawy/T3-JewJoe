import React, { useState } from "react";
// Components
import Hamburger from "hamburger-react";
import Search from "./Search";
// Icons
import CartIcon from "./Icons/CartIcon";
import SearchIcon from "./Icons/SearchIcon";
import ProfileIcon from "./Icons/ProfileIcon";
import Image from "next/image";
// Static images
import IMG_LOGO from "../assets/svg/logo.svg";

const NavBar = ({ withoutSearch = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["Shop", "Blog", "Our Story"].map((item, i) => {
    return (
      <h5
        className="text-h4 hover:text-main md:text-h5 mb-4 cursor-pointer md:mr-16 md:mb-0"
        key={i}
      >
        {item}
      </h5>
    );
  });
  return (
    <nav className="md:flex md:items-center md:justify-between">
      {/* Logo and icons */}
      <div className="flex items-center justify-between">
        {/* logo */}
        <Image className="cursor-pointer" src={IMG_LOGO} alt="" />
        {/* Right Hand Side */}
        <div className="-mr-2 flex items-center md:hidden">
          {/* Cart */}
          <button className="mr-4 text-3xl text-black">
            <CartIcon items={2} />
          </button>

          {/* Hamburger */}
          <Hamburger size={20} rounded toggled={isOpen} toggle={setIsOpen} />
        </div>
      </div>
      {/* Nav items */}
      <div className={(isOpen ? "block" : "hidden") + " md:flex md:divide-x"}>
        {/* Nav Items */}
        <div className="flex flex-col items-center justify-center md:flex md:flex-row">
          {navItems}
        </div>
        {/* Desktop Icons */}
        <div className="hidden md:flex">
          <button className="ml-12 w-4">
            <SearchIcon />
          </button>
          <button className="ml-10 text-3xl">
            <CartIcon items={2} />
          </button>
          <button className="ml-10 w-5 text-3xl">
            <ProfileIcon />
          </button>
        </div>
      </div>
      {/* Search Bar */}
      {!withoutSearch ? <Search /> : null}
    </nav>
  );
};

export default NavBar;
