// import { cn } from '../../shared/classnames';

import { TextInput, TextInputProps } from '../../atoms/inputs/textInputs';
import { BaseLabel, LabelProps } from '../../atoms/labels/labels';

export type TextEntryProps = LabelProps & TextInputProps;

export const TextEntry = ({ inputId, placeholder, required, initialValue, handleChange }: TextEntryProps) => {
  return (
    <div>
      <BaseLabel inputId={inputId}>First Name</BaseLabel>
      <TextInput
        inputId={inputId}
        placeholder={placeholder}
        initialValue={initialValue}
        handleChange={handleChange}
        required={required}
      />
    </div>
  );
};
