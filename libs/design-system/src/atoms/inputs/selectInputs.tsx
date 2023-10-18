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
   * The type of the input.
   * It's 'primary' by default (big and white). "Secondary" is small and blue.
   */
  type?: 'primary' | 'secondary';

  /**
   * The id of the input.
   * It's also used as the name of the input.
   * It's also used as the label of the input.
   */
  id: string;

  /**
   * Whether the input is required or not.
   */
  required?: boolean;

  /**
   * The initial value.
   * It's the first option by default.
   */
  initialValue?: string;

  /**
   * The value of the input (to be controlled from outside the component)
   */
  value?: string;

  /**
   * Some additional class name.
   */
  className?: string;

  /**
   * The function that handles the change of the input.
   */
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;

  /**
   * The options of the input. It's an array of options to put in the dropdown select of type OptionProps.
   */
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
  initialValue,
  value,
  className,
  handleChange,
  options,
}: SelectInputProps) => {
  return (
    <select
      required={required}
      id={id}
      name={id}
      className={cn('antialiased border border-solid rounded-md p-2 focus:outline-none', variations[type], className)}
      onChange={handleChange}
      defaultValue={initialValue || options[0].value}
      value={value}>
      {options.map(({ id, value, label }) => (
        <option key={id} id={id} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};
