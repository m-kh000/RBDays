import confetti, { Options } from "canvas-confetti";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  options?: Options;
};

export function ConfettiButton({ children, options, ...props }: Props) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({ origin: { x, y }, ...options });
    const n = Math.floor(Math.random() * 8) + 1;
    new Audio(`/${n}.mp3`).play();
  }

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
