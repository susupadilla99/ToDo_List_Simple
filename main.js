// Environment variable
const TRANSLATION_API_KEY = "AIzaSyDZcDl6tQyo9yqI9tTZKdLeDpM1VPdHGEc";
const PROJECT_ID = "simple-translation-todo-list";

// Import & instantiate Google Cloud Client library
const sourceLanguage = 'en';
const targetLanguage = 'ru';
const text = 'Bread';

const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATION_API_KEY}&source=${sourceLanguage}&target=${targetLanguage}&q=${text}`;

fetch(endpoint)
  .then(response => response.json())
  .then(data => {
    const translatedText = data.data.translations[0].translatedText;
    console.log(translatedText);
  })
  .catch(error => {
    console.error(error);
  });


window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        task = input.value

        if(!task) {
            alert("Please fill out your task");
            return;
        } 

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        const task_action_el = document.createElement("div");
        task_action_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }

        })

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";
        task_delete_el.addEventListener("click", () => {
            list_el.removeChild(task_el);
        })

        task_content_el.appendChild(task_input_el);

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_delete_el);

        task_el.appendChild(task_content_el);
        task_el.appendChild(task_action_el)

        list_el.appendChild(task_el);

        input.value = ""
    })
})