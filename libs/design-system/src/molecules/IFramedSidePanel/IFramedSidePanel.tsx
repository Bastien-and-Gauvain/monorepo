import { ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import { ButtonSecondary, cn } from '../..';

type SidePanelProps = {
  /**
   * Is the side panel open?
   */
  isOpen: boolean;

  /**
   * Callback on the close button
   */
  onCloseCallback?: () => void;

  /**
   * Should the side panel have a close button?
   */
  hasCloseButton?: boolean;

  /**
   * Should the side panel have a translate button?
   */
  hasTranslateButton?: boolean;

  /**
   * The head of the iFrame, very useful to inject styles and tailwind
   */
  head?: ReactNode;

  /**
   * The content of the side panel
   */
  children: ReactNode;

  /**
   * The className of the side panel
   */
  className?: string;

  /**
   * The id of the side panel
   */
  id: string;
};

export const IFramedSidePanel = ({
  isOpen,
  onCloseCallback: onClose,
  hasCloseButton,
  hasTranslateButton,
  head,
  children,
  className,
  id,
}: SidePanelProps) => {
  const [isRight, setIsRight] = useState(true);
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);

  const iframeRoot = contentRef?.contentWindow?.document?.body;
  const iframeHead = contentRef?.contentWindow?.document?.head;

  const content = (
    <div className={cn('p-4', className)}>
      {(hasCloseButton || hasTranslateButton) && (
        <div className="flex flex-row space-x-3 mb-4">
          {hasCloseButton && (
            <ButtonSecondary onClick={onClose} className="relative top-0 left-0 w-8">
              ⤬
            </ButtonSecondary>
          )}
          {hasTranslateButton && (
            <ButtonSecondary onClick={() => setIsRight(!isRight)} className="relative top-0 left-0 w-8">
              ↔
            </ButtonSecondary>
          )}
        </div>
      )}
      {children}
    </div>
  );

  return (
    <iframe
      id={id}
      // All the classes applied to the iFrame are potentially impacted by the page CSS where the iFrame is injected
      // Ex: w-96 might be smaller or bigger depending on font-size of the page (as we're using rem)
      // To avoid this, we're using fixed width and height
      // However, this remains true for breakpoints or default tailwind classes
      className={cn(
        'fixed top-0 min-h-full w-[296px] xl:w-[396px] bg-white z-10 shadow-2xl overflow-scroll',
        isRight ? 'right-0 rounded-l-md' : 'left-0 rounded-r-md',
        isOpen ? '' : 'hidden'
      )}
      ref={setContentRef}>
      {iframeHead && createPortal(head, iframeHead)}
      {iframeRoot && createPortal(content, iframeRoot)}
    </iframe>
  );
};
