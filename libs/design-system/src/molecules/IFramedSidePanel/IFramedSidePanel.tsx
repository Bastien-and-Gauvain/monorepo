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
   * Callback on the logout button
   */
  onLogoutCallback?: () => void;

  /**
   * Should the side panel have a close button?
   */
  hasCloseButton?: boolean;

  /**
   * Should the side panel have a translate button?
   */
  hasTranslateButton?: boolean;

  /**
   * Should the side panel have a logout button?
   */
  hasLogoutButton?: boolean;

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
  onCloseCallback,
  onLogoutCallback,
  hasCloseButton,
  hasTranslateButton,
  hasLogoutButton,
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
    <div className={cn('plasmo-p-4', className)}>
      {(hasCloseButton || hasTranslateButton) && (
        <div className="plasmo-flex plasmo-justify-between plasmo-mb-4">
          <div className="plasmo-flex plasmo-flex-row plasmo-space-x-3">
            {hasCloseButton && (
              <ButtonSecondary onClick={() => onCloseCallback && onCloseCallback()} className="plasmo-w-8">
                ⤬
              </ButtonSecondary>
            )}
            {hasTranslateButton && (
              <ButtonSecondary onClick={() => setIsRight(!isRight)} className="plasmo-w-8">
                ↔
              </ButtonSecondary>
            )}
          </div>
          {hasLogoutButton && (
            <ButtonSecondary onClick={() => onLogoutCallback && onLogoutCallback()}>Logout</ButtonSecondary>
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
        'plasmo-fixed plasmo-top-0 plasmo-min-h-full plasmo-w-[296px] plasmo-2xl:w-[396px] plasmo-bg-white plasmo-z-10 plasmo-shadow-2xl plasmo-overflow-scroll',
        isRight ? 'plasmo-right-0 plasmo-rounded-l-md' : 'plasmo-left-0 plasmo-rounded-r-md',
        isOpen ? '' : 'plasmo-hidden'
      )}
      ref={setContentRef}>
      {iframeHead && createPortal(head, iframeHead)}
      {iframeRoot && createPortal(content, iframeRoot)}
    </iframe>
  );
};
