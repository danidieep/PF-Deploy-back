const router = require("express").Router();
const { Adress } = require("../db");

router.get("/", async (req, res) => {
  const { email } = req.headers;
  console.log(email, "email req.headers");
  const adresses = await Adress.findOne({ where: { email } });
  res.status(200).send(adresses);
});

router.post("/", async (req, res) => {
  const { payload, email } = req.body;
  console.log(req.body, "req.body");
  Adress.create({
    email: email,
    street: payload.street,
    number: payload.number,
    postalCode: payload.postalCode,
  }),
    res.status(200).send("Adress");
});

router.put("/", async (req, res) => {
  const { payload, email } = req.body;
  if (payload.street.length) {
    Adress.update({ street: payload.street }, { where: { email } });
  }
  if (payload.number.length) {
    Adress.update({ number: payload.number }, { where: { email } });
  }
  if (payload.postalCode.length) {
    Adress.update({ postalCode: payload.postalCode }, { where: { email } });
  }
  res.status(200).send("Adress");
});

module.exports = router;
