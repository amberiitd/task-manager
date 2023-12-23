import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { deleteTask } from "../service/api";
import { AppContext } from "../contexts/app";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDelete({ taskId, open, onClose }) {
  const { bigScreen, refreshTasks } = React.useContext(AppContext);

	const onDelete = () => {
		deleteTask(taskId)
			.then(() => {
				toast.info("Task deleted");
				refreshTasks();
				onClose();
			})
			.catch((error) => {
				console.error(error);
				toast.error(error.message);
			});
	};
	return (
		<React.Fragment>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={onClose}
				aria-describedby="alert-dialog-slide-description"
			>
				<DialogTitle>{"Are you sure?"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-slide-description">
						This will permanently delete the task. Are you sure you want to delete the task?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={onDelete} color="error">
						Delete
					</Button>
					<Button onClick={onClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
