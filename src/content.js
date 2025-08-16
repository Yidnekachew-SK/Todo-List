import add from "./icons/add.svg";
import remove from "./icons/delete.svg";
import expand from "./icons/expand.svg";


function createDiv(){
	return document.createElement("div");
}

function createParagraph(){
	return document.createElement("p");
}

function createButton(){
	return document.createElement("button");
}

function createIcon(icon){
	const img = document.createElement("img");
	img.className = "icon";
	img.src = `${icon}`;

	return img;
}

function displayProject(project){
	const projectContainer = document.querySelector(".project-bar");
	const div = createDiv();
	div.className = "project";
	div.classList.add(`project-${project.name}`);
	projectContainer.append(div);

	const titleContainer = createDiv();
	titleContainer.className = "title-container";
	div.append(titleContainer);

	const title = document.createElement("h3");
	title.className = "project-title";
	title.textContent = `${project.name}`;
	titleContainer.append(title);

	const addButton = createButton();
	addButton.className = "add-todo-button";
	addButton.textContent = "+";
	titleContainer.append(addButton);
}

function showTodoList(project){
	const listDisplayer = document.querySelector(".content-displayer");
	for(let i = 0; i < project.todoList.length; i++){
		const todoContainer = createDiv();
		todoContainer.className = `todo-${project.todoList[i].name}`;
		todoContainer.classList.add("todo-container");
		listDisplayer.append(todoContainer);

		const todoDisplayer = createDiv();
		todoDisplayer.className = "todo-display";
		todoContainer.append(todoDisplayer);

		const nameOfTodo = createParagraph();
		nameOfTodo.className = "todo-name";
		nameOfTodo.textContent = `${project.todoList[i].name}`;
		todoDisplayer.append(nameOfTodo);

		const expandButton = createButton();
		expandButton.className = "expand-todo-button";
		expandButton.textContent = ">";
		todoDisplayer.append(expandButton);

		const deleteButton = createButton();
		deleteButton.className = "delete-todo-button";
		deleteButton.textContent = "x";
		todoDisplayer.append(deleteButton);
	}
}

function displayTodoDetails(todo){
	const displayer = document.querySelector(`.todo-${todo.name}`);

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

function createProjectForm(){
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
			<button class="cancel-project">Cancel</button>
		</div>
	</form>
	`;
	document.body.append(projectFormContainer);
}

export {displayProject, showTodoList, displayTodoDetails, createProjectForm}
