export interface RSAKeyInput {
  p: number;
  q: number;
  e: number;
}

export interface RSAKeyOutput {
  e: number;
  d: number;
  n: number;
}
