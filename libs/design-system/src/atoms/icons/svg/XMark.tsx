import { SVGIconProps } from '.';

export const XMark = ({ className, size }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    fill="none"
    strokeWidth={2}
    stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 17L17 5M5 5l12 12" />
  </svg>
);
