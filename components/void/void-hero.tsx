"use client";

import { FadeIn } from "@/components/animations/fade-in";

export function VoidHero(): JSX.Element {
  return (
    <FadeIn className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-grotesk text-[10px] uppercase tracking-normal text-[#c6c6c6]">
        Kanit Mann · Data, ML &amp; AI Engineer
      </p>
      <h1 className="font-['Times,_serif'] text-4xl font-normal leading-[1.2] text-white md:text-6xl">
        Building in the deep.
      </h1>
      <p className="font-['Times,_serif'] text-[16px] leading-[1.88] text-[#c6c6c6] max-w-[480px]">
        The work lives in the dark — move, and it surfaces.
      </p>
    </FadeIn>
  );
}
