// Student Gradebook
// • Description: Build a student gradebook application where teachers can
//                input grades for each student in different subjects. Students' information
//                such as name, ID, and grades in various subjects should be stored.
// • Data Structure: Use a hashmap or dictionary to store student information,
//                   with arrays or lists for grades.
// @ts-ignore
import prompt from "@cloud-technology/cli-prompt";
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (Gender = {}));
var SubjectNames;
(function (SubjectNames) {
    SubjectNames["DSA"] = "DSA";
    SubjectNames["WEB"] = "WEB";
    SubjectNames["MATH"] = "MATH";
})(SubjectNames || (SubjectNames = {}));
// sample
const gradeBooks = [
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
            {
                name: SubjectNames.WEB,
                teacherName: "Mr. Yared",
                result: 100,
            },
        ],
    },
];
class StudentGradeBook {
    async prompt(message) {
        return await prompt(message);
    }
    findUser(studentId) {
        for (let gradeBook of gradeBooks) {
            if (studentId === gradeBook.studentId) {
                return gradeBooks.indexOf(gradeBook);
            }
        }
        return -1;
    }
    remainingSubjects(studentId) {
        const subjects = [];
        for (let gradeBook of gradeBooks) {
            if (studentId === gradeBook.studentId) {
                for (let subjectName in SubjectNames) {
                    for (let subject of gradeBook.subject) {
                        if (subjectName === subject.name) {
                            continue;
                        }
                        else {
                            subjects.push(subjectName);
                        }
                    }
                }
            }
        }
        return subjects;
    }
    async submitGrade(studentId) {
        const indexOfStudent = this.findUser(studentId);
        if (indexOfStudent !== -1) {
            for (let subject of this.remainingSubjects(studentId)) {
                const currentSubjectIndex = gradeBooks[indexOfStudent].subject.length;
                const insertGrade = Number(await this.prompt(`Enter the result for ${subject} subject: \n>>> `));
                gradeBooks[indexOfStudent].subject[currentSubjectIndex] = {
                    name: SubjectNames[subject],
                    result: insertGrade,
                };
            }
        }
        return "Grade Well Updated!";
    }
    async registerStudent() {
        const teacherName = await this.prompt("Your Name (optional): \n>>> ");
        console.log("------------ Student Info ------------");
        const studentData = {
            studentId: gradeBooks.length + 1,
            firstName: await this.prompt("First Name: \n>>> "),
            lastName: await this.prompt("Last Name: \n>>> "),
            age: await this.prompt("Age: \n>>> "),
            gender: await this.prompt("Gender: \n>>> "),
            subject: [
                {
                    name: await this.prompt("Subject Name: \n>>> "),
                    teacherName,
                    result: await this.prompt("Result: \n>>> "),
                },
            ],
        };
        gradeBooks.push(studentData);
        return "Student Added";
    }
    async updateStudentData(studentId) {
        const indexOfStudent = this.findUser(studentId);
        const student = gradeBooks[indexOfStudent];
        console.log("Which thing you want to update?\n1. Student Name\n2. Age\n3. Result\n4. Gender\n5. Subject Name\n6. Your Name\n0. Cancel\n");
        const choise = Number(await this.prompt(">>> "));
        switch (choise) {
            case 1:
                const studentName = await this.prompt("Insert Student Full Name\n>>> ");
                const [firstName, lastName] = studentName.split(" ");
                student.firstName = firstName;
                student.lastName = lastName;
                console.log("Student Name Updated");
                break;
            case 2:
                student.age = Number(await this.prompt("Enter student age\n>>> "));
                break;
            case 3:
                const subjects = [];
                for (let subject of student.subject) {
                    subjects.push(subject.name);
                }
                const choosenSubject = await this.prompt(`Select subject: ${subjects.toString()}\n>>> `);
                const indexOfSubject = subjects.indexOf(choosenSubject.toUpperCase());
                student.subject[indexOfSubject].result = Number(await this.prompt("Insert the new grade\n>>> "));
                break;
            // student.subject = Number(await this.prompt("Enter student age\n>>> "));
        }
        // gradeBooks[indexOfStudent];
    }
}
console.log(gradeBooks[0].subject[0].result);
const a = new StudentGradeBook();
console.log(await a.updateStudentData(1));
console.log(gradeBooks[0].subject[0].result);
