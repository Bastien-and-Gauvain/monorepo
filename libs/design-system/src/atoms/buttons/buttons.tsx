import { ReactNode } from 'react';

import './../../index.css';

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
  type?: 'primary' | 'secondary';

  /**
   * A callback to detect clicks on the text (default: undefined)
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const typeSpecificClasses = {
  primary: 'plasmo-px-4 plasmo-py-2 plasmo-rounded-md plasmo-text-5',
  secondary: 'plasmo-px-2 plasmo-py-1 plasmo-rounded plasmo-text-3',
};

const Button = ({ children, type = 'primary', className, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        'plasmo-text-white plasmo-bg-ocean-blue plasmo-shadow-lg plasmo-shadow-grey-light plasmo-hover:bg-green plasmo-transition-colors plasmo-duration-300 plasmo-ease-in-out',
        typeSpecificClasses[type],
        className
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonPrimary = (p: ButtonProps) => <Button {...p} />;
export const ButtonSecondary = (p: Omit<ButtonProps, 'type'>) => <Button type="secondary" {...p} />;
