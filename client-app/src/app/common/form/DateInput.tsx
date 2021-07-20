import React, { useState } from "react";
import { FieldRenderProps } from "react-final-form";
import {  DateLocalizer, DatePicker, Localization} from "react-widgets";
import { FormFieldProps, Label, Form } from "semantic-ui-react";

interface IProps
  //HTMLInputElement I Remove This
  extends FieldRenderProps<Date>,
    FormFieldProps {}

const DateInput: React.FC<IProps> = ({
  input,
  width,
  placeholder,
  meta: { touched, error }
}) => {
  const Locales = [
    {
      label: "Persian: FA",
      culture: "fa",
      firstOfWeek: 0,
    }]
  
  const [current, setCurrent] = useState(Locales[0]);
  return (
    <Form.Field error={touched && !!error} width={width}>
     
       <DatePicker
          placeholder={placeholder}
          value={input.value || null}
          onChange={input.onChange}
          onBlur={input.onBlur}
          onKeyDown={(e)=>e.preventDefault()}
        />
   
      {touched && error && (
        <Label basic color="red">
          {error}
        </Label>
      )}
    </Form.Field>
  );
};

export default DateInput;
