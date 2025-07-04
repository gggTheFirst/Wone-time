import { useMemo, useCallback, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { type TimeEntryData, type ProjectData, type EditInfo } from "../types";
import { useLoginInfo } from "../stores/loginState";
import { useQuery } from "@tanstack/react-query";
import { getProjects, getTimeEntries } from "../services/api";
import { getProjectName } from "../services/getStatistics";
import { Button, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import NewTimeEntry from "./NewTimeEntry";
import { useSearchParams, useNavigate } from "react-router-dom";
function TimeTable({ deleteFn }: { deleteFn: (id: string) => void }) {
  //get from url
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get("projectId");
  const notes = searchParams.get("notes");
  const searchDate = searchParams.get("searchDate");

  //getting projects
  const userId = useLoginInfo.getState().userId;
  const projectQuery = useQuery<ProjectData[]>({
    queryKey: ["projects"],
    queryFn: () => getProjects(userId),
  });

  //get time entries
  const { data } = useQuery<TimeEntryData[]>({
    queryKey: ["timeEntries"],
    queryFn: () => getTimeEntries(userId),
  });

  const filteredResults = useMemo(() => {
    const new_data = data?.filter((entry) => {
      if (searchDate) {
        return new Date(entry.date).toISOString().split("T")[0] === searchDate;
      }
      // check if there is somethign in the notes field if not return all entries
      if (!projectId && !notes) {
        return true; // No filters applied, return all entries
      }
      if (notes) {
        return entry.notes.toLowerCase().includes(notes.toLowerCase());
      }
      if (projectId === "all") {
        return entry.projectId !== "";
      } else {
        return entry.projectId === projectId;
      }
    });
    return new_data || [];
  }, [data, projectId, notes]);

  // Handler functions for actions
  const handleEdit = useCallback((row: TimeEntryData) => {
    console.log("Edit entry:", row);
    const temp: EditInfo = {
      entryId: row.id,
      projectId: row.projectId,
      notes: row.notes,
      duration: row.hours,
    };
    handleClick();
    setEditInfo(temp);
  }, []);

  const handleDelete = useCallback((row: TimeEntryData) => {
    console.log("Delete entry:", row);
    deleteFn(row.id);
  }, []);
  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<TimeEntryData>[]>(
    () => [
      {
        accessorKey: "date", //access nested data with dot notation
        header: "Date",
        size: 150,
        Cell: ({ row }) => {
          return new Date(row.original.date).toISOString().split("T")[0];
        },
      },
      {
        accessorKey: "projectId",
        header: "Project",
        size: 150,
        Cell: ({ row }) => {
          const projects = projectQuery.data || [];
          return getProjectName(row.original.projectId, projects);
        },
      },
      {
        accessorKey: "notes",
        header: "Notes",
        size: 200,
      },
      {
        header: "Duration",
        size: 150,
        Cell: ({ row }) => {
          return `${row.original.hours}h ${row.original.minutes}m`;
        },
      },
      {
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Edit />}
              onClick={() => handleEdit(row.original)}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<Delete />}
              onClick={() => handleDelete(row.original)}
            >
              Delete
            </Button>
          </Box>
        ),
      },
    ],
    [handleEdit, handleDelete, projectQuery.data]
  );

  const table = useMaterialReactTable({
    columns,
    data: filteredResults,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enableTopToolbar: false,
  });

  const [show, setShow] = useState<boolean>(false);
  const [editInfo, setEditInfo] = useState<EditInfo | null>(null);
  const handleClick = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <MaterialReactTable table={table} />
      {show && (
        <NewTimeEntry
          myProjects={projectQuery.data}
          closeFn={handleClose}
          visibility={show}
          record_info={editInfo}
        />
      )}
    </>
  );
}

export default TimeTable;
