import cds from '@sap/cds';

//  connect to the database
const { Employees } = cds.entities('cap.application.db.schema');

//  service implementation
const EmployeeService = async (srv) => {

    srv.on('CREATE', 'Employees', async (request) => {
        try {
            const { name, email, organization, profile } = request.data;

            //  validation check
            if (!name || !email || !profile) {
                return request.reject(400, 'Name, Email, and Profile are required fields');
            }

            const employeeID = cds.utils.uuid();

            const newEmployeeEntry = {
                ID: employeeID,
                name: name,
                email: email,
                organization: {
                    ID : organization.ID
                },
                profile: {
                    ID: cds.utils.uuid(),
                    phoneNumber: profile.phoneNumber,
                    address: profile.address,
                    dateOfBirth: profile.dateOfBirth,
                    employee_ID: employeeID
                }
            }

            const transaction = await cds.tx(request);

            const newEmployee = await transaction.run(INSERT.into(Employees).entries(newEmployeeEntry));

            if(!newEmployee) {
                return request.reject(500, 'Failed to create employee entry');
            }

            return { 
                status: 201, data: { message: 'Employee entry created successfully', employeeID: employeeID } };


        }
        catch (error) {

        }
    });

}

export default EmployeeService;