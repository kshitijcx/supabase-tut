"use client";
import { supabase } from "@/supabase-client";
import { useState } from "react";

const Home = () => {
  const [task, setTask] = useState({ title: "", description: "" });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { error } = await supabase.from("tasks").insert(task).single(); //can insert one or multiple items using array of objects
    if (error) {
      console.error("Error adding task", error.message);
    }
    setTask({ title: "", description: "" });
  };

  return (
    <div className="max-w-xl mx-auto mt-30">
      <form onSubmit={handleSubmit} className="flex flex-col p-5 border rounded-xl gap-10">
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
        <button type="submit" className="cursor-pointer bg-gray-400 py-2 rounded-xl text-black">Add Task</button>
      </form>
    </div>
  );
};
export default Home;
