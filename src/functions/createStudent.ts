import connection from "../connection";
import studentType from "../types/student";

const createStudent = async (student: studentType): Promise<any> => {
  const result = await connection(`lbsystem_students`).insert({
    id: null,
    name: student.name,
    email: student.email,
    birthDate: student.birthDate,
    id_class: student.id_class,
  });

  return result;
};

export default createStudent;
