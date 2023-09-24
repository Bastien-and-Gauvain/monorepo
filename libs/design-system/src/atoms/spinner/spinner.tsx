import { cn } from '../..';

type SpinnerProps = {
  /**
   * Some additional class name.
   */
  className?: string;
};

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <div className={cn('flex justify-center', className)}>
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em]" />
    </div>
  );
};
