import {
	Badge,
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Chip,
	Collapse,
	Container,
	FormControl,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useContext, useMemo, useState } from "react";
import { AppContext } from "../contexts/app";
import { toast } from "react-toastify";
import { deleteTask, updateTask } from "../service/api";
import moment from "moment";
import ConfirmDelete from "./ConfirmDelete";
import { useTheme } from "@emotion/react";
import { tokens } from "../contexts/theme";
// borderBottom={1} borderTop={1} borderColor={"whitesmoke"}
const TaskItem = ({ taskId, title, description, status, createdAt, updatedAt }) => {
  const theme = useTheme();
	const colors = useMemo(() => tokens(theme.palette.mode), [theme]);
	const { bigScreen, refreshTasks } = useContext(AppContext);
	const [open, setOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	const onUpdate = (e) => {
		updateTask(taskId, { status: e.target.value })
			.then(() => {
				toast.info("Task status updated");
				refreshTasks();
			})
			.catch((error) => {
				toast.error(error.message);
			});
	};

	return (
		<Box width={"100%"} sx={{ backgroundColor: open ? colors.bg[100] : "unset" }}>
			<Box display={"flex"} sx={{ padding: 1, paddingLeft: "16px" }}>
				{bigScreen && (
					<IconButton
						aria-label="expand"
						size="small"
						sx={{ marginRight: 5 }}
						onClick={() => setDeleteModal(true)}
					>
						<DeleteForeverIcon color="error" />
					</IconButton>
				)}
				<Typography variant="h5" fontWeight={600} lineHeight={2}>
					{title}
				</Typography>
				<Box style={{ marginLeft: "auto" }}>
					{bigScreen && (
						<select
							label="Age"
							style={{
								borderRadius: 20,
								padding: "5px 0px 5px 10px",
								backgroundColor: "inherit",
                color: colors.primary[900]
							}}
							onChange={onUpdate}
							value={status}
						>
							<option value={"pending"}>Pending</option>
							<option value={"in-progress"}>In Progress</option>
							<option value={"completed"}>Completed</option>
						</select>
					)}
					<IconButton
						aria-label="expand"
						size="small"
						sx={{ marginLeft: "10" }}
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</Box>
			</Box>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<div style={{ padding: 20 }}>
          <Typography fontWeight={600}>Description:</Typography>
					<Box sx={{ padding: 1 }}>{description}</Box>
					{!bigScreen && (
						<Box display={"flex"} flexWrap={"wrap"} padding={"20px 0 20px 0"}>
							<Button
								variant="outlined"
								aria-label="expand"
								size="small"
								sx={{ marginRight: 5 }}
								color="error"
								endIcon={<DeleteForeverIcon color="error" />}
								onClick={() => setDeleteModal(true)}
							>
								Delete
							</Button>
							<FormControl sx={{ width: 150 }} size="small">
								<InputLabel>Status</InputLabel>
								<Select label="Status" size="small" value={status} onChange={onUpdate}>
									<MenuItem value={"pending"}>Pending</MenuItem>
									<MenuItem value={"in-progress"}>In Progress</MenuItem>
									<MenuItem value={"completed"}>Completed</MenuItem>
								</Select>
							</FormControl>
						</Box>
					)}
					<Grid container columnSpacing={4}>
						<Grid item>
							<span style={{ fontWeight: 600 }}>Created At:</span>{" "}
							{createdAt ? moment.unix(createdAt).format("DD MMM YYYY, hh:mm A") : "-"}
						</Grid>
						<Grid item>
							<span style={{ fontWeight: 600 }}>Updated At:</span>{" "}
							{createdAt ? moment.unix(updatedAt).format("DD MMM YYYY, hh:mm A") : "-"}
						</Grid>
					</Grid>
				</div>
			</Collapse>
			<ConfirmDelete open={deleteModal} onClose={() => setDeleteModal(false)} taskId={taskId} />
		</Box>
	);
};

export default TaskItem;
