import Image from "next/image";
import { UnitDropdown } from "@/components/ui/UnitDropdown";
import type { UnitSystem } from "@/types/weather";

type HeaderProps = {
  unitSystem: UnitSystem;
  onUnitChange: (unitSystem: UnitSystem) => void;
};

export function Header({ unitSystem, onUnitChange }: HeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-[1216px] items-center justify-between px-4 pt-4 sm:px-6 lg:px-0 lg:pt-12">
      <Image
        src="/assets/images/logo.svg"
        alt="Weather Now"
        width={197}
        height={40}
        priority
        className="h-auto w-[145px] sm:w-[197px]"
      />
      <UnitDropdown unitSystem={unitSystem} onUnitChange={onUnitChange} />
    </header>
  );
}
