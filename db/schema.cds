namespace cap.application.db.schema;


entity Warehouse {
    key ID      : UUID;
        name    : String;
        owner   : String;
        address : String;
}


//  Entity for One-to-one relationship between Employees and EmployeeProfiles

entity Employees {
    key ID           : UUID;
        name         : String;
        email        : String;

        profile      : Composition of one EmployeeProfiles on profile.employee = $self;

        organization : Association to one Organizations;
}

entity EmployeeProfiles {
    key ID          : UUID;
        phoneNumber : String;
        address     : String;
        dateOfBirth : Date;

        employee    : Association to one Employees;
}


//  Entity for One-to-Many relationship between Organizations and Employees
//  OR Many-to-One relationship between Employees and Organizations

entity Organizations {
    key ID        : String;
        name      : String;
        location  : String;

        employees : Composition of many Employees on employees.organization = $self;
}


// Many-to-Many relationship between Students and Courses

// Entity for Many-to-Many relationship

entity Students {
    key ID             : UUID;
        name           : String;
        email          : String;

        studentCourses : Composition of many StudentCourses on studentCourses.student = $self;
}

entity Courses {
    key ID             : UUID;
        name           : String;
        duration       : Integer;

        studentCourses : Composition of many StudentCourses on studentCourses.course = $self;
}

entity StudentCourses {
    key ID      : UUID;

        student : Association to one Students;
        course  : Association to one Courses;
}
