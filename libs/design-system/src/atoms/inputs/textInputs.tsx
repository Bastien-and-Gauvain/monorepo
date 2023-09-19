import { useRef } from 'react';

import { cn } from '../../shared/classnames';

export type TextInputProps = {
  inputId: string;
  required?: boolean;
  placeholder?: string;
  initialValue?: string;
  className?: string;
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
