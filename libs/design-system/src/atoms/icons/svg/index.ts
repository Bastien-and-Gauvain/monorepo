import { SixDots } from './SixDots';
import { Spinner } from './Spinner';

export const icons = {
  Spinner,
  SixDots,
};

export type IconType = keyof typeof icons;

export type SVGIconProps = {
  /**
   * Size in pixels of the square icon
   */
  size?: number;

  /**
   * Some additional class names to apply to the icon
   */
  className?: string;
};
