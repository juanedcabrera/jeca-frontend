import PlusIcon from '../icons/PlusIcon';
import { useMemo, useState } from 'react';
import { Column, Id, Job } from '../types';
import JobColumnContainer from './JobColumnContainer';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import JobCard from './JobCard';

const defaultCols: Column[] = [
  {
    id: 'considering',
    title: 'Considering',
  },
  {
    id: 'applied',
    title: 'Applied',
  },
  {
    id: 'interviewing',
    title: 'Interviewing',
  },
  {
    id: 'offer',
    title: 'Offer',
  },
  {
    id: 'rejected',
    title: 'Rejected',
  },
];

const defaultJobs: Job[] = [
];

function JobKanbanBoard() {
  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [jobs, setJobs] = useState<Job[]>(defaultJobs);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
    "
    >
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <JobColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createJob={createJob}
                  deleteJob={deleteJob}
                  updateJob={updateJob}
                  jobs={jobs.filter((job) => job.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>
          <button
            onClick={() => {
              createNewColumn();
            }}
            className="
      h-[60px]
      w-[350px]
      min-w-[350px]
      cursor-pointer
      rounded-lg
      bg-mainBackgroundColor
      border-2
      border-columnBackgroundColor
      p-4
      ring-rose-500
      hover:ring-2
      flex
      gap-2
      "
          >
            <PlusIcon />
            Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <JobColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createJob={createJob}
                deleteJob={deleteJob}
                updateJob={updateJob}
                jobs={jobs.filter(
                  (job) => job.columnId === activeColumn.id
                )}
              />
            )}
            {activeJob && (
              <JobCard
                job={activeJob}
                deleteJob={deleteJob}
                updateJob={updateJob}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function createJob(columnId: Id) {
    const newJob: Job = {
      id: generateId(),
      columnId,
      content: `Job ${jobs.length + 1}`,
      companyName: '',
      jobTitle: '',
      jobURL: '',
    };

    setJobs([...jobs, newJob]);
  }

  function deleteJob(id: Id) {
    const newJobs = jobs.filter((job) => job.id !== id);
    setJobs(newJobs);
  }

  function updateJob(id: Id, updatedJob: Partial<Job>) {
    const newJobs = jobs.map((job) => {
      if (job.id !== id) return job;
      return { ...job, ...updatedJob };
    });
  
    setJobs(newJobs);
  }

  function createNewColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newJobs = jobs.filter((t) => t.columnId !== id);
    setJobs(newJobs);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === 'Column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'Job') {
      setActiveJob(event.active.data.current.job);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveJob(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAJob = active.data.current?.type === 'Job';
    const isOverAJob = over.data.current?.type === 'Job';

    if (!isActiveAJob) return;

    // Im dropping a Job over another Job
    if (isActiveAJob && isOverAJob) {
      setJobs((jobs) => {
        const activeIndex = jobs.findIndex((t) => t.id === activeId);
        const overIndex = jobs.findIndex((t) => t.id === overId);

        jobs[activeIndex].columnId = jobs[overIndex].columnId;

        return arrayMove(jobs, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === 'Column';

    // Im dropping a Job over a column
    if (isActiveAJob && isOverAColumn) {
      setJobs((jobs) => {
        const activeIndex = jobs.findIndex((t) => t.id === activeId);

        jobs[activeIndex].columnId = overId;

        return arrayMove(jobs, activeIndex, activeIndex);
      });
    }
  }
}

function generateId() {
  /* Generate a random number between 0 and 10000 */
  return Math.floor(Math.random() * 10001);
}

export default JobKanbanBoard;
