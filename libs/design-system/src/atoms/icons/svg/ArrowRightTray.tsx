import { SVGIconProps } from '.';
import { cn } from '../../..';

export const ArrowRightTray = ({ className, size }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    height={size}
    width={size}
    strokeWidth={2}
    stroke="currentColor"
    className={cn(className, 'plasmo-rotate-90')}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
    />
  </svg>
);
