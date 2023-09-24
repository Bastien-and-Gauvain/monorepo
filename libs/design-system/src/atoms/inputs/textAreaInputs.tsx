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
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export const TextAreaInput = ({
  inputId,
  required,
  placeholder = 'Type something...',
  rows = 3,
  className,
  handleChange,
}: TextAreaInputProps) => {
  return (
    <textarea
      required={required}
      id={inputId}
      name={inputId}
      className={cn(
        'antialiased text-gray border border-solid border-gray rounded-md w-full p-2 focus:outline-none focus:border-cyan',
        className
      )}
      placeholder={placeholder}
      rows={rows}
      onChange={handleChange}
    />
  );
};
