import cds from "@sap/cds";
import SdkConnectivity from '@sap-cloud-sdk/connectivity';
import SdkHttpClient from '@sap-cloud-sdk/http-client';

const CustomService = async (srv) => {

    srv.on('getCustomData', async (request) => {
        try {
            // Read Destination and endpoint details maintained on User Provided Variables
            const destination = process.env.LOG_DESTINAITION_NAME ?? null ;
            const endpoint = process.env.LOG_DESTINAITION_ENDPOINT ?? null ;

            if(!destination || !endpoint) {
                return request.error({ code: 400, message: 'Destination or Endpoint not configured' });
            }

            const myDestination = await SdkConnectivity.getDestination({
                destinationName: destination
            });

            if (!myDestination) {
                return request.error({ code: 404, message: 'Destination not found' });
            }


            console.log('Destination retrieved:', myDestination.name);

            const destinationResponse = await SdkHttpClient.executeHttpRequest(myDestination, {
                    url: endpoint,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                    // data: JSON.stringify(requestBody)
                }
            );

            if (!destinationResponse) {
                return request.error({ code: 404, message: 'No response from Destination' });
            }

            const data = destinationResponse.data;


            return {
                status: 200,
                data: { message: destinationResponse.data }
            }
        }
        catch (error) {
            console.error('Error retrieving destination:', error);
            return request.error({ code: 500, message: error.message });
        }
    });

}

export default CustomService;