module.exports = cds.service.impl(async (srv) => {
    const { worker } = this.entities;

    this.on('hike', async (req) => {
        const { ID } = req.data;

        if (!ID) {
            return req.reject(400, "ID is required");
        }
        console.log(`Received request to increment salary for Worker with ID : ${ID}`);

        // Start new transaction
        const tx = cds.transaction(req);
        try {
            // Retrieve the current salary amount of Worker
            const workers = await tx.read(worker).where({ ID: ID });
            if (!workers.length) {
                await tx.rollback();
                return req.reject(404, `Worker with ID ${ID} not found`);
            }

            const currentSalary = workers[0].salaryAmount;
            console.log(`Current salary of Worker with ID ${ID} is ${currentSalary}`);

            // Increment salary by 10%
            // Update operation
            const result = await tx.update(worker)
                .set({ salaryAmount: currentSalary + 20000 })
                .where({ ID: ID });
            
            if (result === 0) {
                await tx.rollback();
                return req.reject(500, `Failed to increment salary for Worker with ID ${ID}`);
            }

            // Commit the transaction
            await tx.commit();
            console.log(`Salary incremented successfully for Worker with ID ${ID}`);
            return req.reply(200, `Salary incremented successfully for Worker with ID ${ID}`);
        } catch (error) {
            console.error(`Error occurred while incrementing salary for Worker with ID ${ID}`);
            try {
                await tx.rollback();
            } catch (rollbackError) {
                console.error(`Error occurred while rolling back transaction for Worker with ID ${ID}`);
            }
            
            return req.reject(500, `Error occurred while incrementing salary for Worker with ID ${ID}`);
        }
    )
})
