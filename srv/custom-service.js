import cds from "@sap/cds";

const CustomService = async (srv) => {

    srv.on('getCustomData', async (request) => {
        try {

            return {
                status: 200,
                data: { message: "Application is working fine" }
            }   
        }
        catch (error) {
            console.error('Error retrieving destination:', error);
            return request.error({ code: 500, message: error.message });
        }
    });

}

export default CustomService;