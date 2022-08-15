function filterFields(body, permittedFields) {
  const filteredBody = {};

  for (const permittedField of permittedFields) {
    filteredBody[permittedField] = body[permittedField];
  }

  return filteredBody;
}

module.exports = filterFields;
