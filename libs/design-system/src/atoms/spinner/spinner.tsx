import { cn } from '../..';

type SpinnerProps = {
  /**
   * Some additional class name.
   */
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={cn('plasmo-flex plasmo-justify-center', className)}>
      <div className="plasmo-inline-block plasmo-h-8 plasmo-w-8 plasmo-animate-spin plasmo-rounded-full plasmo-border-2 plasmo-border-solid plasmo-border-current plasmo-border-r-transparent plasmo-align-[-0.125em]" />
    </div>
  );
};
