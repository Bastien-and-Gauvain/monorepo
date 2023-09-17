import { cn } from '../../shared/classnames';

export type LabelProps = {
  type?: 'sm' | 'base';
  inputId?: string;
  children: React.ReactNode;
  className?: string;
};

const fontSizeMapping = {
  sm: 'text-3.5',
  base: 'text-4',
};

const Label = ({ type = 'base', inputId, children, className }: LabelProps) => {
  return (
    <label htmlFor={inputId} className={cn('antialiased', 'text-gray-600', fontSizeMapping[type], className)}>
      {children}
    </label>
  );
};

export const SmallLabel = (p: LabelProps) => <Label type="sm" {...p} />;
export const BaseLabel = (p: LabelProps) => <Label type="base" {...p} />;
