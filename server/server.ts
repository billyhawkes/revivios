import express from "express";
const app = express();

// Middleware
app.use(express.json());

// ROUTES //
app.get("/", (req, res) => {
    return res.send("Hello");
});

// Habits Page
import habitRouter from "./routes/habits";
app.use("/habits", habitRouter);

// Establish Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
