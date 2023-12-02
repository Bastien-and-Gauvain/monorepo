import { ReactNode } from 'react';

import './../../index.css';

import { cn } from '../../shared/classnames';

type CardProps = {
  /**
   * Title of the card
   */
  title: ReactNode;

  /**
   * The icon to use
   */
  icon: ReactNode;

  /**
   * The call to action to use, Button is expected
   */
  callToAction?: ReactNode;

  /**
   * The className to apply to the text. This will override any built-in style.
   *
   * this is useful for layout positioning, responsive sizing, and for any stylistic
   * exception that is not part of our design system (eg. a specific size used only once)
   */
  className?: string;

  /**
   * The card type to use
   */
  state: 'current' | 'next' | 'done';
};

export const Card = ({ title, icon, callToAction, className, state }: CardProps) => {
  return (
    <div
      className={cn(
        'plasmo-flex plasmo-flex-col plasmo-items-center plasmo-border-4 plasmo-rounded-xl plasmo-p-4 plasmo-w-[360px] plasmo-h-[360px] plasmo-shadow-md',
        !callToAction ? 'plasmo-justify-start plasmo-space-y-6' : 'plasmo-justify-between',
        state === 'current' ? 'plasmo-border-main-500' : '',
        state === 'next' ? 'plasmo-border-main-200' : '',
        state === 'done' ? 'plasmo-border-success' : '',
        className
      )}>
      {title}
      {icon}
      {callToAction}
    </div>
  );
};
