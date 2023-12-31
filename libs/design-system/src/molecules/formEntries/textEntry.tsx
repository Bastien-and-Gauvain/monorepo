import { TextInput, TextInputProps } from '../../atoms/inputs/textInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

/**
 * The props for the TextEntry component.
 * It extends the TextInputProps and the LabelProps.
 * It's the combination of both.
 */
type TextEntryProps = LabelProps & TextInputProps;

export const TextEntry = ({
  inputId,
  placeholder,
  required,
  initialValue,
  handleChange,
  labelText,
  className,
}: TextEntryProps) => {
  return (
    <div className="plasmo-flex plasmo-flex-col">
      <BaseLabel inputId={inputId} labelText={labelText} />
      <TextInput
        inputId={inputId}
        placeholder={placeholder}
        initialValue={initialValue}
        handleChange={handleChange}
        required={required}
        className={className}
      />
    </div>
  );
};
