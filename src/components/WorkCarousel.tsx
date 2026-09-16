"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type Project = {
  name: string;
  category: string;
  description: string;
  image: string;
  tone: string;
};

const AUTOPLAY_MS = 6000;
const RESUME_AFTER_MS = 8000;
const SCROLL_DURATION_MS = 550;
const SETTLE_DEBOUNCE_MS = 120;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export default function WorkCarousel({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const scrollToken = useRef(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const count = projects.length;
  // A clone of the last card up front and a clone of the first card at the
  // end, so there's always real content to reveal when dragging past either
  // boundary — that's what makes the wrap-around feel continuous instead of
  // just stopping dead at the ends.
  const padded = useMemo(
    () => (count ? [projects[count - 1], ...projects, projects[0]] : []),
    [projects, count]
  );

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    const onChange = () => setReduceMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Start centered on the first *real* card (DOM index 1, past the
  // prepended clone) before the browser paints anything.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const child = track?.children[1] as HTMLElement | undefined;
    if (!track || !child) return;
    const trackRect = track.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    track.scrollLeft += childRect.left - trackRect.left;
  }, []);

  const scrollToDom = useCallback((domIndex: number, instant = false) => {
    const track = trackRef.current;
    const child = track?.children[domIndex] as HTMLElement | undefined;
    if (!track || !child) return;

    const token = ++scrollToken.current;
    const trackRect = track.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    const target = track.scrollLeft + (childRect.left - trackRect.left);
    const start = track.scrollLeft;
    const change = target - start;

    if (instant || reduceMotion || Math.abs(change) < 1) {
      track.scrollLeft = target;
      return;
    }

    track.style.scrollSnapType = "none";
    const startTime = performance.now();
    const step = (now: number) => {
      if (scrollToken.current !== token) return; // superseded by a newer call
      const t = Math.min(1, (now - startTime) / SCROLL_DURATION_MS);
      track.scrollLeft = start + change * easeInOutCubic(t);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        track.style.scrollSnapType = "";
      }
    };
    requestAnimationFrame(step);
  }, [reduceMotion]);

  // Logical index (0..count-1) -> DOM index (1..count, offset by the
  // prepended clone) — used by autoplay, arrows, dots and the resume timer,
  // all of which already think in terms of the real, wrapped slide number.
  const goTo = useCallback(
    (i: number) => {
      const wrapped = ((i % count) + count) % count;
      scrollToDom(wrapped + 1);
    },
    [count, scrollToDom]
  );

  // Once scrolling has actually settled (debounced — covers touch momentum,
  // drag release, and the end of our own eased animation alike), figure out
  // where we landed. If it's one of the two clones, silently teleport to the
  // matching real card: same pixels, so the jump is invisible, and it's what
  // makes dragging past either end feel like it wraps instead of hitting a
  // wall.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || count === 0) return;

    const onSettled = () => {
      const domIndex = Math.round(track.scrollLeft / track.clientWidth);
      if (domIndex <= 0) {
        scrollToDom(count, true); // real last card
        setActive(count - 1);
      } else if (domIndex >= count + 1) {
        scrollToDom(1, true); // real first card
        setActive(0);
      } else {
        setActive(domIndex - 1);
      }
    };

    const onScroll = () => {
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
      settleTimeout.current = setTimeout(onSettled, SETTLE_DEBOUNCE_MS);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (settleTimeout.current) clearTimeout(settleTimeout.current);
    };
  }, [count, scrollToDom]);

  const clearResumeTimeout = () => {
    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
      resumeTimeout.current = null;
    }
  };

  // Autoplay ticks every AUTOPLAY_MS while not paused.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = setInterval(() => {
      goTo(activeRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, reduceMotion, goTo]);

  useEffect(() => clearResumeTimeout, []);

  // After a manual interaction, wait RESUME_AFTER_MS, then advance once
  // immediately (rather than un-pausing and waiting a whole extra
  // AUTOPLAY_MS on top) so the pause has a predictable, felt end.
  const pauseTemporarily = () => {
    setPaused(true);
    clearResumeTimeout();
    resumeTimeout.current = setTimeout(() => {
      setPaused(false);
      goTo(activeRef.current + 1);
    }, RESUME_AFTER_MS);
  };

  const handleManualGo = (i: number) => {
    goTo(i);
    pauseTemporarily();
  };

  // Mouse (and pen) drag-to-scroll — touch already gets native swipe via
  // overflow-x-auto, so it's excluded here to keep its native momentum.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    scrollToken.current++; // cancel any in-flight eased animation
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false };
    track.setPointerCapture(e.pointerId);
    track.style.scrollBehavior = "auto";
    track.style.scrollSnapType = "none";
    track.style.userSelect = "none";
    clearResumeTimeout();
    setPaused(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    const delta = e.clientX - drag.current.startX;
    if (Math.abs(delta) > 3) drag.current.moved = true;
    track.scrollLeft = drag.current.startScroll - delta;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    drag.current.active = false;
    track.style.userSelect = "";
    track.style.scrollBehavior = "";
    track.style.scrollSnapType = "";
    try {
      track.releasePointerCapture(e.pointerId);
    } catch {}
    const domIndex = Math.max(0, Math.min(count + 1, Math.round(track.scrollLeft / track.clientWidth)));
    scrollToDom(domIndex);
    pauseTemporarily();
  };

  return (
    <div>
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex items-start snap-x snap-mandatory gap-6 overflow-x-auto pb-2 scrollbar-none cursor-grab active:cursor-grabbing"
      >
        {padded.map((project, domIndex) => {
          const isClone = domIndex === 0 || domIndex === count + 1;
          return (
            <div
              key={`${project.name}-${domIndex}`}
              aria-hidden={isClone || undefined}
              className="w-full shrink-0 snap-start overflow-hidden border-2 border-cream/15"
            >
              <div className={`p-6 sm:p-7 ${project.tone}`}>
                <p className="font-mono text-xs uppercase tracking-wide opacity-70">
                  {project.category}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
                  {project.name}
                </h3>
                <p className="mt-2 max-w-2xl text-[14px] leading-snug opacity-80">
                  {project.description}
                </p>
              </div>
              <div className="relative aspect-4/1 w-full bg-cream">
                <Image
                  src={project.image}
                  alt={`Piezas de ${project.name}`}
                  fill
                  draggable={false}
                  loading="eager"
                  className="object-cover"
                  sizes="(min-width: 1152px) 1100px, 100vw"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => handleManualGo(active - 1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-cream/20 text-cream transition-colors hover:border-pink hover:text-pink-light"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex gap-2">
          {projects.map((project, i) => (
            <button
              key={project.name}
              type="button"
              aria-label={`Ir a ${project.name}`}
              onClick={() => handleManualGo(i)}
              className="relative h-1 w-8 overflow-hidden bg-cream/20"
            >
              {i === active && (
                <span
                  key={active}
                  className={`absolute inset-y-0 left-0 w-full bg-pink animate-carousel-progress ${
                    paused || reduceMotion ? "[animation-play-state:paused]" : ""
                  }`}
                />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => handleManualGo(active + 1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-cream/20 text-cream transition-colors hover:border-pink hover:text-pink-light"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
