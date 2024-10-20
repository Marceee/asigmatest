// closure
const someFn = () => {
  let x = 10;
  return () => (x += 10);
};
const fn = someFn();
console.log('ssdwdw. ', fn());

const sec = () => {
  const st = 'secret';
  return () => st;
};
console.log('call sec.    ', sec()());

//cloning
let obj = { a: 1, b: 2 };
let obj2 = { ...obj }; //or Object.assign({}, obj);
obj2.foo = 11;
console.log(obj, obj2);

//count vowels in string
const vowels = ['a', 'e', 'i', 'o', 'u'];
const countVowels = (str) => {
  return str
    .toLowerCase()
    .split('')
    .reduce((acc, char) => (vowels.includes(char) ? acc + 1 : acc), 0);
};
console.log('count vowels    ', countVowels('hello'));

//reversestring
const reverseString = (str) => str.split(' ').reverse().join(' ');
console.log('reverse string    ', reverseString('Wlcome ro Jadjcjd djdjj!'));
