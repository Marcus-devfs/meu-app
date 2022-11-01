
const emailValidator = (email) => {
    const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*'+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return EMAIL_REGEX.test(email)
}

export const beforeLogin = (login) => {

    const { email, password } = login;

    (!email) ?
        alert("O campo 'E-mail' é obrigatório") :
        (!emailValidator(email)) && alert("O e-mail digitado está incorreto")

            (!password) && alert("O campo 'Senha' é obrigatório")

    return true
}

// export const beforeForgot = (email) => {

//     if (!email) {
//         alert("O campo 'E-mail' é obrigatório")
//         return false
//     }
//     if (!emailValidator(email)) {
//         alert("O e-mail digitado é inválido")
//         return false
//     }

//     return true
// }

export const beforeCreateAccount = (userData) => {

    const { name, email, password, confirmpassword } = userData;
    console.log(userData, 'beforeAcount-validators')

    (!name) && alert("O campo 'Nome' é obrigatório");
    (!email) ? alert("O campo 'E-mail' é obrigatório") :
        (!emailValidator(email)) && alert("O e-mail digitado está incorreto");
    (!password) && alert("O campo 'Senha' é obrigatório");
    (password !== confirmpassword) && alert('As senhas não conferem! Verifique e tente novamente');

    return userData
}

export const beforeUserDataUpdate = (userData) => {

    const { name, email } = userData;

    (!name) && alert("O campo 'Nome' é obrigatório");
    (!email) ? alert("O campo 'E-mail' é obrigatório") :
    (!emailValidator(email)) && alert("O e-mail digitado está incorreto");

    return { name, email }
}
