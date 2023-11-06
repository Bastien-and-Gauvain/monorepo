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
  success: 'plasmo-bg-success plasmo-text-white-transparent90',
  info: 'plasmo-bg-info plasmo-text-white-transparent90',
  warning: 'plasmo-bg-pink plasmo-text-white-transparent90',
  error: 'plasmo-bg-error plasmo-text-white-transparent90',
};

const iconsMapping: Record<string, IconType> = {
  success: 'CheckCircle',
  info: 'InformationCircle',
  warning: 'ExclamationCircle',
  error: 'ExclamationCircle',
};

const Alert = ({ type = 'info', className, link, message }: AlertsProps) => {
  const alert = (
    <div
      className={cn(
        'plasmo-antialiased plasmo-space-x-3 plasmo-font-semibold plasmo-w-full plasmo-p-6 plasmo-leading-5 plasmo-rounded-md plasmo-flex plasmo-flex-row plasmo-items-center',
        colorMapping[type],
        className
      )}>
      <div>
        <Icon type={iconsMapping[type]} />
      </div>
      <p>{message}</p>
    </div>
  );
  return link ? (
    <a href={link} target="_blank" rel="noreferrer">
      {alert}
    </a>
  ) : (
    alert
  );
};

export const InfoAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="info" {...p} />;
export const SuccessAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="success" {...p} />;
export const WarningAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="warning" {...p} />;
export const ErrorAlert = (p: Omit<AlertsProps, 'type'>) => <Alert type="error" {...p} />;
