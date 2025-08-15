const createTodo = (name, description, date) => {
	const isComplete = false;
	return {name, description, date, isComplete};
}

const createProject = (name) => {
	const todoList = [];
	return {name, todoList};
}

const Todo = (function(){
	const addToProject = (projectName, todoName) => {
		projectName.todoList.push(todoName);
	}

	const changeCompletedStatus = (name) => {
		name.isComplete = true;
	}

	return {addToProject, changeCompletedStatus};
})();



export {createTodo, createProject, Todo}
