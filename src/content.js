function createDiv(){
	return document.createElement("div");
}

function createParagraph(){
	return document.createElement("p");
}

function createButton(){
	return document.createElement("button");
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
	addButton.className = "add-todo";
	addButton.textContent = "+";
	titleContainer.append(addButton);

	showTodoList(project);
}

function showTodoList(project){
	const projectDiv = document.querySelector(`.project-${project.name}`);
	for(let i = 0; i < project.todoList.length; i++){
		const nameOfTodo = createParagraph();
		nameOfTodo.className = "todo-name";
		nameOfTodo.textContent = `${project.todoList[i].name}`;
		projectDiv.append(nameOfTodo);
	}
}

function displayTodos(todo){
	const displayer = document.querySelector(".content-displayer");
	const container = createDiv();
	container.className = "todo-displayer";
	displayer.append(container);

	const name = createParagraph();
	name.textContent = `Name: ${todo.name}`;
	container.append(name);

	const descrption = createParagraph();
	descrption.textContent = `Description: ${todo.description}`;
	container.append(descrption);

	const date = createParagraph();
	date.textContent = `Due Date: ${todo.date}`;
	container.append(date);

}

export  {displayProject, displayTodos}
