import { SelectInput, SelectInputProps } from '../../atoms/inputs/selectInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

export type SelectEntryProps = LabelProps & SelectInputProps;

export const SelectEntry = ({ id, required, handleChange, options, children, className }: SelectEntryProps) => {
  return (
    <div className="flex flex-col">
      <BaseLabel inputId={id}>{children}</BaseLabel>
      <SelectInput id={id} options={options} handleChange={handleChange} required={required} className={className} />
    </div>
  );
};
