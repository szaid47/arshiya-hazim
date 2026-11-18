import React from "react";

interface OrnateFrameProps {
  children: React.ReactNode;
}

export const OrnateFrame: React.FC<OrnateFrameProps> = ({ children }) => {
  return (
    <div className="relative w-full max-w-[420px] mx-auto min-h-[620px] bg-[#FAF5EE] p-8 md:p-10 shadow-[0_15px_40px_rgba(92,64,40,0.08)] flex flex-col items-center justify-between rounded-3xl overflow-hidden my-4 border border-[#D4AF6A]/20">
      {/* Absolute SVG Ornate Border Background */}
      <div className="absolute inset-0 pointer-events-none select-none p-3.5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 150"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outermost Thin Gold Border */}
          <rect
            x="1"
            y="1"
            width="98"
            height="148"
            rx="8"
            stroke="#D4AF6A"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="2 1"
          />

          {/* Inner Golden Border with Elegant Arch Top */}
          {/* Moorish Arch path: Start from bottom left, go up, curve into the dome arch top, and back down */}
          <path
            d="
              M 4, 145
              L 4, 45
              C 4, 30, 15, 18, 25, 15
              C 35, 12, 45, 6, 50, 2
              C 55, 6, 65, 12, 75, 15
              C 85, 18, 96, 30, 96, 45
              L 96, 145
              Z
            "
            stroke="#B88B4A"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />

          {/* Inner offset thin line following the arch */}
          <path
            d="
              M 6.5, 142.5
              L 6.5, 45.5
              C 6.5, 31.5, 17, 19.5, 26.5, 16.5
              C 36, 13.5, 45.5, 7.5, 50, 4
              C 54.5, 7.5, 64, 13.5, 73.5, 16.5
              C 83, 19.5, 93.5, 31.5, 93.5, 45.5
              L 93.5, 142.5
              Z
            "
            stroke="#D4AF6A"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            opacity="0.7"
          />

          {/* Bottom Ornate Corner Details */}
          {/* Bottom Left Corner Flourish */}
          <path
            d="M 4, 135 C 10, 135, 10, 145, 4, 145 M 4, 138 C 8, 138, 8, 145, 11, 145"
            stroke="#B88B4A"
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
          />
          {/* Bottom Right Corner Flourish */}
          <path
            d="M 96, 135 C 90, 135, 90, 145, 96, 145 M 96, 138 C 92, 138, 92, 145, 89, 145"
            stroke="#B88B4A"
            strokeWidth="0.75"
            vectorEffect="non-scaling-stroke"
          />

          {/* Elegant Top Arch Arabesque Accent */}
          <g transform="translate(50, 10) scale(0.6)">
            {/* Center crown detail under the point */}
            <path
              d="M -10, 5 C 0, -2, 0, -10, 0, -12 C 0, -10, 0, -2, 10, 5 C 4, 7, -4, 7, -10, 5 Z"
              fill="#B88B4A"
              opacity="0.8"
            />
            <circle cx="0" cy="-15" r="1.5" fill="#D4AF6A" />
          </g>
        </svg>
      </div>

      {/* Decorative Corner Overlays */}
      <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#D4AF6A]/40 rounded-tl pointer-events-none" />
      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-[#D4AF6A]/40 rounded-tr pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#D4AF6A]/40 rounded-bl pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-[#D4AF6A]/40 rounded-br pointer-events-none" />

      {/* Card Content Wrapper with custom padding to avoid border clipping */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-between py-6 px-3 text-center flex-grow">
        {children}
      </div>
    </div>
  );
};
export default OrnateFrame;
