export const formatDate = (datesArr, color) =>{
    let markedDay = {};
    datesArr.map((item) => {
      let date = item?.date ? item.date.split('T')[0] : item.dateString
      markedDay[date] = {
        selected: true,
        marked: true,
        selectedColor: color,
      };
    });
    console.log(markedDay)
    return markedDay
}


export const deleteFromObjectByVal = (obj, val) => {
  for (var key in obj) {
      if (obj[key] == val) delete obj[key];
  }
  return obj
}


export default {
    formatDate,
    deleteFromObjectByVal
}