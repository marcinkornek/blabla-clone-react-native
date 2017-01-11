export function RideValidator(values, props) {
  const errors = {};
  if (!values.start_city) {
    errors.start_city = 'Required';
  }
  if (!values.destination_city) {
    errors.destination_city = 'Required';
  }
  if (!values.places) {
    errors.places = 'Required';
  } else {
    if (isNaN(Number(values.places))) {
      errors.places = 'Must be a number'
    } else if (Number(values.places) < 1 || Number(values.places) > 50) {
      errors.places = 'Incorrect places number'
    }
  }
  if (!values.start_date) {
    errors.start_date = 'Required';
  }
  if (!values.car_id) {
    errors.car_id = 'Required';
  }
  if (!values.price) {
    errors.price = 'Required';
  }
  if (!values.currency) {
    errors.currency = 'Required';
  }
  return errors;
}
