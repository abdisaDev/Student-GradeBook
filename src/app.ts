// Student Gradebook
// • Description: Build a student gradebook application where teachers can
//                input grades for each student in different subjects. Students' information
//                such as name, ID, and grades in various subjects should be stored.
// • Data Structure: Use a hashmap or dictionary to store student information,
//                   with arrays or lists for grades.

// @ts-ignore
import prompt from "@cloud-technology/cli-prompt";
// @ts-ignore
import { writeFile, readFile } from "fs/promises";

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

enum SubjectNames {
  DSA = "DSA",
  WEB = "WEB",
  MATH = "MATH",
}

interface Subject {
  name: SubjectNames;
  teacherName?: string; // optional field
  result: number;
}

interface GradeBook {
  studentId: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  subject: Subject[];
  average?: number; // optional field
  grade?: string; // optional field
}

class StudentGradeBook {
  private async prompt(message: string) {
    return await prompt(message);
  }

  findUser(studentId: number) {
    for (let gradeBook of gradeBooks) {
      if (Number(studentId) === gradeBook.studentId) {
        return gradeBooks.indexOf(gradeBook);
      }
    }
    return -1;
  }

  remainingSubjects(indexOfStudent: number) {
    const subjects: string[] = [];
    const currentSubjects: string[] = [];
    const student = gradeBooks[indexOfStudent];

    let indexCounter = 0;

    for (let subject of student.subject) {
      currentSubjects.push(subject.name);
    }

    for (let subjectName in SubjectNames) {
      if (subjectName === currentSubjects[indexCounter]) {
        indexCounter++;
        continue;
      }
      subjects.push(subjectName);
      indexCounter++;
    }

    return subjects;
  }

  async submitGrade(indexOfStudent: number) {
    const student = gradeBooks[indexOfStudent];
    let indexCounter = 0;

    if (indexOfStudent !== -1) {
      for (let subject of this.remainingSubjects(indexOfStudent)) {
        const currentSubjectIndex = student.subject.length;
        const insertGrade = Number(
          await this.prompt(`Enter the result for ${subject} subject: \n>>> `)
        );
        if (subject !== student.subject[indexCounter]?.name) {
          student.subject[currentSubjectIndex] = {
            name: SubjectNames[subject],
            result: insertGrade,
          };
        } else {
        }
      }
      return student.subject.length === 3
        ? console.log("All caught up!")
        : this.save();
    } else throw new Error("Something Bad Happened \u{26A0}");
  }

  async registerStudent() {
    const teacherName = await this.prompt("Your Name (optional): \n>>> ");
    console.log("------------ Student Info ------------");
    const studentData: GradeBook = {
      studentId: gradeBooks.length + 1,
      firstName: await this.prompt("First Name: \n>>> "),
      lastName: await this.prompt("Last Name: \n>>> "),
      age: await this.prompt("Age: \n>>> "),
      gender: await this.prompt("Gender: \n>>> "),
      subject: [
        {
          name: (await this.prompt("Subject Name: \n>>> ")).toUpperCase(),
          teacherName,
          result: Number(await this.prompt("Result: \n>>> ")),
        },
      ],
    };
    gradeBooks.push(studentData);
    return this.save();
  }

  get getStudentId() {
    return (async () => {
      return Number(await this.prompt("Enter Student's Id No.\n>>> "));
    })();
  }

  async updateStudentData(indexOfStudent: number) {
    const student: GradeBook = gradeBooks[indexOfStudent];
    console.log(
      "Which thing you want to update?\n1. Student Name\n2. Age\n3. Grade\n4. Gender\n5. Subject Name\n0. Cancel\n"
    );
    const choise = Number(await this.prompt(">>> "));
    const subjects: string[] = [];
    for (let subject of student.subject) {
      subjects.push(subject.name);
    }
    let choosenSubject: string;
    let indexOfSubject: number;
    switch (choise) {
      case 1:
        const studentName: string = await this.prompt(
          "Insert Student Full Name\n>>> "
        );
        const [firstName, lastName] = studentName.split(" ");
        student.firstName = firstName;
        student.lastName = lastName;
        console.log("Student Name Updated");
        break;
      case 2:
        student.age = Number(await this.prompt("Enter student age\n>>> "));
        break;
      case 3:
        choosenSubject = await this.prompt(
          `Select subject: ${subjects.toString()}\n>>> `
        );
        indexOfSubject = subjects.indexOf(choosenSubject.toUpperCase());
        student.subject[indexOfSubject].result = Number(
          await this.prompt("Insert the new grade\n>>> ")
        );
        break;
      case 4:
        student.gender = await this.prompt("Insert gender\n>>> ");
        break;
      case 5:
        choosenSubject = await this.prompt(
          `Select subject: ${subjects.toString()}\n>>> `
        );
        indexOfSubject = subjects.indexOf(choosenSubject.toUpperCase());
        student.subject[indexOfSubject].name = await this.prompt(
          "Insert the new Name\n>>> "
        );
        break;
      case 0:
        return "Bye!";
    }
    return this.save();
  }

  async display() {
    const choise: number = Number(
      await this.prompt(
        `Student GradeBook\n
1. Register Student (incl. Grade)
2. Submit Student Grade
3. Update Student Data
4. Show Remaining Subjects
5. Search Student
0. Exit\n
>>> `
      )
    );

    const indexOfStudent =
      choise > 1 && choise < 6 ? this.findUser(await this.getStudentId) : -1;

    switch (choise) {
      case 1:
        this.registerStudent();
        break;
      case 2:
        await this.submitGrade(indexOfStudent);
        break;
      case 3:
        await this.updateStudentData(indexOfStudent);
        break;
      case 4:
        this.remainingSubjects(indexOfStudent);
        break;
      case 5:
        console.log(gradeBooks[indexOfStudent]);
        break;
      case 6:
        console.log("Bye");
        return 0;
    }
  }

  save() {
    const filePath = "student-grade-book.json";

    (async () => {
      try {
        await writeFile(filePath, JSON.stringify(gradeBooks));
        console.log("Saved! \u{0001f4be}");
      } catch (error) {
        console.error("Error \u{26A0}");
      }
    })();
  }

  static fetch() {
    const filePath = "student-grade-book.json";

    return (async () => {
      try {
        const studentData = await readFile(filePath, {});
        // console.log(studentData);
        return JSON.parse(studentData);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    })();
  }
}

const gradeBooks: GradeBook[] = await StudentGradeBook.fetch();
class Main extends StudentGradeBook {
  constructor() {
    super();
    this.display();
  }
}

new Main();
