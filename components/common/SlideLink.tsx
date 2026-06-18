"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { type Direction, startSlideTransition } from "@/lib/viewTransition";

type SlideLinkProps = Omit<ComponentPropsWithoutRef<"a">, keyof LinkProps> &
  LinkProps & {
    direction: Direction;
    children: ReactNode;
  };

function isExternalHref(href: unknown): boolean {
  if (typeof href !== "string") return true;
  if (href.startsWith("//")) return true;
  return /^[a-z][a-z0-9+.-]*:/i.test(href);
}

function hasModifierKey(e: MouseEvent): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

export function SlideLink({
  direction,
  onClick,
  href,
  replace,
  ...rest
}: SlideLinkProps) {
  const router = useRouter();
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || hasModifierKey(e)) return;
    if (isExternalHref(href)) return;
    e.preventDefault();
    const target = href as string;
    startSlideTransition(direction, () => {
      if (replace) {
        router.replace(target);
      } else {
        router.push(target);
      }
    });
  };
  return <Link href={href} replace={replace} onClick={handleClick} {...rest} />;
}
