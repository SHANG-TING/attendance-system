export function getMatrix(element: HTMLElement): { x: number; y: number; z: number } {
  const values = element.style.transform.split(/\w+\(|\);?/);
  const transform = values[1].split(/,\s?/g).map(parseInt);

  return {
    x: transform[0],
    y: transform[1],
    z: transform[2]
  };
}
