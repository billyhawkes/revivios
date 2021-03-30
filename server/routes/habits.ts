import express from "express";
const router = express.Router();
import pool from "../db";

// Habit Type
type Habit = {
    title: String;
};

// Add Habit
router.post("/", async (req, res) => {
    const habit: Habit = req.body;

    try {
        const newHabit = await pool.query(
            `INSERT INTO habits(title) VALUES('${habit.title}') RETURNING *`
        );
        res.json(newHabit);
    } catch (err) {
        console.error(err.message);
        res.status(404).json({ msg: err.message });
    }
});

// Get All Habits
router.get("/", async (req, res) => {
    try {
        const habitsList = await pool.query("SELECT * FROM habits");
        res.json(habitsList);
    } catch (err) {
        console.error(err.message);
        res.status(404).json({ msg: err.message });
    }
});

// Get Specific Habit
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const habit = await pool.query(
            `SELECT * FROM habits WHERE habit_id = ${id}`
        );
        res.json(habit);
    } catch (err) {
        console.error(err.message);
        res.status(404).json({ msg: err.message });
    }
});

// Change Habit
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const newHabit: Habit = req.body;

    try {
        const habit = await pool.query(
            `UPDATE habits SET title = '${newHabit.title}' WHERE habit_id = ${id}`
        );
        res.json(habit);
    } catch (err) {
        console.error(err.message);
        res.status(404).json({ msg: err.message });
    }
});

// Delete Habit
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const habit = await pool.query(
            `DELETE FROM habits WHERE habit_id = ${id}`
        );
        res.json(habit);
    } catch (err) {
        console.error(err.message);
        res.status(404).json({ msg: err.message });
    }
});

export default router;
