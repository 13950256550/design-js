
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

export function transform(grid){
  const result = [];
  grid[0].forEach((col)=>{
    result.push([]);
  });
  grid.forEach((row)=>{
    row.forEach((col,i)=>{
      result[i].push(col);
    });
  });
  return result;
}
