const validator = (schema, payload) => {
  const errors = schema.validate(payload);
  if (errors.length > 0) {
    return errors
      .map(e => ({[e.path]: e.message}))
      .reduce((acc, current) => ({...acc, ...current}), {})
    ;
  } else {
    return null;
  }
};

module.exports = validator;
