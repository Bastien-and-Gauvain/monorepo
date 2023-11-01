import { SVGIconProps } from '.';
import { cn } from '../../..';

export const ChevronLeftRight = ({ className, size }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={size}
    width={size}
    strokeWidth={2}
    stroke="currentColor"
    className={cn(className, 'plasmo-rotate-90')}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
  </svg>
);
