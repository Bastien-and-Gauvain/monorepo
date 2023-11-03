import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

import { cn } from '../../shared/classnames';

type SelectOptionsProps = {
  /**
   * The id of the option.
   */
  id: string;

  /**
   * The label of the option.
   */
  label: string;

  /**
   * The value of the option.
   */
  value: string;
};

export type SelectInputProps = {
  /**
   * The id of the input.
   * It's also used as the name of the input.
   * It's also used as the label of the input.
   */
  id: string;

  /**
   * The initial value.
   * It's the first option by default.
   */
  value?: string;

  /**
   * Some additional class name.
   */
  className?: string;

  /**
   * The function that handles the change of the input.
   */
  handleChange: (value: string) => void;

  /**
   * The options of the input. It's an array of options to put in the dropdown select of type OptionProps.
   */
  options: SelectOptionsProps[];
};

export const SelectInput = ({ id, value, className, handleChange, options }: SelectInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(value);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    handleChange(value);
    setIsOpen(false);
  };

  return (
    <div className={cn('plasmo-relative', className)} id={id}>
      <div
        className={cn(
          'plasmo-antialiased plasmo-inline-flex plasmo-items-center plasmo-justify-between plasmo-text-grey-light plasmo-bg-grey-transparent plasmo-border plasmo-border-solid plasmo-border-grey-transparent plasmo-w-full plasmo-p-2 focus:plasmo-outline-none focus:plasmo-border-main plasmo-rounded-md plasmo-shadow-sm plasmo-cursor-pointer',
          isOpen && 'plasmo-border-main plasmo-shadow-lg'
        )}
        onClick={toggleDropdown}>
        <span>{selectedOption}</span>
        <ChevronDownIcon className="plasmo-h-4 plasmo-w-4" />
      </div>
      {isOpen && (
        <ul className="plasmo-absolute plasmo-left-0 plasmo-w-full plasmo-mt-1 plasmo-overflow-auto plasmo-bg-white plasmo-border plasmo-border-grey-transparent plasmo-rounded-md plasmo-shadow-lg plasmo-max-h-60 plasmo-focus:outline-none plasmo-z-50">
          {options.map(({ id, value, label }) => (
            <li
              key={id}
              className="plasmo-text-grey-medium plasmo-p-2 plasmo-cursor-pointer hover:plasmo-bg-grey-transparent"
              onClick={() => handleOptionClick(value)}>
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
