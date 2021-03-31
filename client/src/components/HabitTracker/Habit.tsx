import React from "react";

interface Props {
    id: number;
    title: string;
}

const Habit = (props: Props) => {
    return (
        <div>
            Title:
            <h2>{props.title}</h2>
        </div>
    );
};

export default Habit;
