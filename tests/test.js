function copyObject(object) {
  let result = object
  if (typeof(object) === 'object') {
    if (object instanceof Array) {
      result = []
      object.forEach(d => {
        result.push(copyObject(d));
      });
    } else {
      result = {}
      for (const key in object) {
        result[key] = copyObject(object[key])
      }
    }
  }
  return result
}

const aaa3 = 'str'
const aaa2 = new String("hello world");
let aaa = {}
aaa = [[]]
aaa = 'str'
aaa = 123
aaa = {1:1,2:2}
aaa = [1,2,3,4]

const obj = {}
obj.key1 = {'1':1,'2':2}
obj.key2 = [1,2,1,[1,2,4],1]
obj.key3 = '1111'
obj.key4 = 1111

const grid =[
  [1,2,3,4],
  [1,2,3,4],
  [1,2,3,4],
  [1,2,3,4],
]

const temp = copyObject(grid)
// console.log(typeof(aaa),aaa instanceof Array);
console.log(temp);
