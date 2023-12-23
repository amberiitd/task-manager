import { Button, ButtonGroup } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../contexts/app";

const TaskFilter = () => {
	const { filterStatus, setFilterStatus, refreshTaskList } = useContext(AppContext);
	return (
		<ButtonGroup variant="text" sx={{ marginTop: 2 }}>
			<Button
				variant={filterStatus === "all" ? "contained" : "outlined"}
				color={filterStatus === "all" ? "primary" : "secondary"}
				onClick={() => setFilterStatus("all")}
			>
				All
			</Button>
			<Button
				variant={filterStatus === "pending" ? "contained" : "outlined"}
				color={filterStatus === "pending" ? "primary" : "secondary"}
				onClick={() => setFilterStatus("pending")}
			>
				Pending
			</Button>
			<Button
				variant={filterStatus === "in-progress" ? "contained" : "outlined"}
				color={filterStatus === "in-progress" ? "primary" : "secondary"}
				onClick={() => setFilterStatus("in-progress")}
			>
				In Progress
			</Button>
			<Button
				variant={filterStatus === "completed" ? "contained" : "outlined"}
				color={filterStatus === "completed" ? "primary" : "secondary"}
				onClick={() => setFilterStatus("completed")}
			>
				Completed
			</Button>
		</ButtonGroup>
	);
};

export default TaskFilter;
