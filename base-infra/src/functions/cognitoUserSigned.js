
exports.handler = async (event) => {
	console.log("cognito event", event);
	const { userName, request } = event;
	event.response.autoConfirmUser = true;
	return event;
};
