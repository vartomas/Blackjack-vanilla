const u = {
  hide: function (...args) {
    args.forEach(e => e.classList.add('hidden'))
  },
  unhide: function (...args) {
    args.forEach(e => e.classList.remove('hidden'))
  },
  toggleHidden: function(...args) {
    args.forEach(e => e.classList.toggle('hidden'))
  },
  displayNone: function(...args) {
    args.forEach(e => e.style.display = 'none')
  },
  displayBlock: function(...args) {
    args.forEach(e => e.style.display = 'block')
  },
  displayFlex: function(...args) {
    args.forEach(e => e.style.display = 'flex')
  },
  formatDate: function (date) {
    const fDate = new Date(date)
    const dd =
      String(fDate.getDate()).length === 1
        ? '0' + fDate.getDate()
        : fDate.getDate()
    const mm =
      String(fDate.getMonth() + 1).length === 1
        ? '0' + (fDate.getMonth() + 1)
        : fDate.getMonth() + 1
    const yy = fDate.getUTCFullYear()
    return `${dd}-${mm}-${yy}`
  },
  getFromLocal: function (target) {
    return JSON.parse(localStorage.getItem(target)) || []
  },
  updateLocal: function (target, data) {
    localStorage.setItem(target, JSON.stringify(data))
  },
}

export default u