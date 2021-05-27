function instanceOf(left, right) {
  let proto = left.__proto__
  while (true) {
    if (proto === null) return false
    if (proto === right.prototype) {
      return true
    }
    proto = proto.__proto__
  }
}