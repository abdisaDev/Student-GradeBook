// Student Gradebook
// • Description: Build a student gradebook application where teachers can
//                input grades for each student in different subjects. Students' information
//                such as name, ID, and grades in various subjects should be stored.
// • Data Structure: Use a hashmap or dictionary to store student information,
//                   with arrays or lists for grades.

// @ts-ignore
import prompt from "@cloud-technology/cli-prompt";

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

// sample
const gradeBooks: GradeBook[] = [
  {
    studentId: 1,
    firstName: "Abdisa",
    lastName: "Alemu",
    age: 21,
    gender: Gender.MALE,
    subject: [
      {
        name: SubjectNames.DSA,
        teacherName: "Mr. Yared",
        result: 100,
      },
    ],
  },
];

class StudentGradeBook {
  private async prompt(message: string) {
    return await prompt(message);
  }

  findUser(studentId: number) {
    for (let gradeBook of gradeBooks) {
      if (studentId === gradeBook.studentId) {
        return gradeBooks.indexOf(gradeBook);
      }
    }
    return -1;
  }

  remainingSubjects(studentId: number) {
    const subjects: string[] = [];

    for (let gradeBook of gradeBooks) {
      if (studentId === gradeBook.studentId) {
        for (let subjectName in SubjectNames) {
          for (let subject of gradeBook.subject) {
            if (subjectName === subject.name) {
              continue;
            } else {
              subjects.push(subjectName);
            }
          }
        }
      }
    }
    return subjects;
  }

  async submitGrade(studentId: number) {
    const indexOfStudent = this.findUser(studentId);
    if (indexOfStudent !== -1) {
      for (let subject of this.remainingSubjects(studentId)) {
        const currentSubjectIndex = gradeBooks[indexOfStudent].subject.length;
        const insertGrade = Number(
          await this.prompt(`Enter the result for ${subject} subject: \n>>> `)
        );

        gradeBooks[indexOfStudent].subject[currentSubjectIndex] = {
          name: SubjectNames[subject],
          result: insertGrade,
        };
      }
    }
    return "Grade Well Updated!";
  }

  registerStudent(studentInfo: GradeBook) {
    gradeBooks.push(studentInfo);
    return "Student Added";
  }
}

const a = new StudentGradeBook();
console.log(await a.submitGrade(1));
