import { SelectInput, SelectInputProps } from '../../atoms/inputs/selectInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

type SelectEntryProps = LabelProps & SelectInputProps;

export const SelectEntry = ({ id, required, handleChange, options, labelText, className }: SelectEntryProps) => {
  return (
    <div className="flex flex-col">
      <BaseLabel inputId={id} labelText={labelText} />
      <SelectInput id={id} options={options} handleChange={handleChange} required={required} className={className} />
    </div>
  );
};
