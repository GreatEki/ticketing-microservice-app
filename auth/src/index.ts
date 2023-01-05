import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/error-handler";

const app = express();

app.use(express.json());

app.use("/api/users", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}!!!`));
