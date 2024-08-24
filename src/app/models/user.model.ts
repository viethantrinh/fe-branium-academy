// interface for sign in user form
export interface UserSI {
  email: string;
  password: string;
}

// interface for create and update user form
export interface UserForm {
  id: string | null;
  username: string | null;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  gender: boolean | null;
  birthDate: string | null;
  vipLevel: number;
  phoneNumber: string | null;
  roles: Role[];
}


// interface for represent the current sign-in user in system
export interface User {
  id: string;
  username: string | null;
  email: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  gender: boolean | null;
  birthDate: string | null;
  vipLevel: number;
  phoneNumber: string | null;
  roles: Role[];
  avatar: string | null;
  authenticated: boolean | null;
}

// interface for represent the current sign-in user's roles in system
export interface Role {
  name: string;
}

export const inmemoryUserData: User[] = [
  {
    id: '93493902432',
    username: 'viethantrinh',
    email: 'hntrnn12@gmail.com',
    firstName: 'Han',
    lastName: 'Trinh',
    enabled: true,
    gender: true,
    birthDate: '02/12/2003',
    vipLevel: 9999,
    phoneNumber: '0283785777',
    roles: [
      {
        name: 'ADMIN',
      }
    ],
    avatar: null,
    authenticated: true
  },
  {
    id: '943284233',
    username: 'viethantrinh',
    email: 'hntrnn12@gmail.com',
    firstName: 'Han',
    lastName: 'Trinh',
    enabled: true,
    gender: true,
    birthDate: '02/12/2003',
    vipLevel: 9999,
    phoneNumber: '0283785777',
    roles: [
      {
        name: 'CUSTOMER',
      }
    ],
    avatar: null,
    authenticated: true
  }
];





