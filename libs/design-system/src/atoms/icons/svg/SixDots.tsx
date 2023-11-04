import { SVGIconProps } from '.';

export const SixDots = ({ className, size }: SVGIconProps) => (
  <svg
    width={size}
    height={size}
    className={className}
    strokeWidth={1}
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="8" r="1" fill="white" />
    <circle cx="16" cy="8" r="1" fill="white" />
    <circle cx="11" cy="8" r="1" fill="white" />
    <circle cx="6" cy="14" r="1" fill="white" />
    <circle cx="16" cy="14" r="1" fill="white" />
    <circle cx="11" cy="14" r="1" fill="white" />
  </svg>
);
