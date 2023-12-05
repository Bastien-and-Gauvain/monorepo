import './../../index.css';

import { cn } from '../../shared/classnames';

type ProgressBarProps = {
  /**
   * The ratio of the progress bar. This should be a number between 1 and 100.
   */
  ratio: number;

  /**
   * The className to apply to the text. This will override any built-in style.
   *
   * this is useful for layout positioning, responsive sizing, and for any stylistic
   * exception that is not part of our design system (eg. a specific size used only once)
   */
  className?: string;
};

export const ProgressBar = ({ ratio, className }: ProgressBarProps) => {
  return (
    <div className={cn('plasmo-w-full plasmo-bg-grey-transparent plasmo-rounded-full plasmo-h-2.5', className)}>
      <div
        className={cn('plasmo-bg-main-500 plasmo-h-full plasmo-rounded-full plasmo-transition-width')}
        style={{ width: `${ratio}%` }}
      />
    </div>
  );
};
