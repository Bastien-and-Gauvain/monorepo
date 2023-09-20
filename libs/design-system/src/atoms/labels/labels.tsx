import { cn } from '../../shared/classnames';

export type LabelProps = {
  /**
   * A type to specify the size of the label (either small or regular).
   * Only impacts the font size
   */
  type?: 'sm' | 'base';

  /**
   * The id of the input the label is associated to.
   * That how it works in html: a component has an id,
   * and the label associated to that component has the smale id in its htmlFor attribute.
   */
  inputId?: string;

  /**
   * The content of the label another react node when it should only be a string.
   */
  children: React.ReactNode;

  /**
   * Some extra classes to apply to the label.
   */
  className?: string;
};

const fontSizeMapping = {
  sm: 'text-3.5',
  base: 'text-4',
};

const Label = ({ type = 'base', inputId, children, className }: LabelProps) => {
  return (
    <label htmlFor={inputId} className={cn('antialiased', 'text-gray', fontSizeMapping[type], className)}>
      {children}
    </label>
  );
};

export const SmallLabel = (p: LabelProps) => <Label type="sm" {...p} />;
export const BaseLabel = (p: LabelProps) => <Label type="base" {...p} />;
