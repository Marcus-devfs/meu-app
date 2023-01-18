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

  export const randomColor = (color) => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)
     