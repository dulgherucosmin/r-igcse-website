import { type SVGProps, useId } from "react";

const Instagram = (props: SVGProps<SVGSVGElement>) => {
  const uid = useId();
  return (
    <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
      <defs>
        <radialGradient
          id={`${uid}-g0`}
          cx="0.3"
          cy="1.07"
          r="1.2"
          fx="0.3"
          fy="1.07"
        >
          <stop offset="0" stopColor="#FFDD55" />
          <stop offset="0.1" stopColor="#FFDD55" />
          <stop offset="0.5" stopColor="#FF543E" />
          <stop offset="1" stopColor="#C837AB" />
        </radialGradient>
        <radialGradient
          id={`${uid}-g1`}
          cx="0.1"
          cy="-0.05"
          r="0.8"
          fx="0.1"
          fy="-0.05"
        >
          <stop offset="0" stopColor="#3771C8" />
          <stop offset="0.128" stopColor="#3771C8" />
          <stop offset="1" stopColor="#6600FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="256" height="256" rx="60" fill={`url(#${uid}-g0)`} />
      <rect width="256" height="256" rx="60" fill={`url(#${uid}-g1)`} />
      <rect
        x="40"
        y="40"
        width="176"
        height="176"
        rx="48"
        fill="none"
        stroke="#FFF"
        strokeWidth="16"
      />
      <circle
        cx="128"
        cy="128"
        r="40"
        fill="none"
        stroke="#FFF"
        strokeWidth="16"
      />
      <circle cx="180" cy="76" r="11" fill="#FFF" />
    </svg>
  );
};

export { Instagram };