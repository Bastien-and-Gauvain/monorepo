import { useRef } from 'react';

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
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      type="text"
      required={required}
      id={inputId}
      name={inputId}
      className={cn(
        'antialiased',
        'text-gray',
        'border',
        'border-solid',
        'border-gray',
        'rounded-md',
        'w-full',
        'p-2',
        'focus:outline-none',
        'focus:border-cyan',
        className
      )}
      placeholder={placeholder}
      value={initialValue}
      ref={inputRef}
      onChange={handleChange}
    />
  );
};
