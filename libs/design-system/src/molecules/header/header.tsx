import { ArrowRightOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

import { cn, Icon } from '../..';

type HeaderProps = {
  /**
   * Display or not the logout button
   */
  hasLogoutButton?: boolean;

  /**
   * Function to call when clicking on the logout button
   */
  logoutHandler?: () => void;

  /**
   * Display or not the close button
   */
  hasCloseButton?: boolean;

  /**
   * Function to call when clicking on the close button
   */
  closeHandler?: () => void;

  /**
   * Display or not the drag button
   */
  hasDragButton?: boolean;

  /**
   * Function to call when pressing the drag button
   */
  dragMouseDownHandler?: () => void;

  /**
   * Function to call when releasing the drag button
   */
  dragMouseUpHandler?: () => void;

  /**
   * Children of the header
   */
  children?: React.ReactNode;
};

export const Header = ({
  hasLogoutButton = false,
  hasCloseButton = false,
  hasDragButton = false,
  logoutHandler,
  closeHandler,
  dragMouseDownHandler,
  dragMouseUpHandler,
  children,
}: HeaderProps) => {
  const iconClass = 'plasmo-stroke-white hover:plasmo-stroke-white-transparent90';

  return (
    <div className="plasmo-sticky plasmo-top-0 plasmo-z-50">
      <div className="plasmo-relative plasmo-flex plasmo-flex-row plasmo-justify-center plasmo-items-center plasmo-bg-background-dark plasmo-w-full plasmo-h-14 plasmo-shadow-lg">
        <div className="plasmo-absolute plasmo-top-4 plasmo-left-4 plasmo-flex plasmo-justify-between plasmo-items-center plasmo-w-12">
          {hasCloseButton && (
            <button onClick={closeHandler}>
              {/* <Icon type="XMark" className={iconClass} /> */}
              <XMarkIcon className={cn('plasmo-h-5 plasmo-w-5', iconClass)} />
            </button>
          )}
          {hasDragButton && (
            <button
              onMouseDown={dragMouseDownHandler}
              onMouseUp={dragMouseUpHandler}
              className="plasmo-cursor-grab active:plasmo-cursor-grabbing">
              <Icon type="SixDots" className={iconClass} />
            </button>
          )}
        </div>
        {children}
        <div className="plasmo-absolute plasmo-top-4 plasmo-right-4">
          {hasLogoutButton && (
            <button onClick={logoutHandler}>
              {/* <Icon type="ArrowRightTray" className={iconClass} /> */}
              <ArrowRightOnRectangleIcon className={cn('plasmo-h-5 plasmo-w-5', iconClass)} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
