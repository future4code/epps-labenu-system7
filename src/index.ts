import app from "./app";
import { Request, Response } from "express";
//FUNCTIONS
import createStudent from "./functions/createStudent";
import createTeacher from "./functions/createTeacher";
//TYPES
import studentType from "./types/student";
import teacherType from "./types/teacher";

// INSERT A NEW STUDENT
app.put(
  "/student",
  async (req: Request, res: Response): Promise<any> => {
    let errorCode = 400;
    const { name, email, birthDate, id_class } = req.body as studentType;

    try {
      if (!name || !email || !birthDate || !id_class) {
        throw new Error("Invalid body!");
      }
      if (isNaN(Number(id_class))) {
        throw new Error("id_class must be a number.");
      }
      const newStudent: studentType = {
        id: null,
        name: name,
        email: email,
        birthDate: birthDate,
        id_class: id_class,
      };
      const result = await createStudent(newStudent);
      res.status(200).send({
        message: "Student successfully registered with id: " + result,
      });
    } catch (error) {
      res.status(errorCode).send(error.message);
    }
  }
);

//INSERT A NEW TEACHER
app.put("/teacher", async (req: Request, res: Response) => {
  let errorCode = 400;
  const { name, email, birthDate } = req.body as teacherType;

  try {
    if (!name || !email || !birthDate) {
      throw new Error("Invalid body!");
    }
    const newTeacher: teacherType = {
      id: null,
      name: name,
      email: email,
      birthDate: birthDate,
    };
    const result = await createTeacher(newTeacher);
    res.status(200).send({
      message: "Teacher successfully registered with id: " + result,
    });
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});
