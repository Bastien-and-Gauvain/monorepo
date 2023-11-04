import { SVGIconProps } from '.';
import { cn } from '../../..';

export const ChevronDown = ({ className, size }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={size}
    width={size}
    strokeWidth={2}
    stroke="currentColor"
    className={cn(className, 'plasmo-shrink-0')}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);