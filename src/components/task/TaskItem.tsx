import { useState } from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useUpdateTask } from "../../hooks/tasks";
import type { Task } from "../../types/tasks";
import DatePicker from "../DatePicker";
import TaskModal from "./TaskModal";

const TaskItem = ({ task }: { task: Task }) => {
  const [modal, setModal] = useState(false);
  const updateTaskMutation = useUpdateTask();

  return (
    <>
      <div
        className={`mt-3 flex h-12 w-full justify-start rounded border-[2px] border-lightbackground bg-background ${
          task.completed ? "opacity-50" : ""
        }`}
      >
        {task.completed ? (
          <button
            className="flex w-10 cursor-pointer items-center justify-center"
            onClick={() =>
              updateTaskMutation.mutate({ ...task, completed: false })
            }
          >
            <FaCheckSquare size={20} />
          </button>
        ) : (
          <button
            className="flex w-10 cursor-pointer items-center justify-center"
            onClick={() =>
              updateTaskMutation.mutate({ ...task, completed: true })
            }
          >
            <FaRegSquare size={20} />
          </button>
        )}
        <span
          className="flex flex-1 cursor-pointer items-center"
          onClick={() => setModal(true)}
        >
          <p className="mt-1">{task.name}</p>
        </span>
        <DatePicker
          value={task.date}
          onChange={(date) =>
            updateTaskMutation.mutate({ ...task, date: date })
          }
        />
      </div>
      {modal ? <TaskModal task={task} close={() => setModal(false)} /> : null}
    </>
  );
};

export default TaskItem;
