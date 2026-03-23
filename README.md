# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


## Кнопка «Поиск» — как активировать

Кнопка **«Поиск»** становится активной только после корректного заполнения обязательных полей формы.

### Необходимо заполнить:

1. **ИНН компании**

   * только цифры
   * ровно 10 символов

2. **Количество документов в выдаче**

   * число от 1 до 1000

3. **Диапазон поиска**

   * указать дату начала и дату конца
   * дата начала не должна быть позже даты конца

### Пример корректного ввода:

* ИНН: `1234567890`
* Количество документов: `100`
* Дата от: `2020-01-01`
* Дата до: `2020-12-31`

После заполнения всех полей кнопка **«Поиск»** станет активной.

---

Если одно из полей заполнено некорректно, кнопка останется неактивной, а поле будет подсвечено с ошибкой.
