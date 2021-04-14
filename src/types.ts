export type studentType = {
  id: number | null;
  name: string;
  email: string;
  birthDate: string;
  id_class: number;
};

export type teacherType = {
  id: number | null;
  name: string;
  email: string;
  birthDate: string;
};

export type classType = {
  id: number | null;
  name: string;
  startdate: string;
  enddate: string;
  module: number;
  id_teacher: number;
};
