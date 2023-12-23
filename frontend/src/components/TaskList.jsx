import { Divider, List, ListItem } from "@mui/material";
import TaskItem from "./TaskItem";
import { useContext, useEffect } from "react";
import { AppContext } from "../contexts/app";

const TaskList = () => {
	const { taskList } = useContext(AppContext);
	return (
		<List>
			<Divider />
			{taskList.map((task, index) => (
				<div key={`task-item-${task.taskId || index}`}>
					<ListItem disablePadding >
						<TaskItem {...task} />
					</ListItem>
					<Divider />
				</div>
			))}
		</List>
	);
};

export default TaskList;
