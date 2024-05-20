export type TLogin = {
  email: string | null;
  password: string | null;
};

export type TSignup = {
  email: string | null;
  username: string | null;
  password: string | null;
};

export type Student = {
  name: string;
  present: number;
  studentId: string;
};
