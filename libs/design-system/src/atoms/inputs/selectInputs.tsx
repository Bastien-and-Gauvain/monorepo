import { useRef } from 'react';

import { cn } from '../../shared/classnames';

export type SelectOptionsProps = {
  id: string;
  value: string;
};

export type SelectInputProps = {
  type?: 'primary' | 'secondary';
  id: string;
  required?: boolean;
  initialValueIndex?: number;
  className?: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: SelectOptionsProps[];
};

const variations = {
  primary: 'text-gray border-gray focus:border-cyan focus:ring-cyan w-full',
  secondary: 'text-3.5 text-white bg-ocean-blue border-ocean-blue focus:border-green focus:ring-green w-2/5',
};

export const SelectInput = ({
  type = 'primary',
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
        'border',
        'border-solid',
        'rounded-md',
        'p-2',
        'focus:outline-none',
        variations[type],
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
