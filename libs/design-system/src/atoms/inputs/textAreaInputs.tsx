import { cn } from '../../shared/classnames';

export type TextAreaInputProps = {
  /**
   * The id of the input.
   */
  inputId: string;

  /**
   * Whether the input is required or not.
   * It's false by default.
   */
  required?: boolean;

  /**
   * The placeholder of the input.
   */
  placeholder?: string;

  /**
   * The initial value of the input.
   */
  rows?: number;

  /**
   * Some additional class names.
   */
  className?: string;

  /**
   * The function that handles the change of the input.
   */
  handleChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

  /**
   * The value of the input.
   */
  value?: string;
};

export const TextAreaInput = ({
  inputId,
  required,
  placeholder = 'Type something...',
  rows = 3,
  className,
  handleChange,
  value,
}: TextAreaInputProps) => {
  return (
    <textarea
      required={required}
      id={inputId}
      name={inputId}
      className={cn(
        'plasmo-antialiased plasmo-resize-none plasmo-text-grey-light plasmo-bg-grey-transparent plasmo-border plasmo-border-solid plasmo-border-grey-transparent plasmo-rounded-md plasmo-w-full plasmo-p-2 focus:plasmo-outline-none focus:plasmo-border-main',
        className
      )}
      placeholder={placeholder}
      rows={rows}
      onChange={handleChange}
      value={value}
    />
  );
};
