import express from "express";

const app = express();

app.use(express.json());

app.get("/api/users/currentuser", (req, res) => {
  res.send("Hi there");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}!!!`));
