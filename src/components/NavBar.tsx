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
import Link from "next/link";
import { useRouter } from "next/router";
// Utils
import cn from "../utils/cn";
// Next Auth
import { useSession, signIn, signOut } from "next-auth/react";

const NavBar = ({ withoutSearch = false }) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPage = "/" + router.route.split("/")[1];

  const navItems = [
    { name: "Shop", href: "/products" },
    { name: "Blog", href: "/blog" },
    { name: "Our Story", href: "/our-story" },
  ].map((item, i) => {
    return (
      <Link
        href={item.href}
        className={cn(
          "mb-4 cursor-pointer text-h4 hover:text-main md:mr-16 md:mb-0 md:text-h5",
          currentPage == item.href ? "md:font-bold" : ""
        )}
        key={i}
      >
        {item.name}
      </Link>
    );
  });
  return (
    <nav className="md:flex md:items-center md:justify-between">
      {/* Logo and icons */}
      <div className="flex items-center justify-between">
        {/* logo */}
        <Link href="/">
          <Image className="cursor-pointer" src={IMG_LOGO} alt="" />
        </Link>
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
          {session ? (
            <button className="prym-btn px-6" onClick={() => signOut()}>
              Sign out
            </button>
          ) : (
            <button className="prym-btn px-6" onClick={() => signIn()}>
              Sign in
            </button>
          )}
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
      {!withoutSearch ? <Search className="md:hidden" /> : null}
    </nav>
  );
};

export default NavBar;
