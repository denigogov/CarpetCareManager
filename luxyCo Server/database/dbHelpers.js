const database = require('./database');

const getFromDB = async (
  req,
  res,
  reqParams,
  reqBody,
  queryDB,
  errorMessage
) => {
  let queryParams = [];
  let bodyParams = [];

  if (req) {
    if (reqParams) {
      queryParams = [reqParams];
    }

    if (reqBody) {
      bodyParams = [reqBody];
    }
  }

  try {
    const [queryResult] = await database.query(queryDB, [
      ...queryParams,
      ...bodyParams,
    ]);

    console.log(queryResult);

    queryResult.length
      ? res.status(200).send(queryResult)
      : res.sendStatus(404);
  } catch (err) {
    console.log('Database Error:', err);
    res.status(500).send(errorMessage ? errorMessage : err.message);
  }
};

module.exports = {
  getFromDB,
};
