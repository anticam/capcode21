const cds = require("@sap/cds");

// see https://github.com/SAP-samples/cloud-cap-samples/blob/23bea0f62947ff6c0d1908e7edf4359b328ee380/reviews/srv/reviews-service.js
module.exports = cds.service.impl(function () {
    const { worker } = this.entities('india.db.master');
    //const db = cds.connect.to('db');
    
    // const { worker } = this.entities;

    this.on('hike', async (req) => {
        const { ID } = req.data;

        if (!ID) { return req.reject(400, "ID is required"); }
        
        console.log(`Received request to increment salary for Worker with ID : ${ID}`);

        await cds.tx(async tx => {
            // Retrieve the current salary amount of Worker
            let workers = await tx.read(worker).where({ 'ID': ID });

            // Check if Worker exists
            if (!workers.length) {
                await tx.rollback();
                return req.reject(404, `Worker with ID ${ID} not found`);
            }

            // Increment salary by 10%
            const currentSalary = workers[0].salaryAmount;
            console.log(`Current salary of Worker with ID ${ID} is ${currentSalary}`);


            // Update operation
            const result = await tx.update(worker)
                .set({ salaryAmount: currentSalary + 20000 })
                .where({ ID: ID });
            
            if (result === 0) {
                await tx.rollback();
                return req.reject(500, `Failed to increment salary for Worker with ID ${ID}`);
            }

        }).catch(async err => {
            console.error(err);
            await tx.rollback();
            return req.reject(500, `Error occurred while incrementing salary for Worker with ID ${ID}`);
        });
        
    });
});

