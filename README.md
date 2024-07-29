### Student-GradeBook

• Description: *Build a student gradebook application where teachers can input grades for each student in different subjects.                  Students' information such as name, ID, and grades in various subjects should be stored.* <br /> <br />

• Data Structure: *Use a hashmap or dictionary to store student information, with arrays or lists for grades.* <br />

### Usage
sample to update student result

``` javascript
console.log(gradeBooks[0].subject[0].result);
const a = new StudentGradeBook();
console.log(await a.updateStudentData(1));
console.log(gradeBooks[0].subject[0].result);
```
To run the application

``` node
1. git clone https://github.com/abdisaDev/Student-GradeBook.git // clone this repo
2. cd Student-GradeBook // change the directory to repo
3. pnpm install or npm install // install dependencies (typescript and prompt module)
4. pnpm run start // this script compiles the typescript code to javascript and run the javascript on node enviroment
```
