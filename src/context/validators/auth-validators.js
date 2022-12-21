
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


// export const beforeCreateAccount = (userData) => {

//     const { name, email, password, confirmpassword } = userData;
//     console.log(userData, 'beforeAcount-validators')

//     (!name) && alert("O campo 'Nome' é obrigatório");
//     (!email) ? alert("O campo 'E-mail' é obrigatório") :
//         (!emailValidator(email)) && alert("O e-mail digitado está incorreto");
//     (!password) && alert("O campo 'Senha' é obrigatório");
//     (password !== confirmpassword) && alert('As senhas não conferem! Verifique e tente novamente');

//     return true
// }

export const beforeUserDataUpdate = (userData) => {

    const { name, email } = userData;

    (!name) && alert("O campo 'Nome' é obrigatório");
    (!email) ? alert("O campo 'E-mail' é obrigatório") :
    (!emailValidator(email)) && alert("O e-mail digitado está incorreto");

    return { name, email }
}

export const formatDate = ({ date = null, birthday = false, showTime = false, showSeconds = true }) => {
    if (date) {
      let newTimestamp = new Date(date)

      if (!birthday) {
        let timezoneDifference = newTimestamp.getTimezoneOffset()
        newTimestamp.setTime(newTimestamp.getTime() - (timezoneDifference * 60 * 1000))
      }

      let splittedTimestamp = newTimestamp.toJSON().split('T')
      let formatDate = splittedTimestamp[0].split('-')
      let formatedTime = splittedTimestamp[1].split('.')
      formatDate = `${formatDate[2]}/${formatDate[1]}/${formatDate[0]}`
      formatedTime = formatedTime[0]

      if (!showSeconds) {
        let splittedTime = formatedTime.split(":")
        formatedTime = `${splittedTime[0]}:${splittedTime[1]}`
      }

      return showTime ? `${formatDate} às ${formatedTime}` : formatDate
    }
    return `-`
  }
