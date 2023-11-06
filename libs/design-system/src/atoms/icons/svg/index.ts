import { ArrowPath } from './ArrowPath';
import { ArrowRightTray } from './ArrowRightTray';
import { CheckCircle } from './CheckCircle';
import { ChevronDown } from './ChevronDown';
import { ChevronLeftRight } from './ChevronLeftRight';
import { ExclamationCircle } from './ExclamationCircle';
import { InformationCircle } from './InformationCircle';
import { SixDots } from './SixDots';
import { Spinner } from './Spinner';
import { XMark } from './XMark';

export const icons = {
  Spinner,
  ArrowRightTray,
  InformationCircle,
  CheckCircle,
  ArrowPath,
  ChevronLeftRight,
  ChevronDown,
  XMark,
  ExclamationCircle,
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
