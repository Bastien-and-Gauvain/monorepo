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
  sm: 'plasmo-text-3.5',
  base: 'plasmo-text-4',
  lg: 'plasmo-text-5',
};

const alignmentMapping = {
  left: 'plasmo-text-left',
  center: 'plasmo-text-center',
  right: 'plasmo-text-right',
};

const Paragraph = ({ type = 'base', alignment = 'left', className, children }: ParagraphProps) => {
  return (
    <p
      className={cn(
        'plasmo-antialiased',
        'plasmo-text-gray',
        fontSizeMapping[type],
        alignmentMapping[alignment],
        className
      )}>
      {children}
    </p>
  );
};

export const SmallParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="sm" {...p} />;
export const BaseParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="base" {...p} />;
export const LargeParagraph = (p: Omit<ParagraphProps, 'type'>) => <Paragraph type="lg" {...p} />;
