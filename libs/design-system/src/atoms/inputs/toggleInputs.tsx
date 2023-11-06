import { useState } from 'react';

import { cn } from '../../shared/classnames';

export type ToggleInputProps = {
  /**
   * Options associated to both states of the input.
   */
  options: {
    checked: string;
    unchecked: string;
  };

  /**
   * An input ID
   */
  inputId: string;

  /**
   * Some additional class names.
   */
  className?: string;

  /**
   * The function that handles a boolean and returns nothing.
   */
  handleChange: (isChecked: boolean) => void;
};

export const ToggleInput = ({ options, inputId, className, handleChange }: ToggleInputProps) => {
  const [checkedState, setCheckedState] = useState<boolean>(false);

  const clickHandler = (isChecked: boolean) => {
    setCheckedState(isChecked);
    handleChange(isChecked);
  };

  return (
    <div
      className={cn(
        className,
        'plasmo-flex plasmo-rounded-md plasmo-flex-row plasmo-justify-around plasmo-space-x-1 plasmo-p-1 plasmo-items-center plasmo-w-full plasmo-bg-grey-transparent plasmo-border plasmo-border-solid plasmo-border-grey-transparent'
      )}
      id={inputId}>
      <button
        className={cn(
          'plasmo-p-2 plasmo-rounded-md plasmo-w-1/2',
          !checkedState && 'plasmo-bg-main plasmo-text-white-transparent90'
        )}
        onClick={() => clickHandler(false)}>
        {options['unchecked']}
      </button>
      <button
        className={cn(
          'plasmo-p-2 plasmo-rounded-md plasmo-w-1/2',
          checkedState && 'plasmo-bg-main plasmo-text-white-transparent90'
        )}
        onClick={() => clickHandler(true)}>
        {options['checked']}
      </button>
    </div>
  );
};
