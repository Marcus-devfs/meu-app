export default async function filtro(month) {
    let dataSelect = { date_start: '', date_finished: '' }
    if (month == 'Janeiro') {
        
        return dataSelect = {
            date_start: '01/01/2023',
            date_finished: '31/01/2023'
        }
    }
    if (month == 'Fevereiro') {
        return dataSelect = {
            date_start: '01/02/2023',
            date_finished: '31/02/2023'
        }
    }
    if (month == 'Março') {
        return dataSelect = {
            date_start: '01/03/2023',
            date_finished: '31/03/2023'
        }
    }
    if (month == 'Abril') {
        return dataSelect = {
            date_start: '01/04/2023',
            date_finished: '31/04/2023'
        }
    }
    if (month == 'Maio') {
        return dataSelect = {
            date_start: '01/05/2023',
            date_finished: '31/05/2023'
        }
    }
    if (month == 'Junho') {
        return dataSelect = {
            date_start: '01/06/2023',
            date_finished: '31/06/2023'
        }
    }
    if (month == 'Julho') {
        return dataSelect = {
            date_start: '01/07/2023',
            date_finished: '31/07/2023'
        }
    }
    if (month == 'Agosto') {
        return dataSelect = {
            date_start: '01/08/2023',
            date_finished: '31/08/2023'
        }
    }
    if (month == 'Setembro') {
        return dataSelect = {
            date_start: '01/09/2023',
            date_finished: '31/09/2023'
        }
    }
    if (month == 'Outubro') {
        return dataSelect = {
            date_start: '01/10/2023',
            date_finished: '31/10/2023'
        }
    }
    if (month == 'Novembro') {
        return dataSelect = {
            date_start: '01/11/2023',
            date_finished: '31/11/2023'
        }
    }
    if (month == 'Dezembro') {
        return dataSelect = {
            date_start: '01/12/2023',
            date_finished: '31/12/2023'
        }
    }

    return;
} 

export const listMonths = [
    {id: '01', month:'Janeiro'},
    {id: '02',month:'Fevereiro'},
    {id: '03',month:'Março'},
    {id: '04',month:'Abril'},
    {id: '05',month:'Maio'},
    {id: '06',month:'Junho'},
    {id: '07',month:'Julho'},
    {id: '08',month:'Setembro'},
    {id: '09',month:'Outubro'},
    {id: '10',month:'Novembro'},
    {id: '11',month:'Dezembro'},
]