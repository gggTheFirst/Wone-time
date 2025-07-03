import { Box, Popover, Typography, Button } from "@mui/material";
import { deleteTimeRecord } from "../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import BufferLoader from "./buffer";

function DeleteConfirmation({
  visibilty,
  closeFn,
  id,
}: {
  visibilty: boolean;
  closeFn: () => void;
  id: string;
}) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteTimeRecord,
    onSuccess: () => {
      // Refresh data after deletion
      queryClient.invalidateQueries(["timeEntries"]);
      alert("You have successfully deleted the record");
      closeFn();
    },
  });

  function handleClick() {
    deleteMutation.mutate(id);
  }
  return (
    <>
      <Popover
        keepMounted={false}
        open={visibilty}
        onClose={closeFn}
        anchorReference="anchorPosition"
        anchorPosition={{
          top: window.innerHeight / 2,
          left: window.innerWidth / 2,
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Are you sure you want to delete this entry?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ px: 3, mx: 1 }}
              onClick={handleClick}
            >
              Confirm
            </Button>
            <Button variant="outlined" sx={{ px: 3, mx: 1 }} onClick={closeFn}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Popover>
      {deleteMutation.isPending && <BufferLoader />}
    </>
  );
}

export default DeleteConfirmation;
