require("dotenv").config();
const argon2 = require("argon2");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// Hashing password
const hashpassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedPassword) => {
      console.log(hashedPassword);

      req.body.password = hashedPassword;
      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const jwt = require("jsonwebtoken");

// VERIFYING PASSWORD  WHEN USER LOGIN !!
const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password)
    .then((isVerified) => {
      //  ifVerified return true or false if the password match return true!
      if (isVerified) {
        // res.send("credentials are valid");
        const payload = { sub: req.user.id, name: req.user.firstname };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "9h",
        });

        // console.log(payload);

        res.send({
          token,
          name: req.user.first_name,
          id: req.user.id,
          department: req.user.department_id,
        });
      } else {
        res.status(401).send("wrong password or username");
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    console.log(authorizationHeader);
    console.log(req);

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");
    console.log(type, token);

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }
    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashpassword,
  verifyPassword,
  verifyToken,
};
