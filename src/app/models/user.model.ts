export interface UserSI {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: boolean;
  birthDate: string;
  vipLevel: number;
  phoneNumber: string;
  roles: Role[];
  authenticated: boolean;
}

export interface Role {
  name: string;
  description: string;
}




