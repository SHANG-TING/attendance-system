export function getTranslate(item: HTMLElement): number | number[] | undefined {
  const transArr = [];
  if (!window.getComputedStyle) {
    return;
  }
  const style = window.getComputedStyle(item);
  const transform = style.transform;
  let mat = transform.match(/^matrix3d\((.+)\)$/);
  if (mat) {
    return parseFloat(mat[1].split(', ')[13]);
  }
  mat = transform.match(/^matrix\((.+)\)$/);
  mat ? transArr.push(parseInt(mat[1].split(', ')[4], 10)) : transArr.push(0);
  mat ? transArr.push(parseInt(mat[1].split(', ')[5], 10)) : transArr.push(0);

  return transArr;
}
