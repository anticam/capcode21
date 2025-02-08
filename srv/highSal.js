const cds = require('@sap/cds');

module.exports = function () {
    this.on('getHighestSalary', async (req) => {

        try {
            const { worker } = this.entities('india.db.master');

            // fetch the highest salary
            const highestSalaryWorker = await cds.run(
                SELECT.one`salaryAmount as highestSalary`
                    .from  (worker)
                    .orderBy  `salaryAmount desc`);


            if (highestSalaryWorker) {
                return highestSalaryWorker;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching hightest Salary:', error);
            return null;
        }


        //const result = await SELECT.one
        //    .from(worker)
        //    .columns('salaryAmount')
        //    .orderBy('salaryAmount', 'desc')



    });
}