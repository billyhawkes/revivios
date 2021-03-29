import React from "react";
import { Link } from "react-router-dom";

const MenuBar = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/habit">Habits</Link>
                </li>
            </ul>
        </div>
    );
};

export default MenuBar;
