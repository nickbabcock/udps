import React from "react";
import Link from "next/link";

export const Header: React.FC<{}> = () => (
  <header>
    <div>
      <Link href="/">
        <a>Umich DPS</a>
      </Link>
    </div>
    <div>
      <Link href="/statistics">
        <a>Statistics</a>
      </Link>
    </div>
    <div>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
    <style jsx>{`
      header {
        padding-top: 1rem;
        display: flex;
        gap: clamp(1em, 2.5vw, 4em);
        font-size: 1.25rem;
      }
    `}</style>
  </header>
);
