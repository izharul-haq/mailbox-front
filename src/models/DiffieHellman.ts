export interface DiffieHellmanKeyInput {
  p: number;
  q: number;
  x: number;
  y: number;
}

export interface DiffieHellmanKeyOutput {
  X: number;
  Y: number;
  K: number;
}