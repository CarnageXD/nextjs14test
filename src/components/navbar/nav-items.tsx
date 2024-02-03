"use client";

import { NavItem } from "./nav-item";

import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { PRODUCT_CATEGORIES } from "@/config";

export const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => document.removeEventListener("keydown", handler);
  }, []);

  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };

        const isOpen = activeIndex === index;

        return (
          <NavItem
            key={category.label}
            category={category}
            handleOpen={handleOpen}
            isOpen={isOpen}
            isAnyOpen={activeIndex !== null}
          />
        );
      })}
    </div>
  );
};
