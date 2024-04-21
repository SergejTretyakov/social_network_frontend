// Адаптированная версия библиотеки Zod(для валидации) для Prismane
// Функция `p` принимает два параметра: `value` и `validator`
// `value` может быть любого типа
// `validator` ожидает метод `safeParse`

const p = (value: any, validator: any) => {
    // Вызывает метод `safeParse` объекта `validator` с `value` в качестве аргумента
    const result = validator.safeParse(value);
  
    // Если разбор не был успешным, возвращает первое сообщение об ошибке
    if (!result.success) {
      return result.error.errors[0].message;
    }
  
    // Если разбор был успешным, возвращает null
    return null;
  };

export default p;