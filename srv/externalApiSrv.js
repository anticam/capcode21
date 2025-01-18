const axios = require('axios');
const cds = require('@sap/cds');

// https://cap.cloud.sap/docs/node.js/core-services#implementing-services
// old-style handler function
class ApiService extends cds.ApplicationService {
    init() {

        const { ExternalData } = this.entities;

        this.on('READ', async (req) => {
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                // console.log(response.data);
                return response.data;
            }
            catch (error) {
                console.error(error);
                req.error(500, 'Failed to fetch external data');
            }

        });

        return super.init();

    }
}
module.exports = ApiService
