import { cn, Logo } from '../..';

type LoaderProps = {
  /**
   * Additional class name
   */
  className?: string;
};

export const Loader = ({ className }: LoaderProps) => {
  return <Logo className={cn(className, 'plasmo-animate-animate-loader plasmo-scale-150')} />;
};
