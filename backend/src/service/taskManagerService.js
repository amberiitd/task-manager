const { createItem, getAllItems, deleteItem, getTaskByStatus, updateItem } = require("../util/commonDB");
const { makeid } = require("../util/util");

async function createTask(body) {
	const taskId = makeid(8);
	await createItem(`uid:${body.uid}`, `task:${taskId}`, {
		itemType: "task",
		taskId,
		...body,
	});

	return {
		message: "success",
	};
}

const getTasks = async (body) => {
  const items = await getAllItems(`uid:${body.uid}`, "task")
  
  return {
      statusCode: 200,
      body: JSON.stringify({
          'message': 'success',
          'data': items
      })
  }
}

const deleteTask = async (body) => {
  await deleteItem(`uid:${body.uid}`, `task:${body.taskId}`)
  return {
      statusCode: 200,
      body: JSON.stringify({
          'message': 'success',
      })
  }
}

const getFilteredTask = async (body) => {
  const items = await getTaskByStatus(`uid:${body.uid}`, body.status)
  
  return {
      statusCode: 200,
      body: JSON.stringify({
          'message': 'success',
          'data': items
      })
  }
}

const updateTask = async (body) => {
  await updateItem(`uid:${body.uid}`, `task:${body.taskId}`, {status: body.status})
  return {
      statusCode: 200,
      body: JSON.stringify({
          'message': 'success',
      })
  }
}

module.exports = {
	createTask,
  getTasks,
  deleteTask,
  getFilteredTask,
  updateTask
};
