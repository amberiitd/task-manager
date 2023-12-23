import { API } from "aws-amplify";

export const createTask = (data) => {
	return API.post("base_url", "/create/task", {
		body: data,
	});
};

export const getAllTasks = () => {
	return API.get("base_url", "/getall/task").then((data) => JSON.parse(data.body).data);
};

export const getTasksByStatus = (status) => {
	return API.post("base_url", "/getbystatus/task", {
		body: { status },
	}).then((data) => JSON.parse(data.body).data);
};

export const deleteTask = (taskId) => {
	return API.del("base_url", `/task/${taskId}`).then((data) => JSON.parse(data.body).data);
};

export const updateTask = (taskId, data) => {
	return API.put("base_url", `/task/${taskId}`, {
		body: data,
	}).then((data) => JSON.parse(data.body).data);
};
