'use client';

import { createContext, useContext, useState, useEffect } from "react";

const MenuContext = createContext();

export function MenuProvider({ children, user }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [file, setFile] = useState(null);

  const toggleSearch = () => setSearchOpen(prev => !prev);
  const toggleMenu = () => setMenuOpen(prev => !prev);
  const toggleAccount = () => setAccountOpen(prev => !prev);

  // Unified scroll lock effect
  useEffect(() => {
    const anyOpen = searchOpen || menuOpen || accountOpen;
    document.body.style.overflow = anyOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [searchOpen, menuOpen, accountOpen]);

  return (
    <MenuContext.Provider value={{ 
      searchOpen, setSearchOpen, toggleSearch,
      menuOpen, setMenuOpen, toggleMenu,
      accountOpen, setAccountOpen, toggleAccount,
      file, setFile,
      user // <-- added user here
    }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}