import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import styles from "./SideBar.module.scss";
import SideBarData from "./SideBarData.js";

const SideBar = () => {
    const [open, setOpen] = useState(true);
    return (
        <aside
            className={
                open ? `${styles.sidebar} ${styles.open}` : styles.sidebar
            }
        >
            {open ? (
                <FaIcons.FaAngleDoubleLeft onClick={() => setOpen(false)} />
            ) : (
                <FaIcons.FaBars onClick={() => setOpen(true)} />
            )}
            {open ? <h2>Revive</h2> : <hr />}
            <ul>
                {SideBarData.map((item, index) => (
                    <li key={index}>
                        <Link to={item.path}>
                            {item.icon}
                            {open && item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SideBar;
