import React from 'react';
import { FieldRenderProps} from 'react-final-form';
import { FormFieldProps,Label,Form } from 'semantic-ui-react';

interface IProps
  //HTMLInputElement I Remove This
  extends FieldRenderProps<string>,
    FormFieldProps {}

const TextInput: React.FC<IProps> = ({
  input,
  width,
  rows,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea rows={rows} {...input} placeholder={placeholder} />
      {touched && error && (
        <Label basic color='red'>
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TextInput;
