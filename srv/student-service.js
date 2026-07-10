import cds from '@sap/cds';

const { Students, StudentCourses } = cds.entities('cap.application.db.schema');

const StudentService = async (srv) => {

    srv.on('CREATE', 'Students', async (request) => {
        try {
            const { name, email, studentCourses } = request.data;

            if (!name || !email || !studentCourses || !Array.isArray(studentCourses)) {
                return request.reject(400, 'Invalid request data');
            }

            const transaction = await cds.transaction(request);

            const studentId = cds.utils.uuid();

            const newStudentEntry = {
                ID: studentId,
                name: name,
                email: email
            }

            const newStudent = await transaction.run(
                INSERT.into(Students).entries(newStudentEntry)
            );

            if (!newStudent || newStudent.length === 0) {
                return request.reject(500, 'Failed to create student entry');
            }

            const studentCoursesEntries = [] ;

            studentCourses.forEach(element => {
                const studCourseObj = {
                    ID : cds.utils.uuid(),
                    student_ID : studentId,
                    course_ID : element.course.ID
                }
                studentCoursesEntries.push(studCourseObj);
            });

            console.log(studentCoursesEntries);

            const newStudentCourses = await transaction.run(
                INSERT.into(StudentCourses).entries(studentCoursesEntries)
            );

            if (!newStudentCourses || newStudentCourses.length === 0) {
                return request.reject(500, 'Failed to create student courses entries');
            }

            return {
                studentID: studentId            
            }
        }
        catch (error) {
            console.error('Error creating student entry:', error);
            return request.reject(500, 'Internal server error');
        }
    });

}

export default StudentService;