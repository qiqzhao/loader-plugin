console.log("hello main");
console.log("hello main");
console.log("hello main");

const sum = (...args) => {
  return args.reduce((p, c) => p + c, 0);
};
