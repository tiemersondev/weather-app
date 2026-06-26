"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/format";
import type { UnitSystem } from "@/types/weather";

type UnitDropdownProps = {
  unitSystem: UnitSystem;
  onUnitChange: (unitSystem: UnitSystem) => void;
};

export function UnitDropdown({ unitSystem, onUnitChange }: UnitDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} className="relative z-30">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((current) => !current)}
        className="focus-ring flex h-11 items-center gap-2 rounded-lg bg-neutral-800 px-3 text-sm font-semibold text-neutral-0 transition hover:bg-neutral-700 sm:h-12 sm:px-4 sm:text-base"
      >
        <Image src="/assets/images/icon-units.svg" alt="" width={16} height={16} />
        Units
        <Image
          src="/assets/images/icon-dropdown.svg"
          alt=""
          width={12}
          height={7}
          className={cx("transition", isOpen && "rotate-180")}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-[214px] rounded-lg border border-neutral-600 bg-neutral-800 p-2 text-sm shadow-menu sm:w-[268px] sm:text-base"
        >
          <button
            type="button"
            onClick={() => {
              onUnitChange(unitSystem === "metric" ? "imperial" : "metric");
              setIsOpen(false);
            }}
            className="focus-ring mb-2 w-full rounded-md px-2 py-2 text-left font-semibold transition hover:bg-neutral-700"
          >
            Switch to {unitSystem === "metric" ? "Imperial" : "Metric"}
          </button>

          <MenuSection title="Temperature">
            <MenuOption
              label="Celsius (°C)"
              selected={unitSystem === "metric"}
              onClick={() => onUnitChange("metric")}
            />
            <MenuOption
              label="Fahrenheit (°F)"
              selected={unitSystem === "imperial"}
              onClick={() => onUnitChange("imperial")}
            />
          </MenuSection>

          <MenuSection title="Wind Speed">
            <MenuOption label="km/h" selected={unitSystem === "metric"} onClick={() => onUnitChange("metric")} />
            <MenuOption label="mph" selected={unitSystem === "imperial"} onClick={() => onUnitChange("imperial")} />
          </MenuSection>

          <MenuSection title="Precipitation" isLast>
            <MenuOption
              label="Millimeters (mm)"
              selected={unitSystem === "metric"}
              onClick={() => onUnitChange("metric")}
            />
            <MenuOption
              label="Inches (in)"
              selected={unitSystem === "imperial"}
              onClick={() => onUnitChange("imperial")}
            />
          </MenuSection>
        </div>
      )}
    </div>
  );
}

function MenuSection({
  title,
  children,
  isLast = false,
}: {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}) {
  return (
    <div className={cx("border-neutral-600 py-2", !isLast && "border-b")}>
      <p className="mb-1 px-2 text-xs font-medium text-neutral-300 sm:text-sm">{title}</p>
      {children}
    </div>
  );
}

function MenuOption({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={selected}
      onClick={onClick}
      className={cx(
        "focus-ring flex w-full items-center justify-between rounded-md px-2 py-2 text-left transition hover:bg-neutral-700",
        selected && "bg-neutral-700 font-semibold",
      )}
    >
      <span>{label}</span>
      {selected && <Image src="/assets/images/icon-checkmark.svg" alt="" width={14} height={12} />}
    </button>
  );
}
