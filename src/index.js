import "./styles.css";
import {createTodo, createProject, Todo} from "./todo.js";
import {displayProject, createProjectForm, createTodoForm} from "./content.js";

const defaultProject = createProject("Demo");
const project2 = createProject("Demo 2");
const a = createTodo("project", "demo description","not defined");
const b = createTodo("project 2", "demo description 2", "not defined");
const c = createTodo("project 3", "demo description 3", "not defined");
Todo.addToProject(defaultProject, a);
Todo.addToProject(defaultProject, c);
Todo.addToProject(project2, b);

displayProject(defaultProject);
displayProject(project2);


console.log(defaultProject);
console.log(project2);


function getProjectFormData(){
	const projectForm = document.querySelector("#project-form");
	projectForm.addEventListener("submit", event => {
		event.preventDefault();

		const projectFormData = new FormData(event.target);
		let projectName = projectFormData.get('Project-Name');
		let project = createProject(projectName);
		displayProject(project);

		const formContainer = document.querySelector(".project-form-container");
		formContainer.remove();
		projectForm.reset();
	})
}

function getTodoFormData(){
	let todo;
	const todoForm = document.querySelector("#todo-form");
	todoForm.addEventListener("submit", event => {
		event.preventDefault();

		const todoFormData = new FormData(event.target);
		let todoName = todoFormData.get("Todo-Name");
		let description = todoFormData.get("Description");
		let date = todoFormData.get("Date");
		todo = createTodo(todoName, description, date);
		console.log("todo " + todo)
	})
	return todo;
}

function cancelForm(){
	const cancelButton = document.querySelector(".cancel-form-button");
	cancelButton.addEventListener("click", () => {
		const form = document.querySelector(".project-form-container");
		form.remove();
	})
}

const addProject = document.querySelector(".add-project-button");
addProject.addEventListener("click", () => {
	createProjectForm();
	getProjectFormData();
	cancelForm()
})

const project = document.querySelector(".project-bar");
project.addEventListener("click", event => {
	if(event.target.classList.contains("delete-project-icon")){
		let iconId = event.target.parentElement.id;
		const projectToRemove = document.querySelector(`.${iconId}`);
		projectToRemove.remove();

		const ContentDisplayer = document.querySelector(".content-displayer");
		const projectContent = document.querySelector(`#${iconId}-container`);
		if(ContentDisplayer.firstElementChild === projectContent && projectContent != null){
			projectContent.remove();
		}
	} /*else if(event.target.classList.contains("add-todo-icon")){
		createTodoForm();
		let iconId = event.target.parentElement.id;
		let data = getTodoFormData();
		console.log(data);
		let project = iconId.split("-").slice(1).join(" ");
		console.log(project);
		Todo.addToProject(project, data);
		const ContentDisplayer = document.querySelector(".content-displayer");
		ContentDisplayer.innerHTML = "";
		displayProject(project);	
	}*/
})


