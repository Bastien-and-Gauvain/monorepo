import { cn } from '../../shared/classnames';

export type TextInputProps = {
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
  initialValue?: string;

  /**
   * Some additional class names.
   */
  className?: string;

  /**
   * The function that handles the change of the input.
   */
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const TextInput = ({
  inputId,
  required,
  placeholder = 'Type something...',
  initialValue,
  className,
  handleChange,
}: TextInputProps) => {
  return (
    <input
      type="text"
      required={required}
      id={inputId}
      name={inputId}
      className={cn(
        'plasmo-antialiased plasmo-text-gray plasmo-border plasmo-border-solid plasmo-border-gray plasmo-rounded-md plasmo-w-full plasmo-p-2 focus:plasmo-outline-none focus:plasmo-border-cyan',
        className
      )}
      placeholder={placeholder}
      value={initialValue}
      onChange={handleChange}
    />
  );
};
