import { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import { Id, Job } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  job: Job;
  deleteJob: (id: Id) => void;
  updateJob: (id: Id, job: Job) => void;
}

function JobCard({ job, deleteJob, updateJob }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedJob, setEditedJob] = useState<Job>({ ...job });

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: job.id,
    data: {
      type: "Job",
      job,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
    setMouseIsOver(false);
  };

  const handleSave = () => {
    updateJob(job.id, editedJob);
    toggleEditMode();
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-mainBackgroundColor p-2.5 h-[150px] min-h-[150px] items-center flex text-left rounded-xl cursor-grab relative
        ${isDragging ? "opacity-30" : "hover:ring-2 hover:ring-inset hover:ring-rose-500"}
        ${editMode ? "hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-text" : ""}
      `}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={editMode ? undefined : toggleEditMode}
    >
      {editMode ? (
        <div className="w-full h-full grid gap-2 grid-cols-2">
          <input
            className="border-2 border-gray-400 rounded p-2 focus:outline-none text-black"
            value={editedJob.companyName}
            onChange={(e) => setEditedJob({ ...editedJob, companyName: e.target.value })}
            placeholder="Company Name"
          />
          <input
            className="border-2 border-gray-400 rounded p-2 focus:outline-none text-black"
            value={editedJob.jobTitle}
            onChange={(e) => setEditedJob({ ...editedJob, jobTitle: e.target.value })}
            placeholder="Job Title"
          />
          <input
            className="border-2 border-gray-400 rounded p-2 focus:outline-none col-span-2 text-black"
            value={editedJob.jobURL}
            onChange={(e) => setEditedJob({ ...editedJob, jobURL: e.target.value })}
            placeholder="Job URL"
          />
          <div className="col-span-2">
            <button
              className="bg-mainBackgroundColor text-white px-4 py-2 rounded hover:bg-rose-500"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-mainBackgroundColor text-white px-4 py-2 rounded ml-2 hover:bg-rose-500"
              onClick={toggleEditMode}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
          <p className="text-md font-bold">{editedJob.companyName}</p>
          <p className="text-md font-semibold">{editedJob.jobTitle}</p>
          <a className="text-rose-500 hover:underline" href={editedJob.jobURL} target="_blank" rel="noopener noreferrer">
            {editedJob.jobURL}
          </a>
        </div>
      )}

      {mouseIsOver && !editMode && (
        <button
          onClick={() => {
            deleteJob(job.id);
          }}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <TrashIcon />
        </button>
      )}
    </div>
  );
}

export default JobCard;

// salary, contact, notes, todos
// flags for each column
// different db for diff information
// basic form for mvp - don't make them "required"
// web socket for real time