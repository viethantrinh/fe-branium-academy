export interface UserSI {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username?: string;
  email: string;
  firstName: string;
  lastName: string;
  enabled?: boolean;
  gender?: boolean;
  birthDate?: string;
  vipLevel?: number;
  phoneNumber?: string;
  avatar?: any;
  roles: Role[];
  authenticated?: boolean;
}

export interface Role {
  name: string;
  description: string;
}




