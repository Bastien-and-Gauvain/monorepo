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

  /**
   * The rotation of the icon (default: 0)
   */
  rotation?: 0 | 45 | 90 | 180;
} & SVGIconProps;

export const Icon = ({ type, className, color, size = 22, isSpinning = false, rotation = 0 }: IconProps) => {
  const SvgIconComponent = icons[type];

  return (
    <SvgIconComponent
      size={size}
      color={color}
      className={cn(className, isSpinning && 'plasmo-animate-spin', rotation && `plasmo-rotate-${rotation}`)}
    />
  );
};
