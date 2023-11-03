import { Icon } from '../..';
import { IconType } from '../../atoms/icons/svg';
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

const iconsMapping = {
  success: 'CheckCircle' as IconType,
  info: 'InformationCircle' as IconType,
  warning: 'ExclamationCircle' as IconType,
  error: 'ExclamationCircle' as IconType,
};

const Alert = ({ type = 'info', className, link, message }: AlertsProps) => {
  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'plasmo-antialiased plasmo-p-3 plasmo-rounded-md plasmo-flex plasmo-flex-row plasmo-items-center',
        colorMapping[type],
        className
      )}>
      <Icon type={iconsMapping[type]} className="plasmo-m-3" />
      <p>{message}</p>
    </a>
  ) : (
    <span
      className={cn(
        'plasmo-antialiased plasmo-p-3 plasmo-rounded-md plasmo-flex plasmo-flex-row plasmo-items-center',
        colorMapping[type],
        className
      )}>
      <Icon type={iconsMapping[type]} className="plasmo-m-3" />
      <p>{message}</p>
    </span>
  );
};

export const InfoAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="info" {...p} />;
export const SuccessAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="success" {...p} />;
export const WarningAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="warning" {...p} />;
export const ErrorAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="error" {...p} />;
