export function validateInn(inn) {
  if (!inn.trim()) return "Обязательное поле";
  if (!/^\d+$/.test(inn)) return "Введите корректные данные";
  if (inn.length !== 10) return "Введите корректные данные";
  return "";
}

export function validateDocsCount(value) {
  if (!value.trim()) return "Обязательное поле";
  const num = Number(value);
  if (!Number.isInteger(num) || num < 1 || num > 1000) {
    return "Введите число от 1 до 1000";
  }
  return "";
}

export function validateDates(dateFrom, dateTo) {
  const errors = { dateFrom: "", dateTo: "" };

  if (!dateFrom) errors.dateFrom = "Обязательное поле";
  if (!dateTo) errors.dateTo = "Обязательное поле";

  if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
    errors.dateFrom = "Дата начала не может быть позже даты конца";
    errors.dateTo = "Дата конца должна быть раньше даты начала";
  }

  return errors;
}

export function validateSearchForm(formData) {
  const innError = validateInn(formData.inn);
  const docsError = validateDocsCount(formData.docsCount);
  const dateErrors = validateDates(formData.dateFrom, formData.dateTo);

  return {
    inn: innError,
    docsCount: docsError,
    ...dateErrors,
  };
}
