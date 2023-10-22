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
        'plasmo-antialiased plasmo-text-gray plasmo-border plasmo-border-solid plasmo-border-gray plasmo-rounded-md plasmo-w-full plasmo-p-2 plasmo-focus:outline-none plasmo-focus:border-cyan',
        className
      )}
      placeholder={placeholder}
      rows={rows}
      onChange={handleChange}
      value={value}
    />
  );
};
