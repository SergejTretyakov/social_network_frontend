export type RegisterErrors = {
    name?: string;
    surname?: string;
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    birthDate?: string;
    agreement?: string;
  };



const registerSchema = (data: any) => {

    const currDate = new Date();
    const errors: RegisterErrors = {}; //ошибки

    if (!(/^[A-ZА-Я][a-zа-я]{1,14}$/.test(data.name))) {
        errors.name = 'Имя должно начинаться с заглавной буквы(длина от 2 до 15)';
    }

    if (!(/^[А-ЯЁA-Z][a-zа-яё]{1,14}(?:-[А-ЯЁA-Z][a-zа-яё]{1,14})*$/.test(data.surname))) {
        errors.surname = 'Фамилия должна начинаться с заглавной буквы(длина от 2 до 15 или до 30 при двойной фамилии)';
    }

    if(!/\S+@\S+\.\S+/.test(data.email)){
        errors.email = 'Почта не соответствует формату';
    }

    if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(data.password)){
        errors.password = 'Пароль должен содержать минимум 8 символов, хотя бы одну заглавную и строчную буквы, цифру и спец символ';
    }

    if(data.confirmPassword !== data.password){
        errors.confirmPassword = 'Пароли не совпадают';
    }

    if (data.birthDate === ''){
        errors.birthDate = 'Поле обязательно для заполнения';
    }
    else
    {
        let date = new Date(data.birthDate);
            if(date > currDate){
                errors.birthDate = 'Дата рождения не может быть в будущем';
                console.log('Ошибка');
                console.log(data.birthDate);
            }
    }

    if(!data.agreement){
        errors.agreement = 'Необходимо согласие на обработку персональных данных';
    }

    return errors;
}

export default registerSchema;

