import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn, Header, Logo } from '../..';

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
   * Should the side panel have a drag button?
   */
  hasDragButton?: boolean;

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
  hasDragButton,
  hasLogoutButton,
  head,
  children,
  className,
  id,
}: SidePanelProps) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const [sidePanelLeftPosition, setSidePanelLeftPosition] = useState(window.innerWidth - 356);
  const [isDragMouseDown, setIsDragMouseDown] = useState(false);

  const iframeRoot = contentRef?.contentWindow?.document?.body;
  const iframeHead = contentRef?.contentWindow?.document?.head;

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      const iFrameRect = contentRef?.getBoundingClientRect();
      if (isDragMouseDown) {
        setSidePanelLeftPosition(e.clientX + (iFrameRect?.left || 0) - 54);
      }
    };

    const mouseUpHandler = () => {
      if (isDragMouseDown) {
        setIsDragMouseDown(false);
      }
    };

    contentRef?.contentDocument?.addEventListener('mousemove', mouseMoveHandler);
    contentRef?.contentDocument?.addEventListener('mouseup', mouseUpHandler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      window.removeEventListener('mouseup', mouseUpHandler);
      contentRef?.contentDocument?.removeEventListener('mouseup', mouseUpHandler);
      contentRef?.contentDocument?.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [contentRef, isDragMouseDown]);

  const content = (
    <>
      <Header
        hasCloseButton={hasCloseButton}
        closeHandler={onCloseCallback}
        hasLogoutButton={hasLogoutButton}
        logoutHandler={onLogoutCallback}
        hasDragButton={hasDragButton}
        dragMouseDownHandler={() => setIsDragMouseDown(true)}
        dragMouseUpHandler={() => setIsDragMouseDown(false)}>
        <Logo className="plasmo-fill-white" />
      </Header>
      <div className={cn('plasmo-p-4 plasmo-min-h-full plasmo-bg-background-light plasmo-overflow-scroll', className)}>
        {children}
      </div>
    </>
  );

  return (
    <iframe
      id={id}
      // All the classes applied to the iFrame are potentially impacted by the page CSS where the iFrame is injected
      // Ex: w-96 might be smaller or bigger depending on font-size of the page (as we're using rem)
      // To avoid this, we're using fixed width and height
      // However, this remains true for breakpoints or default tailwind classes
      className={cn(
        'plasmo-fixed plasmo-top-3 plasmo-h-[calc(100%-1.5rem)] plasmo-bg-transparent plasmo-w-[346px] plasmo-2xl:w-[396px] plasmo-z-10 plasmo-shadow-2xl plasmo-overflow-scroll plasmo-rounded-md',
        isOpen ? '' : 'plasmo-hidden'
      )}
      style={{ left: `${sidePanelLeftPosition}px` }}
      ref={setContentRef}>
      {iframeHead && createPortal(head, iframeHead)}
      {iframeRoot && createPortal(content, iframeRoot)}
    </iframe>
  );
};
