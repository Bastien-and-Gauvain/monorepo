import { TextInput, TextInputProps } from '../../atoms/inputs/textInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

export type TextEntryProps = LabelProps & TextInputProps;

export const TextEntry = ({
  inputId,
  placeholder,
  required,
  initialValue,
  handleChange,
  className,
}: TextEntryProps) => {
  return (
    <div className="flex flex-col">
      <BaseLabel inputId={inputId}>First Name</BaseLabel>
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
