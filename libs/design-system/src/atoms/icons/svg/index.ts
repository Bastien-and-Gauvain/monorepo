import { ArrowPath } from './ArrowPath';
import { ArrowUpTray } from './ArrowUpTray';
import { CheckCircle } from './CheckCircle';
import { ChevronUpDown } from './ChevronUpDown';
import { ExclamationCircle } from './ExclamationCircle';
import { InformationCircle } from './InformationCircle';
import { Spinner } from './Spinner';
import { XMark } from './XMark';

export const icons = {
  Spinner,
  ArrowUpTray,
  InformationCircle,
  CheckCircle,
  ArrowPath,
  ChevronUpDown,
  XMark,
  ExclamationCircle,
};

export type IconType = keyof typeof icons;

export type SVGIconProps = {
  /**
   * Size in pixels of the square icon
   */
  size?: number;

  /**
   * Color of the icon
   */
  color?: string;

  /**
   * Some additional class names to apply to the icon
   */
  className?: string;
};
