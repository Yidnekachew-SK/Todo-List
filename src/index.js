import "./styles.css";
import {createTodo, createProject, Todo} from "./todo.js";
import {displayProject, showTodoList, displayTodoDetails, createProjectForm} from "./content.js";

const defaultProject = createProject("Demo");
const a = createTodo("project", "complete todo app",21);
const b = createTodo("project 2", "complete todo app 2", 24);
const c = createTodo("project 3", "complete todo app 3", 25);
Todo.addToProject(defaultProject, a);
Todo.addToProject(defaultProject, b);
Todo.addToProject(defaultProject, c);

displayProject(defaultProject);
showTodoList(defaultProject);
displayTodoDetails(a);

console.log(defaultProject);

const addProject = document.querySelector(".add-project-button");
addProject.addEventListener("click", () => {
	createProjectForm();
})
