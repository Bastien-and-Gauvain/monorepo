import { cn } from '../../shared/classnames';

type AlertsProps = {
  /**
   * The type of alert to display
   * @default 'info'
   * But can be one of 'success' | 'info' | 'warning' | 'error'
   * Changing the type of alerts merely changes the color of the alert
   */
  type: 'success' | 'info' | 'warning' | 'error';

  /**
   * The message to display in the alert
   */
  message: string;

  /**
   * A link if we want the alert to be clickable
   */
  link?: string;

  /**
   * Some additional class names
   */
  className?: string;
};

const colorMapping = {
  success: 'plasmo-bg-green plasmo-text-grey',
  info: 'plasmo-bg-cyan plasmo-text-grey',
  warning: 'plasmo-bg-pink plasmo-text-grey',
  error: 'plasmo-bg-red plasmo-text-white',
};

const Alert = ({ type = 'info', className, link, message }: AlertsProps) => {
  if (link) {
    return (
      <a
        className={cn('plasmo-antialiased plasmo-p-4 plasmo-rounded-md', colorMapping[type], className)}
        href={link}
        target="_blank"
        rel="noreferrer">
        {message}
      </a>
    );
  } else {
    return (
      <p className={cn('plasmo-antialiased plasmo-p-4 plasmo-rounded-md', colorMapping[type], className)}>{message}</p>
    );
  }
};

export const InfoAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="info" {...p} />;
export const SuccessAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="success" {...p} />;
export const WarningAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="warning" {...p} />;
export const ErrorAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="error" {...p} />;
