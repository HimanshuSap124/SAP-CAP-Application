using { cap.application.db.schema } from '../db/schema' ;

service EmployeeService @(path : 'employee') {
    
    entity Employees as projection on schema.Employees;

    entity EmployeeProfiles as projection on schema.EmployeeProfiles;

}