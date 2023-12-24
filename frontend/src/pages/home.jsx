import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { API } from "aws-amplify";
import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/auth";
import AddNewTask from "../components/AddNewTask";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";

const HomePage = () => {

	const { auth } = useContext(AuthContext);
	const {
		handleSubmit,
		formState: { errors },
		setValue,
		control,
		watch,
	} = useForm({
		defaultValues: {  },
	});
	const formValues = watch();

	return (
		<Box marginTop={5} width={500} maxWidth={"90%"}>
      <AddNewTask />
      <TaskFilter />
      <TaskList />
		</Box>
	);
};

export default HomePage;
