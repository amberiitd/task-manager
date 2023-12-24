process.env.DYNAMODB_TABLE_NAME = "testDB";
const { expect } = require("chai");
const sinon = require("sinon");
const service = require("../src/service/taskManagerService");
const commonDB = require("../src/util/commonDB");
const { DB } = require("../src/configs/dbConfig");

const dynamoDBResponse = {
	Items: [
		{
			pk: "uid:user123",
			sk: "tas:task1",
			uid: "user123",
			title: "task1",
			status: "pending",
			// other properties...
		},
	],
};

describe("Task Service", () => {
	beforeEach(() => {
		sinon.stub(console, "error");
	});

	afterEach(() => {
		sinon.restore();
	});

	describe("createTask", () => {
		it("should create a task", async () => {
			const putStub = sinon.stub(DB, "put");
			putStub.returns({
				promise: () => Promise.resolve({ success: true }),
			});

			const body = {
				uid: "user123",
				title: "task1",
				status: "pending",
				// other properties...
			};

			const result = await service.createTask(body);

			expect(putStub.calledOnce).to.be.true;
			// expect(createItemStub.calledWithExactly(`uid:${body.uid}`, sinon.match.string, sinon.match.object)).to.be.true;
			expect(result).to.deep.equal({ message: "success" });

			putStub.restore();
		});

		it("should throw an error for an invalid status", async () => {
			const createItemStub = sinon.stub(commonDB, "createItem").resolves();
			const body = {
				uid: "user123",
				title: "task1",
				status: "invalid",
				// other properties...
			};

			try {
				await service.createTask(body);
				// Should not reach this point
				expect(true).to.be.false;
			} catch (error) {
				expect(error.message).to.equal("Invalid payload: status");
			}

			createItemStub.restore();
		});
	});

	describe("getTasks", () => {
		it("should get tasks", async () => {
			const queryStub = sinon.stub(DB, "query");
			queryStub.returns({
				promise: () => Promise.resolve(dynamoDBResponse),
			});
			const body = {
				uid: "user123",
			};

			const result = await service.getTasks(body);

			expect(queryStub.calledOnce).to.be.true;
			expect(result.statusCode).to.equal(200);
			expect(result.body).to.equal(
				JSON.stringify({ message: "success", data: dynamoDBResponse.Items })
			);

			queryStub.restore();
		});
	});

	describe("deleteTask", () => {
		it("should delete a task", async () => {
      const deleteStub = sinon.stub(DB, 'delete');
      deleteStub.returns({
        promise: () => Promise.resolve({success: true}),
      });

			const body = {
				uid: "user123",
				taskId: "task123",
			};

			const result = await service.deleteTask(body);

			expect(deleteStub.calledOnce).to.be.true;
			// expect(deleteItemStub.calledWithExactly(`uid:${body.uid}`, `task:${body.taskId}`)).to.be.true;
			expect(result.statusCode).to.equal(200);
			expect(result.body).to.equal(JSON.stringify({ message: "success" }));

			deleteStub.restore();
		});
	});

	describe("getFilteredTask", () => {
		it("should get tasks by status", async () => {
      const queryStub = sinon.stub(DB, "query");
			queryStub.returns({
				promise: () => Promise.resolve(dynamoDBResponse),
			});
			const body = {
				uid: "user123",
				status: "pending",
			};

			const result = await service.getFilteredTask(body);

			expect(queryStub.calledOnce).to.be.true;
			// expect(queryStub.calledWithExactly(`uid:${body.uid}`, body.status)).to.be.true;
			expect(result.statusCode).to.equal(200);
			expect(result.body).to.equal(
				JSON.stringify({ message: "success", data: dynamoDBResponse.Items })
			);

			queryStub.restore();
		});
	});

	describe("updateTask", () => {
		it("should update a task", async () => {
      const updateStub = sinon.stub(DB, "update");
			updateStub.returns({
				promise: () => Promise.resolve({success: true}),
			});

			const body = {
				uid: "user123",
				taskId: "task123",
				status: "completed",
			};

			const result = await service.updateTask(body);

			expect(updateStub.calledOnce).to.be.true;
			// expect(updateStub.calledWithExactly(`uid:${body.uid}`, `task:${body.taskId}`, { status: body.status })).to.be.true;
			expect(result.statusCode).to.equal(200);
			expect(result.body).to.equal(JSON.stringify({ message: "success" }));

			updateStub.restore();
		});
	});
});
