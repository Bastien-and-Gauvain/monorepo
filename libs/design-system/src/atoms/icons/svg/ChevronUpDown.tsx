import { SVGIconProps } from '.';

export const ChevronUpDown = ({ className, color, size }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={size}
    width={size}
    strokeWidth={1.5}
    stroke="currentColor"
    color={color}
    className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
  </svg>
);
