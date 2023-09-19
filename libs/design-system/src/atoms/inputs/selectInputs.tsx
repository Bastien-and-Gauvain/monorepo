import { useRef } from 'react';

import { cn } from '../../shared/classnames';

export type SelectOptionsProps = {
  id: string;
  value: string;
};

export type SelectInputProps = {
  id: string;
  required?: boolean;
  initialValueIndex?: number;
  className?: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: SelectOptionsProps[];
};

export const SelectInput = ({
  id,
  required,
  initialValueIndex = 0,
  className,
  handleChange,
  options,
}: SelectInputProps) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  return (
    <select
      required={required}
      id={id}
      name={id}
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
        'focus:ring-cyan',
        className
      )}
      ref={inputRef}
      onChange={handleChange}>
      {options.map(({ id, value }, index) => (
        <option key={id} id={id} value={value} selected={index === initialValueIndex}>
          {value}
        </option>
      ))}
    </select>
  );
};
