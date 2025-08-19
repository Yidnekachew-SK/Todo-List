const myprojects = [];

const createTodo = (name, description, date) => {
	const todoId = "todo-" + crypto.randomUUID();
	const isComplete = false;
	return {name, description, date, todoId, isComplete};
}

const createProject = (name) => {
	const id = "project-" + crypto.randomUUID();
	const todoList = [];
	return {name, id, todoList};
}

const Todo = (function(){
	const addToProject = (projectName, todoName) => {
		projectName.todoList.push(todoName);
	}

	const changeCompletedStatus = (name) => {
		name.isComplete = true;
	}

	const storeProject = (project) => {
		myprojects.push(project);
	}

	return {addToProject, changeCompletedStatus, storeProject};
})();



export {createTodo, createProject, Todo, myprojects}
