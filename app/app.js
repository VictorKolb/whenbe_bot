const express = require("express");
const artist = require("./artist/index");
const app = express();

app.use("/artist", artist);

app.get("/", (req, res) => {
  res.json({ ok: "ok" });
});

app.listen(3000, () => console.log("app listen on port 3000"));
