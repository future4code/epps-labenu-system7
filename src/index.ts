import app from "./app";
import { Request, Response } from "express";
import { createStudent, createTeacher, createClass } from "./functions";
import { teacherType, studentType, classType } from "./types";
import { start } from "node:repl";

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

//INSERT A NEW CLASS
app.put("/class", async (req: Request, res: Response) => {
  let errorCode = 400;
  const {
    id,
    name,
    startdate,
    enddate,
    module,
    id_teacher,
  } = req.body as classType;

  try {
    const newClass = {
      id: null,
      name: name,
      startdate: startdate,
      enddate: enddate,
      module: module,
      id_teacher: id_teacher,
    } as classType;

    if (
      !name ||
      !startdate ||
      !enddate ||
      module.toString() === "" ||
      id_teacher.toString() === ""
    ) {
      throw new Error("Invalid body");
    }
    if (isNaN(Number(module)) || isNaN(Number(id_teacher))) {
      throw new Error("Module and id_teacher must be a number.");
    }
    const result = await createClass(newClass);
    res.status(200).send("Class successfully registered with id: " + result);
  } catch (error) {
    if (error.message.includes(`Duplicate entry '${id_teacher}'`)) {
      res.status(errorCode).send("This teacher is already in another class.");
    }
    if (error.message.includes(`foreign key constraint fails`)) {
      res
        .status(errorCode)
        .send("There is no teacher registered with the ID entered.");
    }

    res.status(errorCode).send(error.message);
  }
});
