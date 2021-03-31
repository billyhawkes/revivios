import React, { useEffect, useState } from "react";
import axios from "axios";
import Habit from "./Habit";

type Habit = {
    habit_id: number;
    title: string;
};

const HabitTracker = () => {
    const [habits, setHabits] = useState<Habit[] | undefined>();

    useEffect(() => {
        getHabits();
    }, []);

    const getHabits = async () => {
        const res = await axios.get("/habits");
        const data: Habit[] = [...res.data.rows];
        setHabits([...data]);
    };

    return (
        <div>
            {habits &&
                habits.map((habit) => (
                    <Habit
                        title={habit.title}
                        id={habit.habit_id}
                        key={habit.habit_id}
                    />
                ))}
        </div>
    );
};

export default HabitTracker;
