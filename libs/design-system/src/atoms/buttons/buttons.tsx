import { ReactNode } from 'react'; // createElement,

import './../../index.css';

import { cn } from '../../shared/classnames';

interface ButtonProps {
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
}

const fontSizeOptions = {
  primary: 'text-5',
  secondary: 'text-3',
};

const borderRadiusOptions = {
  primary: 'rounded-md',
  secondary: 'rounded',
};

const paddingOptions = {
  primary: 'px-4 py-2',
  secondary: 'px-2 py-1',
};

const Button = ({ children, type = 'primary', className, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(
        'text-white bg-ocean-blue shadow-lg shadow-grey-light hover:bg-green transition-colors duration-300 ease-in-out',
        borderRadiusOptions[type],
        fontSizeOptions[type],
        paddingOptions[type],
        className
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonPrimary = (p: ButtonProps) => <Button {...p} />;
export const ButtonSecondary = (p: Omit<ButtonProps, 'type'>) => <Button type="secondary" {...p} />;
