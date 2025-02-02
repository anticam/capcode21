const cds = require('@sap/cds');
const { worker }    = cds.entities("india.db.master"); //.worker;

const NewCQLService = function (srv) {
    // read data from worker table
    srv.on('READ', 'readWorker', async (req, res) => {
        //const results = await cds.tx(req).run(SELECT.from(worker));
        
        //const results = await SELECT.from(worker);
        const results = await SELECT.from(worker).where({ "firstName": "Nitika" });
        return results;
    });

    // inserting data into worker table
    srv.on('CREATE', 'insertWorker', async (req, res) => {

        //const { firstName, lastName } = req.data;
        let results = await INSERT.into(worker).entries(req.data)
        .then((resolve, reject) => {
            if (typeof (resolve) !== undefined) {
                console.log("Data inserted successfully");
                return req.data;
            } else {
                console.log("Data insertion failed");
                return error(500, "There was an error while inserting data");
            }
            //return resolve;
        }).catch((err) => {
            req.error(500, "Below error occurred: " + err.toString());
                console.log("Data insertion failed");
            });
        return results;
    });

    // updating data into worker table
    srv.on('UPDATE', 'updateWorker', async (req, res) => {
        const { ID, firstName, lastName } = req.data;
        const results = await UPDATE(worker).set(
            {
                "firstName": firstName,
                "lastName": lastName
            }
        ).where({ "ID": ID })
            .then((resolve, reject) => {
                if (typeof (resolve) !== undefined) {
                    console.log("Data updated successfully");
                    return req.data;
                } else {
                    console.log("Data update failed");
                    return error(500, "There was an error while updating data");
                }
            }).catch((err) => {
                req.error(500, "Below error occurred: " + err.toString());
                console.log("Data update failed");
            });
        return results;
    });

    // Delete data from worker table
    srv.on('DELETE', 'deleteWorker', async (req, res) => {
        const { ID } = req.data;
        const results = await DELETE.from(worker).where({ "ID": ID })
            .then((resolve, reject) => {
                if (typeof (resolve) !== undefined) {
                    console.log("Data deleted successfully");
                    return req.data;
                } else {
                    console.log("Data deletion failed");
                    return error(500, "There was an error while deleting data");
                }
            }).catch((err) => {
                req.error(500, "Below error occurred: " + err.toString());
                console.log("Data deletion failed");
            });
        return results;
    });

}

module.exports = NewCQLService;
