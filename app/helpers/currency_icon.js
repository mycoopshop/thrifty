module.exports = (currency) => {
  if (currency == 0) {
    return '<i class="fa fa-bitcoin"></i>'
  } else if (currency == 1) {
    return '<i class="fa fa-dollar"></i>'
  } else if (currency == 2) {
    return '<i class="fa fa-euro"></i>'
  } else {
    return '<i class="fa fa-bitcoin"></i>'
  }
}
