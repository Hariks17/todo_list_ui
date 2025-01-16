import React, { useState, useEffect } from "react";
import "./TaskModal.css";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: {
    title: string;
    due_date: string;
    completed: boolean;
  }) => void;
  initialData?: { title: string; due_date: string };
}

const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [dueDate, setDueDate] = useState(initialData?.due_date || "");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDueDate(initialData.due_date || "");
    } else {
      setTitle("");
      setDueDate("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && dueDate) {
      onSave({ title, due_date: dueDate, completed: false });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{initialData ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
