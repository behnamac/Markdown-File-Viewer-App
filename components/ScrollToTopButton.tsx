"use client";

import { useEffect, useState, type RefObject } from "react";

const SCROLL_THRESHOLD = 320;

interface ScrollToTopButtonProps {
  scrollContainerRef: RefObject<HTMLElement | null>;
}

export function ScrollToTopButton({
  scrollContainerRef,
}: ScrollToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const el = scrollContainerRef.current;
      const containerTop = el?.scrollTop ?? 0;
      const windowTop =
        typeof window !== "undefined" ? window.scrollY : 0;
      setVisible(
        containerTop > SCROLL_THRESHOLD || windowTop > SCROLL_THRESHOLD
      );
    };

    const el = scrollContainerRef.current;
    el?.addEventListener("scroll", check, { passive: true });
    window.addEventListener("scroll", check, { passive: true });
    check();

    return () => {
      el?.removeEventListener("scroll", check);
      window.removeEventListener("scroll", check);
    };
  }, [scrollContainerRef]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
      aria-label="Scroll back to top"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
