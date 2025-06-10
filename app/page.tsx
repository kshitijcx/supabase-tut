"use client";
import { supabase } from "@/supabase-client";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const Home = () => {
  const [task, setTask] = useState({ title: "", description: "" });
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(task).single(); //can insert one or multiple items using array of objects
    if (error) {
      console.error("Error adding task", error.message);
      return;
    }
    setTask({ title: "", description: "" });
  };

  const fetchTasks = async () => {
    const { error, data } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error adding task", error.message);
      return;
    }
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(tasks);

  return (
    <div className="max-w-xl mx-auto mt-30">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 border rounded-xl gap-10"
      >
        <input
          type="text"
          placeholder="title"
          onChange={(e) =>
            setTask((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          placeholder="description"
          onChange={(e) =>
            setTask((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <button
          type="submit"
          className="cursor-pointer bg-gray-400 py-2 rounded-xl text-black"
        >
          Add Task
        </button>
      </form>

      <div>
        <ul>
          {tasks.map((item, index) => (
            <li key={index}>
              <div>
                <h3>Title</h3>
                <p>{item.title}</p>
              </div>
              <div>
                <h3>Description</h3>
                <p>{item.description}</p>
              </div>
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
