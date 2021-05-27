function add(a, b, c) {
  return a + b + c
}
let partialAdd = partial(add, 1)
partialAdd(2, 3)

function partial(fn, ...args) {
  return (...arg) => {
    return fn(...args, ...arg)
  }
}


function clg(a, b, c) {
  console.log(a, b, c)
}
let partialClg = partial(clg, '_', 2)
partialClg(1, 3)  // 依次打印：1, 2, 3


function partial(fn, ...args) {
  return (...arg) => {
    return args[index] = fn(...args, ...arg)
  }
}