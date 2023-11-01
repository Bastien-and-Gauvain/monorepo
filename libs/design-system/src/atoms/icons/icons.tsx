import { cn } from '../..';
import { icons, IconType, SVGIconProps } from './svg';

type IconProps = {
  /**
   * The icon to use
   */
  type: IconType;

  /**
   * Whether the icon is spinning (default: false)
   */
  isSpinning?: boolean;
} & SVGIconProps;

export const Icon = ({ type, className, size = 22, isSpinning = false }: IconProps) => {
  const SvgIconComponent = icons[type];
  return <SvgIconComponent size={size} className={cn(className, isSpinning && 'plasmo-animate-spin')} />;
};
