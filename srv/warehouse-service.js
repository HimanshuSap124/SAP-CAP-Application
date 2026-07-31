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
            const { name, owner, address } = request.data;

            const newEntryPayload = {
                name: name,
                owner: owner,
                address: address
            }

            const transaction = cds.tx(request);

            const newEntry = await transaction.run(INSERT.into(Warehouse).entries(newEntryPayload));

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

        console.log(request.data);

        return data ;
    });



    //  ######################### Function ##########################
    srv.on('getWarehouseCount', async (request) => {
        try {

            const transaction = cds.tx(request);

            const warehouseRecords = await transaction.run(SELECT.from(Warehouse));

            if (!warehouseRecords) {
                throw new Error(`No Records Found`);
            }

            return warehouseRecords.length;
        }
        catch (error) {
            return request.error({
                code: 500,
                message: `Internal Server Error`
            });
        }
    });



    //  ######################### Actions ##########################
    srv.on('updateWarehouseOwner', async (request) => {
        try {

            const {warehouseId , newOwner} = await request.data ;

            if(!warehouseId || !newOwner){
                throw new Error(`Invalid Request, please check payload`);
            }

            const transaction = cds.tx(request);

            const updateRecord = await transaction.run(UPDATE(Warehouse).set({owner : newOwner}).where({ID : warehouseId}));

            if(!updateRecord){
                throw new Error(`Failed to Update Warehouse Owner`);
            }

            return "Owner details updated Successfully"

        }
        catch (error) {
            return request.error({
                code: 500,
                message: `Internal Server Error`
            });
        }
    });


    



}

export default WarehouseService;