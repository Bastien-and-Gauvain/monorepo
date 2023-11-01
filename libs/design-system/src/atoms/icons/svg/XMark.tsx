import { SVGIconProps } from '.';

export const XMark = ({ className, color, size }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={className}
    color={color}
    fill="none"
    strokeWidth={1.5}
    stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
