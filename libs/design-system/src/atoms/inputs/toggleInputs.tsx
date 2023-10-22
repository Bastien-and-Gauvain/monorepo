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
          "plasmo-mr-2 plasmo-mt-[0.3rem] plasmo-h-3.5 plasmo-w-8 plasmo-appearance-none plasmo-rounded-[0.4375rem] plasmo-bg-ocean-blue plasmo-before:pointer-events-none plasmo-before:absolute plasmo-before:h-3.5 plasmo-before:w-3.5 plasmo-before:rounded-full plasmo-before:bg-neutral-300 plasmo-before:content-[''] plasmo-after:absolute plasmo-after:z-[2] plasmo-after:-mt-[0.1875rem] plasmo-after:-ml-[0.1875rem] plasmo-after:h-5 plasmo-after:w-5 plasmo-after:rounded-full plasmo-after:border-none plasmo-after:bg-white plasmo-after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] plasmo-after:transition-[background-color_0.2s,transform_0.2s] plasmo-after:content-[''] plasmo-checked:bg-cyan plasmo-checked:after:absolute plasmo-checked:after:z-[2] plasmo-checked:after:-mt-[3px] plasmo-checked:after:ml-[1.0625rem] plasmo-checked:after:h-5 plasmo-checked:after:w-5 plasmo-checked:after:rounded-full plasmo-checked:after:border-none plasmo-checked:after:bg-primary plasmo-checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] plasmo-checked:after:transition-[background-color_0.2s,transform_0.2s] plasmo-checked:after:content-[''] plasmo-hover:cursor-pointer plasmo-focus:outline-none plasmo-focus:ring-0 plasmo-focus:before:scale-100 plasmo-focus:before:opacity-[0.12] plasmo-focus:before:shadow-[-1px_-1px_0px_13px_rgba(0,0,0,0.6)] plasmo-focus:before:transition-[box-shadow_0.2s,transform_0.2s] plasmo-focus:after:absolute plasmo-focus:after:z-[1] plasmo-focus:after:block plasmo-focus:after:h-5 plasmo-focus:after:w-5 plasmo-focus:after:rounded-full plasmo-focus:after:content-[''] plasmo-checked:focus:border-primary plasmo-checked:focus:bg-primary plasmo-checked:focus:before:ml-[1.0625rem] plasmo-checked:focus:before:scale-100 plasmo-checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] plasmo-checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]",
          className
        )}
        type="checkbox"
        role="switch"
        id={inputId}
        checked={checked}
        onChange={handleChange}
      />
      <label className="plasmo-inline-block plasmo-pl-[0.15rem] plasmo-hover:cursor-pointer" htmlFor={inputId}>
        {options[checked ? 'checked' : 'unchecked']}
      </label>
    </div>
  );
};
