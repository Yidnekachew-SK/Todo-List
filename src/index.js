import "./styles.css";
import { format, parseISO } from 'date-fns';
import {createTodo, createProject, Todo, myprojects} from "./todo.js";
import {createContentHeader, displayProject, showTodoList, createProjectForm, createTodoForm} from "./content.js";

const defaultProject = createProject("Demo");
const a = createTodo("demo task", "demo description",format(new Date, "MMM do, yyyy"));
Todo.addToProject(defaultProject, a);
Todo.storeProject(defaultProject);
displayProject(defaultProject);

const project2 = createProject("demo2");
const b = createTodo("test", "test desc", format("2025/10/3", "MMM do, yyyy"));
Todo.addToProject(project2, b);
Todo.storeProject(project2);
displayProject(project2);

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
		let todo = createTodo(todoName, description, formattedDate);
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
			showTodoList(project, "project");
			createContentHeader(project.name);
		});
	}
})

const allTodoDisplayer = document.querySelector(".all-todos");
allTodoDisplayer.addEventListener("click", () => {
	document.querySelector(".todo-list-container").innerHTML = "";
	for(let i = 0; i < myprojects.length; i++){
		createContentHeader("All");
		showTodoList(myprojects[i], "show all");
	}
})

const todayTodoDisplayer = document.querySelector(".today-todos");
todayTodoDisplayer.addEventListener("click", () => {
	document.querySelector(".todo-list-container").innerHTML = "";
	const matchingProjects = myprojects.filter(project =>
  		project.todoList?.some(todo => todo.date === format(new Date, "MMM do, yyyy")));
	for(let i = 0; i < matchingProjects.length; i++){
		createContentHeader("Today");
		showTodoList(matchingProjects[i], "show today todo");
	}
})

//this week and completed todos are not finished