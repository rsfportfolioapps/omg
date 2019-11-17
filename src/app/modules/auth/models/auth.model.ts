export interface User {
  id?: number;
  username: string;
  password?: string;
  token?: string;
}

export interface LoginInfo {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserInfo {
  id?: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  birthDate?: string;
  hiringDate?: string;
  positionId: number;
  gender: string;
  officeId: number;
  email: string;
  languageId?: number;
  skillIds?: number[];
  password: string;
  confirmPassword?: string;
  fileStorageId?: string;
}

export interface Registration {
  gender?: Gender;
  offices?: Offices;
  languages?: Languages;
  skills?: Skills;
}

export interface Gender {
  key?: number;
  value?: string;
}

export interface Offices {
  key?: number;
  value?: string;
}

export interface Languages {
  key?: number;
  value?: string;
}

export interface Skills {
  key?: number;
  value?: string;
}

export interface Positions {
  key?: number;
  value?: string;
}

export interface RegisterCollection {
  genders: Gender[];
  offices: Offices[];
  languages: Languages[];
  skills: Skills[];
  positions: Positions[];
}
