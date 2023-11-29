import { createElement, ReactNode } from 'react';

import './../../index.css';

import { cn } from '../../shared/classnames';

type HeadingProps = {
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
};

const headingsDesktop = {
  h1: 'plasmo-text-9 plasmo-font-semibold plasmo-leading-11 plasmo-uppercase',
  h2: 'plasmo-text-8 plasmo-font-semibold plasmo-leading-9 plasmo-tracking-widish',
  h3: 'plasmo-text-6 plasmo-leading-8',
  h4: '',
};

export const Heading = ({
  children,
  className = '',
  color = 'plasmo-text-black',
  type = 'h1',
  onClick,
  ...props
}: HeadingProps) => {
  return createElement(
    type,
    {
      className: cn('plasmo-antialiased', color, headingsDesktop[type], className),
      onClick,
      ...props,
    },
    children
  );
};

export const Heading1 = (p: HeadingProps) => <Heading type="h1" {...p} />;
export const Heading2 = (p: HeadingProps) => <Heading type="h2" {...p} />;
export const Heading3 = (p: HeadingProps) => <Heading type="h3" {...p} />;
