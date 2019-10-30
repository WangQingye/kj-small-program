function colorMatrixFilter(origin: Uint8ClampedArray, rgb: Array<number>) {
  const [targetR, targetG, targetB] = rgb
  const len = origin.length
  let result = new Uint8ClampedArray(len)
  const m = [
    1, 0, 0, 0, targetR,
    0, 1, 0, 0, targetG,
    0, 0, 1, 0, targetB,
    0, 0, 0, 1, 0,
  ]
  for (let i = 0; i < len; i += 4) {
    let r = origin[i];
    let g = origin[i + 1];
    let b = origin[i + 2];
    let a = origin[i + 3];
    result[i] = r * m[0] + g * m[1] + b * m[2] + a * m[3] + m[4];
    result[i + 1] = r * m[5] + g * m[6] + b * m[7] + a * m[8] + m[9];
    result[i + 2] = r * m[10] + g * m[11] + b * m[12] + a * m[13] + m[14];
    result[i + 3] = r * m[15] + g * m[16] + b * m[17] + a * m[18] + m[19];
  }
  return result
}

export {
  colorMatrixFilter
}