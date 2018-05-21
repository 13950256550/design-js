
export function copyArray(arr){
  const result = [];
  arr.forEach(d=>{
    result.push(d);
  });
  return result;
}
export function copyGrid(grid) {
  const result = [];
  grid.forEach((line)=>{
    const temp = [];
    line.forEach(d=>{
      temp.push(d);
    });
    result.push(temp)
  });
  return result;
}

export function copyObject(object){
  let result = object
  if(typeof(object)==='object'){
    if(object instanceof Array){
      result = []
      object.forEach(d=>{
        result.push(copyObject(d));
      });
    }else{
      result = {}
      for(const key in object){
        if (Object.prototype.hasOwnProperty.call(object, key)) {
          result[key] = copyObject(object[key])
        }
      }
    }
  }
  return result
}

export function transform(grid){
  const result = [];
  grid[0].forEach(()=>{
    result.push([]);
  });
  grid.forEach((row)=>{
    row.forEach((col,i)=>{
      result[i].push(col);
    });
  });
  return result;
}
