export function UserNewValidator(values, props) {
  const errors = {};
  if(!values.first_name) {
    errors.first_name = 'Required';
  }
  if(!values.last_name) {
    errors.last_name = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if(values.tel_num) {
    if(!/\d{9}/.test(values.tel_num)) {
      errors.tel_num = 'Phone must match the form "111222333"'
    }
  }
  if(!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 8) {
    errors.password = 'Password is too short (8 characters min.)'
  }
  if(!values.password_confirmation || values.password_confirmation != values.password) {
    errors.password_confirmation = 'Does not match password';
  }
  return errors;
}
