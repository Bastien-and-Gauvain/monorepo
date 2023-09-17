import { cn } from '../../shared/classnames';

type ParagraphProps = {
  type?: 'sm' | 'base' | 'lg';
  alignment?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
};

const fontSizeMapping = {
  sm: 'text-3.5',
  base: 'text-4',
  lg: 'text-5',
};

const aligmentMapping = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const Paragraph = ({ type = 'base', alignment = 'left', className, children }: ParagraphProps) => {
  return (
    <p className={cn('antialiased', 'text-gray', fontSizeMapping[type], aligmentMapping[alignment], className)}>
      {children}
    </p>
  );
};

export const SmallParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="sm" {...p} />;
export const BaseParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="base" {...p} />;
export const LargeParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="lg" {...p} />;
