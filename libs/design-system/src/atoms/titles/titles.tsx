import { createElement, ReactNode } from 'react';

import './../../index.css';

import { cn } from '../../shared/classnames';

interface TitleProps {
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
   * The title type to use (default: `h1`)
   */
  type?: 'h1' | 'h2' | 'h3' | 'h4';

  /**
   * Tailwind color class to apply to the text (default: `text-black`)
   */
  color?: string;

  /**
   * A callback to detect clicks on the text (default: undefined)
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const headingsDesktop = {
  h1: 'text-15 leading-14 uppercase',
  h2: 'text-8 leading-10 tracking-widish',
  h3: 'text-6 leading-8',
  h4: '',
};

export const Title = ({
  children,
  className = '',
  color = 'text-black',
  type = 'h1',
  onClick,
  ...props
}: TitleProps) => {
  return createElement(
    type,
    {
      className: cn('antialiased', color, headingsDesktop[type], className),
      onClick,
      ...props,
    },
    children
  );
};

export const Heading1 = (p: TitleProps) => <Title type="h1" {...p} />;
export const Heading2 = (p: TitleProps) => <Title type="h2" {...p} />;
export const Heading3 = (p: TitleProps) => <Title type="h3" {...p} />;
