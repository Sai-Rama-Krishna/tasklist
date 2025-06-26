import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { ref, get, onValue, update } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

const EmployeeDashboard = () => {
  const [user] = useAuthState(auth);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const tasksRef = ref(db, "tasks/");
    const unsubscribe = onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      const tasksArray = [];

      for (const taskId in data) {
        const task = data[taskId];
        if (
          task.status === "available" &&
          !task.assignedTo // only show unassigned
        ) {
          tasksArray.push({ id: taskId, ...task });
        }
      }

      setAvailableTasks(tasksArray);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAcceptTask = async (taskId) => {
    if (!user) return;

    try {
      await update(ref(db, `tasks/${taskId}`), {
        status: "in-progress",
        assignedTo: user.uid,
        acceptedAt: new Date().toISOString(),
      });

      alert("Task accepted!");
    } catch (err) {
      console.error("Failed to accept task:", err.message);
    }
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Employee Dashboard</h2>
      <h4>Available Tasks</h4>

      {availableTasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        availableTasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
              borderRadius: 6,
            }}
          >
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Client ID:</strong> {task.createdBy}
            </p>
            <button onClick={() => handleAcceptTask(task.id)}>
              Accept Task
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default EmployeeDashboard;
