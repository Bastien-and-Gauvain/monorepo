import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { cn, Header, Logo } from '../..';
import { LogoBubble } from '../LogoBubble';

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
   * Call back on the open floating bubble
   */
  onOpenCallback?: () => void;

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
  onOpenCallback,
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
  const [sidePanelLeftPosition, setSidePanelLeftPosition] = useState<number>(window.innerWidth - 356);
  const [iframeLeftPosition, setIframeLeftPosition] = useState<number>(window.innerWidth - 356);
  const [iframeTopPosition, setIframeTopPosition] = useState<number>(10);
  const [isDragMouseDown, setIsDragMouseDown] = useState(false);

  const iframeRoot = contentRef?.contentWindow?.document?.body;
  const iframeHead = contentRef?.contentWindow?.document?.head;

  const fitIframePosition = () => {
    if (isOpen) {
      setIframeLeftPosition(Math.min(Math.max(10, sidePanelLeftPosition), window.innerWidth - 356));
      setIframeTopPosition(10);
      return;
    }

    setIframeLeftPosition(window.innerWidth - 116);
    setIframeTopPosition(100);
    return;
  };

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

  useEffect(() => {
    fitIframePosition();
  });

  window.onresize = fitIframePosition;

  const openContent = (
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
      <div className={cn('plasmo-p-4 plasmo-min-h-[calc(100%-3.5rem)] plasmo-bg-background-light', className)}>
        {children}
      </div>
    </>
  );

  const closeContent = <LogoBubble onClick={onOpenCallback} />;

  return (
    <iframe
      id={id}
      // All the classes applied to the iFrame are potentially impacted by the page CSS where the iFrame is injected
      // Ex: w-96 might be smaller or bigger depending on font-size of the page (as we're using rem)
      // To avoid this, we're using fixed width and height
      // However, this remains true for breakpoints or default tailwind classes
      className={cn(
        'plasmo-fixed plasmo-top-3 plasmo-h-[calc(100%-1.5rem)] plasmo-bg-transparent plasmo-z-10 plasmo-w-[346px] plasmo-drop-shadow-3xl plasmo-overflow-scroll plasmo-rounded-md'
      )}
      style={{
        left: `${iframeLeftPosition}${iframeLeftPosition && 'px'}`,
        top: `${iframeTopPosition}${iframeTopPosition && 'px'}`,
      }}
      ref={setContentRef}>
      {iframeHead && createPortal(head, iframeHead)}
      {iframeRoot && createPortal(isOpen ? openContent : closeContent, iframeRoot)}
    </iframe>
  );
};
