export default async function filtro(month) {
    let dataSelect = { date_start: '', date_finished: '' }
    if (month == 'janeiro') {
        
        return dataSelect = {
            date_start: '01/01/2023',
            date_finished: '31/01/2023'
        }
    }
    if (month == 'fevereiro') {
        return dataSelect = {
            date_start: '01/02/2023',
            date_finished: '31/02/2023'
        }
    }
    return;
} 