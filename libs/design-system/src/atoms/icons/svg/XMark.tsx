import { SVGIconProps } from '.';
import { cn } from '../../..';

export const XMark = ({ className, size }: SVGIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    className={cn('plasmo-shrink-0', className)}
    fill="none"
    strokeWidth={2}
    stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
