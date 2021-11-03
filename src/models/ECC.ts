export interface Curve {
  G_x: string;
  G_y: string;
  a: string;
  b: string;
  n: string;
  p: string;
}

export interface ECCKeyInput {
  a: string;
  b: string;
  p: string;
  n: string;
  base_point: string[];
};

export interface ECCKeyOutput {
  pri_key: string;
  pub_key: {
    curve: Curve;
    x: string;
    y: string;
  };
};
