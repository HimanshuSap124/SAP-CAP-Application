using {cap.application.db.schema} from '../db/schema' ;

service StudentService @(path : 'student') {
    entity Students as projection on schema.Students;
    entity Corses as projection on schema.Courses;

    entity StudentCourses as projection on schema.StudentCourses;
}