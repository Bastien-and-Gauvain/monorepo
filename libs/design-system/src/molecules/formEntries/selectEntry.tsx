import { SelectInput, SelectInputProps } from '../../atoms/inputs/selectInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

/**
 * The props for the SelectEntry component.
 * It extends the SelectInputProps and the LabelProps.
 * It's the combination of both.
 */
type SelectEntryProps = LabelProps & SelectInputProps;

export const SelectEntry = ({ id, handleChange, options, labelText, value, className }: SelectEntryProps) => {
  return (
    <div className="plasmo-flex plasmo-flex-col">
      <BaseLabel inputId={id} labelText={labelText} />
      <SelectInput id={id} options={options} handleChange={handleChange} className={className} value={value} />
    </div>
  );
};
