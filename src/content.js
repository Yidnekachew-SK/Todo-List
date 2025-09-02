import add from "./icons/add.svg";
import remove from "./icons/delete.svg";
import expand from "./icons/expand.svg";
import shrink from "./icons/shrink.svg";
import {myprojects} from "./todo.js"

function createDiv () {
	return document.createElement("div");
}

function createParagraph () {
	return document.createElement("p");
}

function createButton () {
	return document.createElement("button");
}

function createIcon (icon, className) {
	const img = document.createElement("img");
	img.src = `${icon}`;
	img.className = className;

	return img;
}

function createContentHeader (headerName) {
	const todoListHeader = document.querySelector(".content-header");
	todoListHeader.textContent = headerName;
}

function createCheckList (todoUsed) {
	const input = document.createElement("input");
	input.type = "checkbox";
	input.className = "checkboxs";
	input.id = todoUsed.todoId;
	input.addEventListener("change", () => {
		todoUsed.isComplete = input.checked;
	})
	return input;
}

function displayProject (project) {
	const projectContainer = document.querySelector(".projects-container");
	const div = createDiv();
	div.className = "createdProject";
	div.classList.add(`${project.id}`);
	projectContainer.append(div);

	const titleContainer = createDiv();
	titleContainer.className = "title-container";
	div.append(titleContainer);

	const title = document.createElement("h3");
	title.className = "project-title";
	title.textContent = `${project.name}`;
	titleContainer.append(title);
	title.addEventListener("click", () => {
		showTodoList(project, "project");
		createContentHeader(`${project.name}`);
	})

	const projectIconContainer = createDiv();
	projectIconContainer.className = "project-icon-container";
	projectIconContainer.id = `${project.id}`;
	titleContainer.append(projectIconContainer);

	const addIcon = createIcon(add, "add-todo-icon");
	projectIconContainer.append(addIcon);

	const deleteIcon = createIcon(remove, "delete-project-icon");
	projectIconContainer.append(deleteIcon);
}

function showTodoList (project, purpose) {
	const listDisplayer = document.querySelector(".content-displayer");

	const todoListContainer = document.querySelector(".todo-list-container");
	todoListContainer.id = `${project.id}-container`;
	if(purpose === "project"){
		todoListContainer.innerHTML = "";
	}
	listDisplayer.append(todoListContainer);

	for(let i = 0; i < project.todoList.length; i++){
		const todoContainer = createDiv();
		todoContainer.id = `${project.todoList[i].todoId}`;
		todoContainer.classList.add("todo-container");
		todoListContainer.append(todoContainer);

		const todoDisplayer = createDiv();
		todoDisplayer.className = "todo-display";
		todoDisplayer.append(createCheckList(project.todoList[i]));
		todoContainer.append(todoDisplayer);

		const nameOfTodo = createParagraph();
		nameOfTodo.className = "todo-name";
		nameOfTodo.textContent = `${project.todoList[i].name}`;
		todoDisplayer.append(nameOfTodo);

		const todoIconContainer = createDiv();
		todoIconContainer.className = "todo-icon-container";
		todoIconContainer.id = `${project.todoList[i].todoId}`;
		todoDisplayer.append(todoIconContainer);

		const expandIcon = createIcon(expand, "expand-todo");
		todoIconContainer.append(expandIcon);
		expandIcon.addEventListener("click", () => {
			todoDisplayer.classList.toggle("todo-display-expanded");
			const detail = event.target.parentElement.parentElement.nextSibling;
			detail.classList.toggle("detail-visible")
		});

		const deleteIcon = createIcon(remove, "delete-todo");
		todoIconContainer.append(deleteIcon);
		deleteIcon.addEventListener("click", () => {
			removeTodo(project, project.todoList[i]);
			project.todoList.splice(i,1);
		})
		displayTodoDetails(project, project.todoList[i]);
	}
}

function displayTodoDetails (project, todo) {
	const displayer = document.querySelector(`#${todo.todoId}`);

	const detailDisplayer = createDiv();
	detailDisplayer.className = "detail-displayer";
	displayer.append(detailDisplayer);

	const description = createParagraph();
	description.textContent = `Description: ${todo.description}`;
	detailDisplayer.append(description);

	const date = createParagraph();
	date.textContent = `Due Date: ${todo.date}`;
	detailDisplayer.append(date);
}

function removeTodo (project, todo) {
	const todoToRemove = document.querySelector(`#${todo.todoId}`);
	todoToRemove.remove();
}

function createProjectForm () {
	const projectFormContainer = createDiv();
	projectFormContainer.className = "project-form-container";
	projectFormContainer.innerHTML = `
	<form id="project-form" method = "POST">
		<p>Add new project</p>
		<div>
			<label for="project-name">Project Name: </label><br>
			<input type="text" id="project-name" name="Project-Name" required>
		</div>
		<div class = "project-form-button">
			<button type="submit" class="create-project">Submit</button>
			<button type="button" class="cancel-form-button">Cancel</button>
		</div>
	</form>
	`;
	document.body.append(projectFormContainer);
}

function createTodoForm () {
	const todoFormContainer = createDiv();
	todoFormContainer.className = "todo-form-container";
	todoFormContainer.innerHTML = `
		<form id="todo-form">
			<p>Add new Todo</p>
			<div>
				<label for="todo-name">Todo Name: </label>
				<input type="text" id="todo-name" name="Todo-Name" required>
			</div>
			<div>
				<label for="description">Description: </label>
				<input type="text" id="description" name="Description" required>
			</div>
			<div>
				<label for="date">Due Date: </label>
				<input type="date" id="date" name="Date" required>
			</div>
			<div class="todo-form-button">
				<button type="submit" class="create-todo">Submit</button>
				<button type="button" class="cancel-form">Cancel</button>
			</div>
		</form>
	`;
	document.body.append(todoFormContainer);
}

export {createContentHeader, displayProject, showTodoList, createProjectForm, createTodoForm}