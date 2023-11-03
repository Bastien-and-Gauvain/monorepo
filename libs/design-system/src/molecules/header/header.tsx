import { Icon } from '../..';

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
   * Display or not the translate button
   */
  hasTranslateButton?: boolean;

  /**
   * Function to call when clicking on the translate button
   */
  translateHandler?: () => void;

  /**
   * Children of the header
   */
  children?: React.ReactNode;
};

export const Header = ({
  hasLogoutButton = false,
  hasCloseButton = false,
  hasTranslateButton = false,
  logoutHandler,
  closeHandler,
  translateHandler,
  children,
}: HeaderProps) => {
  const iconClass = 'plasmo-stroke-white plasmo-cursor-pointer hover:plasmo-stroke-white-transparent90';

  return (
    <div className="plasmo-relative plasmo-flex plasmo-flex-row plasmo-justify-center plasmo-items-center plasmo-bg-background-dark plasmo-w-full plasmo-h-14 plasmo-shadow-lg">
      <div className="plasmo-absolute plasmo-top-4 plasmo-left-4 plasmo-flex plasmo-justify-between plasmo-items-center plasmo-w-12">
        {hasCloseButton && (
          <button onClick={closeHandler}>
            <Icon type="XMark" className={iconClass} />
          </button>
        )}
        {hasTranslateButton && (
          <button onClick={translateHandler}>
            <Icon type="ChevronLeftRight" className={iconClass} />
          </button>
        )}
      </div>
      {children}
      <div className="plasmo-absolute plasmo-top-4 plasmo-right-4">
        {hasLogoutButton && (
          <button onClick={logoutHandler}>
            <Icon type="ArrowRightTray" className={iconClass} />
          </button>
        )}
      </div>
    </div>
  );
};