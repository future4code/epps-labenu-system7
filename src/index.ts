import app from "./app";
import { Request, Response } from "express";
import {
  createStudent,
  createTeacher,
  createClass,
  addStudentClass,
  addTeacherClass,
  getStudentAge,
  getStudentsByClass,
  getTeachersByClass,
  getStudentsSameHobby,
  removeStudentFromClass,
  deleteStudent,
  removeTeacherFromClass,
  changeModuleClass,
} from "./functions";
import { teacherType, studentType, classType } from "./types";
import moment from "moment";

//INSERT A NEW STUDENT
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

//ADD STUDENT A CLASS
app.put(
  "/addstudentclass",
  async (req: Request, res: Response): Promise<any> => {
    let errorCode = 400;
    const idClass: number = Number(req.body.idClass);
    const idStudent: number = Number(req.body.idStudent);

    try {
      if (isNaN(Number(idClass)) || isNaN(Number(idStudent))) {
        throw new Error("Invalid body");
      }
      await addStudentClass(idStudent.toString(), idClass.toString());
      res.status(200).send("Student successfully added to class.");
    } catch (error) {
      res.status(errorCode).send(error.message);
    }
  }
);

//ADD TEACHER A CLASS
app.put(
  "/addteacherclass",
  async (req: Request, res: Response): Promise<any> => {
    let errorCode = 400;
    const idClass: number = Number(req.body.idClass);
    const idTeacher: number = Number(req.body.idTeacher);

    try {
      if (isNaN(Number(idClass)) || isNaN(Number(idTeacher))) {
        throw new Error("Invalid body");
      }
      await addTeacherClass(idClass.toString(), idTeacher.toString());
      res.status(200).send("Teacher successfully added to class.");
    } catch (error) {
      if (error.message.includes(`Duplicate entry `)) {
        res.status(errorCode).send("This teacher is alredy in another class.");
      }
      if (error.message.includes(`foreign key constraint fails`)) {
        res
          .status(errorCode)
          .send("There is no teacher registered with the ID entered.");
      }
      res.status(errorCode).send(error.message);
    }
  }
);

//GET AGE STUDENT
app.get("/studentage/:id", async (req: Request, res: Response) => {
  let errorCode = 400;
  const id: number = Number(req.params.id);
  try {
    const birthDate = await getStudentAge(id.toString());
    const age = moment().diff(birthDate[0][0].birthDate, "years");
    const name: string = birthDate[0][0].name as string;
    res.status(200).send(`${name} have a ${age} years.`);
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});

/************** CHALLENGES ***************/

//GET STUDENTS BY CLASS
app.get("/studentsbyclass/:id", async (req: Request, res: Response) => {
  let errorCode = 400;
  const id: number = Number(req.params.id);
  try {
    if (isNaN(Number(id))) {
      throw new Error("Invalid body!");
    }
    const result = await getStudentsByClass(id.toString());
    res.status(200).send(result[0]);
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});

//GET TEACHERS BY CLASS
app.get("/teachersbyclass/:id", async (req: Request, res: Response) => {
  let errorCode = 400;
  const id: number = Number(req.params.id);
  try {
    if (isNaN(Number(id))) {
      throw new Error("Invalid body!");
    }
    const result = await getTeachersByClass(id.toString());
    res.status(200).send(result[0]);
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});

//GET STUDENTS SAME HOBBY
app.get("/studentssamehobby", async (req: Request, res: Response) => {
  let errorCode = 400;
  try {
    const result = await getStudentsSameHobby();
    res.status(200).send(result[0]);
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});

//REMOVE STUDENT FROM CLASS
app.put("/removestudentfromclass/:id", async (req: Request, res: Response) => {
  let errorCode = 400;
  const id: number = Number(req.params.id);
  try {
    if (isNaN(Number(id))) {
      throw new Error("Invalid body!");
    }
    await removeStudentFromClass(id.toString());
    res.status(200).send("Student successfully removed from the class.");
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});

//DELETE STUDENT
app.delete("/deletestudent/:id", async (req: Request, res: Response) => {
  let errorCode = 400;
  const id: number = Number(req.params.id);
  try {
    if (isNaN(Number(id))) {
      throw new Error("Invalid body!");
    }
    await deleteStudent(id.toString());
    res.status(200).send(`Student successfully deleted.`);
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});

//REMOVE TEACHER FROM CLASS
app.delete("/removeteacherfromclass", async (req: Request, res: Response) => {
  let errorCode = 400;
  const idClass: number = Number(req.body.idClass);
  const idTeacher: number = Number(req.body.idTeacher);

  try {
    if (isNaN(Number(idClass)) || isNaN(Number(idTeacher))) {
      throw new Error("Invalid body");
    }
    await removeTeacherFromClass(idTeacher.toString(), idClass.toString());
    res
      .status(200)
      .send(
        `Teacher ${idTeacher.toString()} in class ${idClass.toString()} removed sucesfully.`
      );
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});

//CHANGE MODULE CLASS
app.put("/moduleclass", async (req: Request, res: Response) => {
  let errorCode = 400;
  const idClass: number = Number(req.body.idClass);
  const module: number = Number(req.body.module);
  try {
    if (isNaN(Number(module)) || isNaN(Number(idClass))) {
      throw new Error("Invalid body");
    }
    if (module > 7 || module < 0) {
      throw new Error("The module must be between 0 and 7");
    }
    await changeModuleClass(idClass.toString(), module.toString());
    res.status(200).send("Class module sucesfully changed.");
  } catch (error) {
    res.status(errorCode).send(error.message);
  }
});
