import axios from 'axios'
import env from '../../config/Environment';

const api = axios.create({
    baseURL: env.api.url
})

api.interceptors.request.use((config) => {
    return config
});

api.interceptors.response.use((res) => {
    const { status } = res

    if (status == 401) console.log('Nao autorizado')
    return Promise.resolve(res);
}, (error) => {

    const { response } = error
    const { status } = response

    console.log(error.response)
    if (status && status == 401) {
        console.log('Nao autorizado')
    }
    return Promise.reject(error)
});

export default api