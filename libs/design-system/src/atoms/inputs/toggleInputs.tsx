import { cn } from '../../shared/classnames';

export type ToggleInputProps = {
  /**
   * Labels associated to both states of the input.
   */
  labels: {
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

export const ToggleInput = ({ labels, checked = false, inputId, className, handleChange }: ToggleInputProps) => {
  return (
    <div className="flex space-x-4 w-36">
      <input
        className={cn(
          "mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-ocean-blue before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-neutral-300 before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-cyan checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]",
          className
        )}
        type="checkbox"
        role="switch"
        id={inputId}
        checked={checked}
        onChange={handleChange}
      />
      <label className="inline-block pl-[0.15rem] hover:cursor-pointer" htmlFor={inputId}>
        {labels[checked ? 'checked' : 'unchecked']}
      </label>
    </div>
  );
};
