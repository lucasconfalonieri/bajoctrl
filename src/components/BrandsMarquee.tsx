export default function BrandsMarquee({ brands }: { brands: string[] }) {
  const track = [...brands, ...brands];

  return (
    <div className="relative overflow-hidden mask-[linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="animate-marquee flex w-max gap-4">
        {track.map((brand, i) => (
          <span
            key={`${brand}-${i}`}
            className="flex shrink-0 items-center border-2 border-cream/15 px-6 py-4 font-display text-base font-medium text-cream/70"
          >
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
