export type Gift = {
  name: string;
  relation: Array<string>;
  hobby: string;
  minAge: number;
  maxAge: number;
};

export type Filters = {
  hobby: Array<string>;
  age: 0;
  relation: "";
  [index: string]: any;
};
