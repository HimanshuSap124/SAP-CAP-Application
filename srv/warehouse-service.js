import cds from '@sap/cds';

// refering to the entity which we have defined in our data model. We can also refer to the entity by using the relative path like this : cds.entities('Warehouses') 
// but it is always recommended to use the absolute path to avoid any confusion in case of multiple entities with same name in different namespaces.

// const { Warehouses } = cds.entities('warehouse');   //  -> Relative path to refer to the entity
const { Warehouse } = cds.entities('cap.application.db.schema');    //  -> Absolute path to refer to the entity (RECOMMENDED).



const WarehouseService = async (srv) => {

    //  ######################### CREATE - Handler ##########################
    
    srv.before('CREATE', 'Warehouses', async (request) => {
        try {
            const { name, owner, address } = request.data;

            if (!name || !owner || !address) {
                return request.error({
                    code: 400,
                    message: 'Invalid request, please check your payload'
                });
            }

            //  We wants to modify the owner field and wants to append it with "- NEW" just for fun ;-)
            request.data.owner = `${request.data.owner} - NEW`;
        }
        catch (error) {
            return request.error({
                code: 500,
                message: error.message
            });
        }
    });


    srv.on('CREATE', 'Warehouses', async (request) => {
        try {
            const { name, owner, address, region_ID } = request.data;

            //  Lets make it valid from today and valid to 1 year from now
            const newEntryPayload = {
                name: name,
                owner: owner,
                address: address,
                region_ID: region_ID,
                validFrom : new Date().toISOString(),
                validTo : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
            }

            const newEntry = await cds.tx(async (tx) => {
                return await tx.run(INSERT.into(Warehouse).entries(newEntryPayload));
            });

            if (!newEntry) {
                return request.error({
                    code: 500,
                    message: 'Something went wrong while creating the warehouse entry'
                });
            }


            return newEntryPayload ;
        }
        catch (error) {
            return request.error({
                code: 500,
                message: error.message
            });
        }
    });


    srv.after('CREATE', 'Warehouses', async (data, request) => {
        //  Just for fun, we wants to log the message in console after creating the entry in database.
        console.log(data);

        console.log("Successfully created the Record");

        return data ;
    });


}

export default WarehouseService;