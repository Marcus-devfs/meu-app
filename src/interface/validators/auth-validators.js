

const emailValidator = (email) => {
   const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*'+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
   return EMAIL_REGEX.test(email)
}

export const beforeLogin = (login) => {

   const { email, password } = login;

   (!email) ?
      alert({ error: "O campo 'E-mail' é obrigatório" }) :
      (!emailValidator(email)) && alert({ error: "O e-mail digitado está incorreto" })

         (!password) && alert({ error: "O campo 'Senha' é obrigatório" })

   return true
}

export const beforeForgot = (email) => {

   if(!email) {
      alert({ error: "O campo 'E-mail' é obrigatório" })
      return false
   }
   if(!emailValidator(email)) {
      alert({ error: "O e-mail digitado é inválido" })
      return false
   }

   return true
}

export const beforeCreateAccount = (userData) => {
   
   const { name, email, password } = userData;

   (!name) && alert({ error: "O campo 'Nome' é obrigatório" });
   (!email) ? alert({ error: "O campo 'E-mail' é obrigatório" }) :
      (!emailValidator(email)) && alert({ error: "O e-mail digitado está incorreto" });
   (!password) && alert({ error: "O campo 'Senha' é obrigatório" });

   return userData
}

export const beforeUserDataUpdate = (userData) => {

   const { name, email } = userData;
   
   (!name) && alert({ error: "O campo 'Nome' é obrigatório" });
   (!email) ? alert({ error: "O campo 'E-mail' é obrigatório" }) :
      (!emailValidator(email)) && alert({ error: "O e-mail digitado está incorreto" });

   return { name, email }
}

