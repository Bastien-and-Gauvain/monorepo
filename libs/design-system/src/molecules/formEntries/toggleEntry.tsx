import { ToggleInput, ToggleInputProps } from '../../atoms/inputs/toggleInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

/**
 * The props for the Toggle Entry component.
 * It extends the ToggleInputProps and the LabelProps.
 * It's the combination of both.
 */
type ToggleEntryProps = LabelProps & ToggleInputProps;

export const ToggleEntry = ({ options, checked, inputId, handleChange, labelText, className }: ToggleEntryProps) => {
  return (
    <div className="plasmo-flex plasmo-justify-between">
      <BaseLabel inputId={inputId} labelText={labelText} className="plasmo-me-2" />
      <ToggleInput
        options={options}
        checked={checked}
        inputId={inputId}
        handleChange={handleChange}
        className={className}
      />
    </div>
  );
};
