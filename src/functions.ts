import connection from "./connection";
import { studentType, teacherType, classType } from "./types";

export const createStudent = async (student: studentType): Promise<any> => {
  return await connection(`lbsystem_students`).insert({
    id: null,
    name: student.name,
    email: student.email,
    birthDate: student.birthDate,
    id_class: student.id_class,
  });
};

export const createTeacher = async (teacher: teacherType): Promise<any> => {
  return await connection(`lbsystem_teachers`).insert({
    id: null,
    name: teacher.name,
    email: teacher.email,
    birthDate: teacher.birthDate,
  });
};

export const createClass = async (newClass: classType): Promise<any> => {
  return await connection(`lbsystem_class`).insert({
    id: null,
    name: newClass.name,
    startdate: newClass.startdate,
    enddate: newClass.enddate,
    module: newClass.module,
    id_teacher: newClass.id_teacher,
  });
};

export const addStudentClass = async (
  idStudent: string,
  idClass: string
): Promise<any> => {
  return await connection.raw(`
  update lbsystem_students set
  id_class = ${idClass}
  where
  id = ${idStudent}
  `);
};

export const addTeacherClass = async (
  idClass: string,
  idTeacher: string
): Promise<any> => {
  return await connection.raw(`
  update lbsystem_class set
  id_teacher = ${idTeacher}
  where
  id = ${idClass}
  `);
};

export const getStudentAge = async (idStudent: string): Promise<any> => {
  return await connection.raw(
    `select birthDate,name from lbsystem_students where id= ${idStudent}`
  );
};

export const getStudentsByClass = async (idClass: string): Promise<any> => {
  return await connection.raw(`select
  std.id as idStudent,
  std.name as nameStudent,
  std.email 
  from lbsystem_students std
  where
  std.id_class = ${idClass};`);
};
