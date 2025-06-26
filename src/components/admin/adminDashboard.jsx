import React, { useEffect, useState } from "react";
import { ref, get, update } from "firebase/database";
import { db } from "../../../firebase";
import Header from "../common/Header";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskRef = ref(db, "tasks");
        const snapshot = await get(taskRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const taskList = Object.entries(data).map(([id, task]) => ({
            id,
            ...task,
          }));
          setTasks(taskList);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleApprove = async (taskId) => {
    const newAmount = prompt("Enter amount for employee:");
    if (!newAmount) return;

    try {
      const taskRef = ref(db, `tasks/${taskId}`);
      await update(taskRef, {
        approved: true,
        employeeAmount: parseFloat(newAmount),
        status: "available",
      });
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? {
                ...t,
                approved: true,
                employeeAmount: newAmount,
                status: "available",
              }
            : t
        )
      );
    } catch (error) {
      console.error("Error approving task:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Pending Tasks</h2>
        {tasks.length === 0 ? (
          <p>No tasks found.</p>
        ) : (
          <ul className="space-y-4">
            {tasks
              .filter((task) => !task.approved)
              .map((task) => (
                <li
                  key={task.id}
                  className="border p-4 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-bold text-lg">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                    <p className="text-sm">
                      Initial Amount: ₹{task.initialAmount}
                    </p>
                    <p className="text-xs text-gray-500">
                      Client ID: {task.clientId}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApprove(task.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Approve & Set Amount
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
