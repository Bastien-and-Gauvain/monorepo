import { ReactNode } from 'react';

import './../../index.css';

import { Icon } from '..';
import { cn } from '../../shared/classnames';

type ButtonProps = {
  /**
   * Children elements
   */
  children?: ReactNode;

  /**
   * The className to apply to the text. This will override any built-in style.
   *
   * this is useful for layout positioning, responsive sizing, and for any stylistic
   * exception that is not part of our design system (eg. a specific size used only once)
   */
  className?: string;

  /**
   * The button type to use (default: `primary`)
   */
  type?: 'primary' | 'secondary' | 'icon';

  /**
   * A callback to detect clicks on the text (default: undefined)
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;

  /**
   * Whether the button is loading (default: false)
   */
  isLoading?: boolean;
};

const typeSpecificClasses = {
  primary:
    'plasmo-w-full plasmo-bg-main plasmo-text-lg plasmo-leading-5 plasmo-font-semibold plasmo-antialiased hover:plasmo-bg-main-600 active:plasmo-bg-main-700',
  icon: 'plasmo-bg-grey-light hover:plasmo-bg-grey-medium active:plasmo-bg-grey-dark',
  secondary:
    'plasmo-bg-main plasmo-px-2 plasmo-py-1 plasmo-rounded plasmo-text-3 hover:plasmo-bg-main-600 active:plasmo-bg-main-700',
};

const Button = ({ children, type = 'primary', className, onClick, isLoading = false }: ButtonProps) => {
  return (
    <button
      className={cn(
        className,
        typeSpecificClasses[type],
        'plasmo-text-white-transparent90 plasmo-px-8 plasmo-py-4 plasmo-rounded-md plasmo-flex plasmo-justify-center plasmo-items-center'
      )}
      onClick={onClick}>
      {isLoading ? (
        <Icon type="Spinner" isSpinning={true} size={20} className="plasmo-fill-white-transparent90" />
      ) : (
        children
      )}
    </button>
  );
};

export const ButtonPrimary = (p: ButtonProps) => <Button {...p} />;
export const ButtonIcon = (p: Omit<ButtonProps, 'type'>) => <Button type="icon" {...p} />;
export const ButtonSecondary = (p: Omit<ButtonProps, 'type'>) => <Button type="secondary" {...p} />;
