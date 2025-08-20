import "./styles.css";
import { format, parseISO } from 'date-fns';
import {createTodo, createProject, Todo, myprojects} from "./todo.js";
import {displayProject, showTodoList, createProjectForm, createTodoForm} from "./content.js";

const defaultProject = createProject("Demo");
const project2 = createProject("Demo 2");
const a = createTodo("project", "demo description",format(new Date, "MMM do, yyyy"));
const b = createTodo("project 2", "demo description 2", format(new Date, "MMM do, yyyy"));
const c = createTodo("project 3", "demo description 3", format(new Date, "MMM do, yyyy"));
Todo.addToProject(defaultProject, a);
Todo.addToProject(defaultProject, c);
Todo.addToProject(project2, b);

Todo.storeProject(defaultProject);
Todo.storeProject(project2);

for(let i = 0;i < myprojects.length;i++){
	displayProject(myprojects[i]);
}

function getProjectFormData(){
	const projectForm = document.querySelector("#project-form");
	projectForm.addEventListener("submit", event => {
		event.preventDefault();

		const projectFormData = new FormData(event.target);
		let projectName = projectFormData.get('Project-Name');
		let project = createProject(projectName);
		Todo.storeProject(project);
		displayProject(project);

		const formContainer = document.querySelector(".project-form-container");
		formContainer.remove();
		projectForm.reset();
	})
}

function getTodoFormData(callback){
	const todoForm = document.querySelector("#todo-form");
	todoForm.addEventListener("submit", event => {
		event.preventDefault();

		const todoFormData = new FormData(event.target);
		let todoName = todoFormData.get("Todo-Name");
		let description = todoFormData.get("Description");
		let date = todoFormData.get("Date");
		let formattedDate = format(date, "MMM do, yyyy");
		let todo = createTodo(todoName, description, formatedDate);
		callback(todo);

		const formContainer = document.querySelector(".todo-form-container");
		formContainer.remove();
		todoForm.reset();
	})
	todoForm.addEventListener("click", event => {
		if(event.target.classList.contains("cancel-form")){
			const formContainer  = document.querySelector(".todo-form-container");
			formContainer.remove();
			todoForm.reset();
		}
	})
}

function cancelProjectForm(){
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
	cancelProjectForm()
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
	} else if(event.target.classList.contains("add-todo-icon")){
		createTodoForm();
		let iconId = event.target.parentElement.id;
		getTodoFormData(todo => {
			let project = myprojects.find(project => project.id === iconId);
			Todo.addToProject(project, todo);
			const ContentDisplayer = document.querySelector(".content-displayer");
			ContentDisplayer.innerHTML = "";
			showTodoList(project);
		});
	}
})

