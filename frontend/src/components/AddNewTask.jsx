import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createTask } from "../service/api";
import { AppContext } from "../contexts/app";

const AddNewTask = () => {
	const [open, setOpen] = useState(false);
	const { refreshTasks } = useContext(AppContext);
	const {
		handleSubmit,
		control,
    reset,
		formState: { errors },
	} = useForm({
		defaultValues: { title: "", description: "", status: "pending" },
	});

	return (
		<Accordion onChange={(e, expanded) => setOpen(expanded)} sx={{backgroundColor: "inherit"}}>
			<AccordionSummary style={{ display: "flex", alignItems: "center" }}>
				{!open ? <AddIcon style={{ marginRight: 5 }} /> : <CloseIcon style={{ marginRight: 5 }} />}
				<Typography variant="h5" fontWeight={600}>Add New Task</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					component="form"
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit((data) => {
						console.log("add new", data);
						createTask(data)
							.then(() => {
                reset();
								toast.info("Task added");
								// dispatchTaskAction({action: "addTask", data: })
								refreshTasks();
							})
							.catch((error) => {
								console.error(error);
								toast.error(error.message);
							});
					})}
				>
					<Stack maxWidth={300} spacing={2}>
						<Controller
							control={control}
							name="title"
							rules={{
								required: true,
								validate: (data) => {
									return data.length > 2;
								},
							}}
							render={({ field }) => (
								<TextField
									size="small"
									{...field}
									type="text"
									label="Title"
									variant="outlined"
									error={Boolean(errors.title)}
									helperText={Boolean(errors.title) ? "Title is required & length must be > 2" : null}
								/>
							)}
						/>

						<Controller
							control={control}
							name="description"
							render={({ field }) => (
								<TextField
									multiline
									size="small"
									{...field}
									type="text"
									label="Description"
									variant="outlined"
									error={Boolean(errors.description)}
								/>
							)}
						/>

						<Controller
							control={control}
							name="status"
							render={({ field }) => (
								<FormControl>
									<InputLabel>Status</InputLabel>
									<Select label="Status" {...field}>
										<MenuItem value={"pending"}>Pending</MenuItem>
										<MenuItem value={"in-progress"}>In Progress</MenuItem>
										<MenuItem value={"completed"}>Completed</MenuItem>
									</Select>
								</FormControl>
							)}
						/>
					</Stack>
					<Box sx={{ marginTop: 2 }}>
						<Button size="small" type="submit" variant="outlined" disabled={Boolean(errors.title)}>
							Add
						</Button>
					</Box>
				</Box>
			</AccordionDetails>
		</Accordion>
	);
};

export default AddNewTask;
