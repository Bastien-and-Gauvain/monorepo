import { cn } from '../../shared/classnames';

type ParagraphProps = {
  /**
   * The type of the paragraph.
   * It's 'base' by default.
   * It can also be 'sm' (small) or 'lg' (large).
   */
  type?: 'sm' | 'base' | 'lg';

  /**
   * The alignment of the paragraph.
   * It's 'left' by default.
   * It can also be 'center' or 'right'.
   */
  alignment?: 'left' | 'center' | 'right';

  /**
   * Some additional class name.
   */
  className?: string;

  /**
   * The children of the paragraph.
   */
  children: React.ReactNode;
};

const fontSizeMapping = {
  sm: 'text-3.5',
  base: 'text-4',
  lg: 'text-5',
};

const alignmentMapping = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const Paragraph = ({ type = 'base', alignment = 'left', className, children }: ParagraphProps) => {
  return (
    <p className={cn('antialiased', 'text-gray', fontSizeMapping[type], alignmentMapping[alignment], className)}>
      {children}
    </p>
  );
};

export const SmallParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="sm" {...p} />;
export const BaseParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="base" {...p} />;
export const LargeParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="lg" {...p} />;
