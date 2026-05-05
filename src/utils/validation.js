export function validateInn(inn) {
  if (!inn.trim()) return "Обязательное поле";
  if (!/^\d+$/.test(inn)) return "Введите корректные данные";
  if (inn.length !== 10) return "Введите корректные данные";
  return "";
}

export function validateDocsCount(value) {
  if (!String(value).trim()) return "Обязательное поле";
  const num = Number(value);
  if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 1000) {
    return "Введите число от 1 до 1000";
  }
  return "";
}

export function validateDates(dateFrom, dateTo) {
  const errors = { dateFrom: "", dateTo: "" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!dateFrom) {
    errors.dateFrom = "Обязательное поле";
  } else if (new Date(dateFrom) > today) {
    errors.dateFrom = "Дата не может быть в будущем";
  }

  if (!dateTo) {
    errors.dateTo = "Обязательное поле";
  } else if (new Date(dateTo) > today) {
    errors.dateTo = "Дата не может быть в будущем";
  }

  if (dateFrom && dateTo && new Date(dateFrom) > new Date(dateTo)) {
    errors.dateFrom = "Дата начала не может быть позже даты конца";
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
