import connection from "../connection";
import teacherType from "../types/teacher";

const createStudent = async (teacher: teacherType): Promise<any> => {
  const result = await connection(`lbsystem_teachers`).insert({
    id: null,
    name: teacher.name,
    email: teacher.email,
    birthDate: teacher.birthDate,
  });

  return result;
};

export default createStudent;
