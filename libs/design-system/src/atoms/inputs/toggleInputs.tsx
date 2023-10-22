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
   * Whether the component's checked or not.
   */
  checked?: boolean;

  /**
   * An input ID
   */
  inputId: string;

  /**
   * Some additional class names.
   */
  className?: string;

  /**
   * The function that handles the change of the input.
   */
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export const ToggleInput = ({ options, checked = false, inputId, className, handleChange }: ToggleInputProps) => {
  return (
    <div className="flex space-x-4 w-36">
      <input
        className={cn(
          "plasmo-mr-2 plasmo-mt-[0.3rem] plasmo-h-3.5 plasmo-w-8 plasmo-appearance-none plasmo-rounded-[0.4375rem] plasmo-bg-ocean-blue before:plasmo-pointer-events-none before:plasmo-absolute before:plasmo-h-3.5 before:plasmo-w-3.5 before:plasmo-rounded-full before:plasmo-bg-neutral-300 before:plasmo-content-[''] after:plasmo-absolute after:plasmo-z-[2] after:plasmo--mt-[0.1875rem] after:plasmo--ml-[0.1875rem] after:plasmo-h-5 after:plasmo-w-5 after:plasmo-rounded-full after:plasmo-border-none after:plasmo-bg-white after:plasmo-shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:plasmo-transition-[background-color_0.2s,transform_0.2s] after:plasmo-content-[''] checked:plasmo-bg-cyan checked:after:plasmo-absolute checked:after:plasmo-z-[2] checked:after:plasmo--mt-[3px] checked:after:plasmo-ml-[1.0625rem] checked:after:plasmo-h-5 checked:after:plasmo-w-5 checked:after:plasmo-rounded-full checked:after:plasmo-border-none checked:after:plasmo-bg-primary checked:after:plasmo-shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:plasmo-transition-[background-color_0.2s,transform_0.2s] checked:after:plasmo-content-[''] hover:plasmo-cursor-pointer focus:plasmo-outline-none focus:plasmo-ring-0 focus:before:plasmo-scale-100 focus:before:plasmo-opacity-[0.12] focus:before:plasmo-shadow-[-1px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:plasmo-transition-[box-shadow_0.2s,transform_0.2s] focus:plasmo-after:plasmo-absolute focus:plasmo-after:plasmo-z-[1] focus:plasmo-after:plasmo-block focus:plasmo-after:plasmo-h-5 focus:plasmo-after:plasmo-w-5 focus:plasmo-after:plasmo-rounded-full focus:plasmo-after:plasmo-content-[''] checked:focus:plasmo-border-primary checked:focus:plasmo-bg-primary checked:focus:before:plasmo-ml-[1.0625rem] checked:focus:before:plasmo-scale-100 checked:focus:before:plasmo-shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:plasmo-transition-[box-shadow_0.2s,transform_0.2s]",
          className
        )}
        type="checkbox"
        role="switch"
        id={inputId}
        checked={checked}
        onChange={handleChange}
      />
      <label className="plasmo-inline-block plasmo-pl-[0.15rem] plasmo-hover:plasmo-cursor-pointer" htmlFor={inputId}>
        {options[checked ? 'checked' : 'unchecked']}
      </label>
    </div>
  );
};
