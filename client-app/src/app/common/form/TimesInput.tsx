import React from "react";
import { FieldRenderProps } from "react-final-form";
import { TimeInput} from "react-widgets";
import { FormFieldProps, Label, Form } from "semantic-ui-react";

interface IProps
  extends FieldRenderProps<Date>,
    FormFieldProps {}

const TimesInput: React.FC<IProps> = ({
  input,
  width,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
       <TimeInput 
          value={input.value || null}
          onChange={input.onChange}
        />
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default TimesInput;
