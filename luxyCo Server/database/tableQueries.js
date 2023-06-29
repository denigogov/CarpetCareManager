const database = require("./database");

const tableDepartments = (_, res) => {
  database
    .query("select * from  departments")
    .then(([department]) => {
      res.json(department);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  tableDepartments,
};
