export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export type Job = {
  id: Id;
  columnId: Id;
  content: string;
  companyName: string;
  jobTitle: string;
  jobURL: string;
};

export interface Contact {
  id: number;
  content: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
}
