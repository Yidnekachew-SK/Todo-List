import "./styles.css";
import {createTodo, createProject, Todo} from "./todo.js";
import {displayProject, showTodoList, displayTodoDetails, createProjectForm} from "./content.js";

const defaultProject = createProject("Demo");
const a = createTodo("project", "demo description","not defined");
const b = createTodo("project 2", "demo description", "not defined");
const c = createTodo("project 3", "demo description", "not defined");
Todo.addToProject(defaultProject, a);
Todo.addToProject(defaultProject, b);
Todo.addToProject(defaultProject, c);

displayProject(defaultProject);
showTodoList(defaultProject);
displayTodoDetails(a);

console.log(defaultProject);


function getProjectFormData(){
	const addProjectForm = document.querySelector("#project-form");
	addProjectForm.addEventListener("submit", event => {
		event.preventDefault();

		const projectFormData = new FormData(event.target);
		let projectName = projectFormData.get('Project-Name');
		let project = createProject(projectName);
		displayProject(project);

		const projectForm = document.querySelector(".project-form-container");
		projectForm.remove();
		addProjectForm.reset();
	})
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

const project = document.querySelector(".title-container");
project.addEventListener("click", event => {
	if(event.target.classList.contains("delete-project-icon")){
		let iconId = event.target.id;
		const projectToRemove = document.querySelector(`.${iconId}`);
		projectToRemove.remove();
	}
})

/*
const mainContent = document.querySelector(".content-displayer");
mainContent.addEventListener("click", event => {
	if(event.target.classList.contains("expand-todo")){
		const todoContainerId = event.target.parentElement.id;
		displayTodoDetails(`${todoContainerId}`);
	}
})
*/
