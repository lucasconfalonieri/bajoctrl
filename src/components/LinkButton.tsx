import type { ReactNode } from "react";

export default function LinkButton({
  href,
  icon,
  label,
  sublabel,
  variant = "light",
}: {
  href: string;
  icon: ReactNode;
  label: string;
  sublabel: string;
  variant?: "light" | "dark";
}) {
  const tone =
    variant === "dark"
      ? "bg-maroon-deep text-cream border-pink hover:bg-maroon"
      : "bg-pink-light text-maroon-deep border-ink hover:bg-pink";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex w-full items-center gap-4 border-2 px-5 py-[18px] font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0 ${tone}`}
    >
      <span className="h-[26px] w-[26px] shrink-0">{icon}</span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-semibold">{label}</span>
        <span className="font-mono text-[0.68rem] uppercase tracking-wide opacity-65">
          {sublabel}
        </span>
      </span>
    </a>
  );
}
