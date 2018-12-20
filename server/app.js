const express = require("express");
const bodyParser = require("body-parser");
const artist = require("./artist/route");
const app = express();

app.use(bodyParser.json());

app.use("/artist", artist);

app.get("/", (req, res) => {
  res.json({ ok: "ok" });
});

app.listen(3000, () => console.log("app listen on port 3000"));
