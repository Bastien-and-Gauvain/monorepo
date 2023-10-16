import { SelectInput, SelectInputProps } from '../../atoms/inputs/selectInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

/**
 * The props for the SelectEntry component.
 * It extends the SelectInputProps and the LabelProps.
 * It's the combination of both.
 */
type SelectEntryProps = LabelProps & SelectInputProps;

export const SelectEntry = ({
  id,
  required,
  handleChange,
  options,
  labelText,
  selectedValue,
  className,
}: SelectEntryProps) => {
  return (
    <div className="flex flex-col">
      <BaseLabel inputId={id} labelText={labelText} />
      <SelectInput
        id={id}
        options={options}
        handleChange={handleChange}
        required={required}
        className={className}
        selectedValue={selectedValue}
      />
    </div>
  );
};
