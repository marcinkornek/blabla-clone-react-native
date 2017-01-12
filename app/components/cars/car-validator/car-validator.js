export function CarValidator(values, props) {
  const errors = {};
  if (!values.brand) {
    errors.brand = 'Required';
  }
  if (!values.model) {
    errors.model = 'Required';
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
  if (!values.production_year) {
    errors.production_year = 'Required';
  } else {
    if (isNaN(Number(values.production_year))) {
      errors.production_year = 'Must be a number'
    } else if (Number(values.production_year) < 1892 || Number(values.production_year) > new Date().getFullYear()) {
      errors.production_year = 'Incorrect production year'
    }
  }
  if (!values.color) {
    errors.color = 'Required';
  }
  if (!values.comfort) {
    errors.comfort = 'Required';
  }
  if (!values.category) {
    errors.category = 'Required';
  }
  return errors;
}
