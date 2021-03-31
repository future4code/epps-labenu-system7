import connection from "./connection";
import { studentType, teacherType, classType } from "./types";

export const createStudent = async (student: studentType): Promise<any> => {
  const result = await connection(`lbsystem_students`).insert({
    id: null,
    name: student.name,
    email: student.email,
    birthDate: student.birthDate,
    id_class: student.id_class,
  });

  return result;
};

export const createTeacher = async (teacher: teacherType): Promise<any> => {
  const result = await connection(`lbsystem_teachers`).insert({
    id: null,
    name: teacher.name,
    email: teacher.email,
    birthDate: teacher.birthDate,
  });

  return result;
};

export const createClass = async (newClass: classType): Promise<any> => {
  const result = await connection(`lbsystem_class`).insert({
    id: null,
    name: newClass.name,
    startdate: newClass.startdate,
    enddate: newClass.enddate,
    module: newClass.module,
    id_teacher: newClass.id_teacher,
  });
  return result;
};
