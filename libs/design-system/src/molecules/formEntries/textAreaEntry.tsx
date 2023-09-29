import { TextAreaInput, TextAreaInputProps } from '../../atoms/inputs/textAreaInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

/**
 * The props for the TextEntry component.
 * It extends the TextInputProps and the LabelProps.
 * It's the combination of both.
 */
type TextEntryProps = LabelProps & TextAreaInputProps;

export const TextAreaEntry = ({
  inputId,
  placeholder,
  required,
  rows,
  handleChange,
  labelText,
  className,
  value,
}: TextEntryProps) => {
  return (
    <div className="flex flex-col">
      <BaseLabel inputId={inputId} labelText={labelText} />
      <TextAreaInput
        inputId={inputId}
        placeholder={placeholder}
        rows={rows}
        handleChange={handleChange}
        required={required}
        className={className}
        value={value}
      />
    </div>
  );
};
