import api from "../config/api"

export const createCategoriesDefault = async (idCategory) => {
    const categoryDefault = {
        categoryName: 'Alimentação', user_id: idCategory
    }
    await api.post('/categoryList/create', categoryDefault)
        .then(response => {
            const { data } = response
            console.log(data.msg)
        })
        .catch(error => {
            console.log(error.data)
        })
}

