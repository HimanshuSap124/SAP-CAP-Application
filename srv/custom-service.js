import cds from "@sap/cds";
import axios from 'axios';
import qs from 'qs';

const CustomService = async (srv) => {

    srv.on('getCustomData', async (request) => {
        try {

            // Replace <region> with your actual region in the baseUrl
            const baseUrl = 'https://auditlog-management.cfapps.<region>.hana.ondemand.com';

            
            const clientId = 'sb-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxb6316';
            const clientSecret = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

            const tokenURL = 'https://<subdomain>.authentication.<region>.hana.ondemand.com/oauth/token';

            const endpoint = '/auditlog/v2/auditlogrecords?time_from=2026-07-10T00:00:00&time_to=2026-07-10T00:03:00';

            // Axios POST call to Generate Token
            const tokenResponse = await axios.post(tokenURL, qs.stringify(
                {
                    grant_type: 'client_credentials'
                }
            ), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
                }
            });
            
            
            const accessToken = await tokenResponse.data.access_token;
            
            const apiUri = baseUrl + endpoint;
            
            // Axios GET call to fetch API data
            const apiResponse = await axios.get(apiUri, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Accept': 'application/json'
                }
            });


            return {
                status: 200,
                data: { message: apiResponse.data }
            }
        }
        catch (error) {
            console.error('Error retrieving destination:', error);
            return request.error({ code: 500, message: error.message });
        }
    });

}

export default CustomService;