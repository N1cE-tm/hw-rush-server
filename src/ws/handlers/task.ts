import type { ClientSocket } from "@/ws/types";
import { Task } from "@/models";

/**
 * Get all Tasks from DB
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const getAll = async (_: any, ws: ClientSocket) => {
	try {
		const _tasks = await Task.query().withGraphFetched({ users: true });
		if (!_tasks) throw new Error("Error fetch tasks");

		const tasks: any = {};
		const task_peoples: any = {};
		for (let task of _tasks) {
			tasks[task.id] = {
				id: task.id,
				project_id: task.project_id,
				title: task.title,
				description: task.description,
				start_at: task.start_at,
				end_at: task.end_at,
			};

			if (task.users && task.users.length > 0) {
				const relation: any = [];
				for (let user of task.users as any) {
					relation.push({
						task_id: task.id,
						user_id: user.id,
						date: user.date,
						time: user.time,
						day: +user.date / (24 * 60 * 60 * 1000),
					});
				}

				task_peoples[task.id] = relation;
			}
		}

		ws.json("task/all", {
			success: true,
			data: {
				tasks,
				task_peoples,
			},
		});
	} catch (error: any) {
		ws.json("task/all", { success: false, message: error.message });
	}
};

/**
 * Remove Task node from DB with broadcast notification
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const remove = async (data: any, ws: ClientSocket) => {
	try {
		if (!data || !data.id) throw new Error("Need task id");

		const task = await Task.query().deleteById(data.id);
		if (!task) throw new Error("Task not deleted");

		ws.notify("task/delete", { success: true, data: { id: data.id } });
	} catch (error: any) {
		ws.json("task/delete", { success: false, message: error.message });
	}
};

/**
 * Create new Task in DB with broadcast notification
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const create = async (data: any, ws: ClientSocket) => {
	try {
		if (!data || !data.team_id || !data.project_id || !data.title || !data.start_at)
			throw new Error("All fields must be filled!");

		const newTask = await Task.query()
			.withGraphFetched({
				users: true,
			})
			.insertAndFetch({
				team_id: data.team_id,
				project_id: data.project_id,
				created_by: ws.user.id,
				title: data.title,
				status: "new",
				is_archived: false,
				start_at: data.start_at,
				end_at: data.end_at,
			});

		if (!newTask) throw new Error("Error task creation");

		const users = [];
		if (newTask.users) {
			for (let user of newTask.users as any[]) {
				users.push({
					task_id: newTask.id,
					user_id: user.id,
					date: user.date,
					time: user.time,
					day: +user.date / (24 * 60 * 60 * 1000),
				});
			}
		}

		ws.notify("task/create", {
			success: true,
			data: {
				task: {
					id: newTask.id,
					project_id: newTask.project_id,
					title: newTask.title,
					description: newTask.description,
					start_at: newTask.start_at,
					end_at: newTask.end_at,
				},
				peoples: users,
			},
		});
	} catch (error: any) {
		ws.json("task/create", { success: false, message: error.message });
	}
};

/**
 * Update DB Task node with broadcast notify about changes
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const update = async (data: any, ws: ClientSocket) => {
	try {
		if (!data || data.id || !data.project_id || !data.title || !data.start_at)
			throw new Error("All fields must be filled!");

		const task = await Task.query().updateAndFetchById(data.id, {
			project_id: data.project_id,
			title: data.title,
			start_at: data.start_at,
			end_at: data.end_at || null,
		});

		if (!task) throw new Error("Error task update");

		// ws.send(JSON.stringify({ method: "task/create", id: ws.id, payload: { success: true, data: task } }));

		ws.notify("task/update", { success: true, data: task });
	} catch (error: any) {
		ws.json("task/update", { success: false, message: error.message });
	}
};

/**
 * Update Task dates in DB with broadcast notify about changes
 * @param {object} data - data from WS
 * @param {ClientSocket} ws - WS Client Instance
 */
export const updatePosition = async (data: any, ws: ClientSocket) => {
	try {
		if (!data || !data.id || !data.start_at) throw new Error("All fields must be filled!");

		const task = await Task.query().updateAndFetchById(data.id, {
			start_at: data.start_at,
			end_at: data.end_at || null,
		});

		if (!task) throw new Error("Error task update");

		ws.notify("task/update/position", { success: true, data: task });
	} catch (error: any) {
		ws.json("task/update/position", { success: false, message: error.message });
	}
};
