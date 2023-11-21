import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";

const FormExample = () => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const schema = yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required().length(5),
  });

  return (
    <Formik
      initialValues={address}
      onSubmit={(values) => {
        console.log(values);
      }}
      validationSchema={schema}
    >
      <Form>
        <Field name="street" placeholder="Street" />
        <Field name="city" placeholder="City" />
        <Field name="state" placeholder="State" />
        <Field name="zip" placeholder="Zip" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormExample;
