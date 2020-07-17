const filterArt = (val, retain = 100) => {
  if (String(val).length <= 100) return val
  const str = String(val)
  const art = str.slice(0, retain) + '...'
  return art
}
const filterDate = (val) => {
  // 将时间戳转为年月日时分秒
  const date = new Date(val)
  return date.getFullYear() + '年' +
        ((date.getMonth() + 1)).toString().padStart(2, 0) + '月' +
        (date.getDate()).toString().padStart(2, 0) + '日' +
        (date.getHours()).toString().padStart(2, 0) + ':' +
        (date.getMinutes()).toString().padStart(2, 0) + ':' +
        (date.getSeconds()).toString().padStart(2, 0)
}
export { filterArt, filterDate }
