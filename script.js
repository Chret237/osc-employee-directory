document.addEventListener("DOMContentLoaded", () => {
    const main = document.querySelector(".main-content");
    const layoutTemplate = document.getElementById("employeeList-layout");
    const itemTemplate = document.getElementById("employeeList-item-layout");
    // const countSpan = document.getElementById("employee-count");

    main.innerHTML = "";
    main.appendChild(layoutTemplate.content.cloneNode(true));

    const form = main.querySelector("form");
    const ul = main.querySelector("ul");

    // Fonction pour sauvegarder la liste dans localStorage
    function saveEmployees(employees) {
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    // Fonction pour charger la liste depuis localStorage
    function loadEmployees() {
        return JSON.parse(localStorage.getItem("employees") || "[]");
    }

    // Fonction pour afficher la liste des employés
    function renderEmployees(employees) {
        ul.innerHTML = "";

        employees.forEach((emp, idx) => {
        const item = itemTemplate.content.cloneNode(true);

            item.querySelector(".employee-name").textContent = `${emp.firstname} ${emp.lastname}`;

            item.querySelector(".employee-position").textContent = emp.position;

            item.querySelector(".employee-email").textContent = emp.email;

            // Suppression
            item.querySelector(".delete-btn").addEventListener("click", function () {
                employees.splice(idx, 1);
                saveEmployees(employees);
                renderEmployees(employees);
            });
            
            ul.appendChild(item);
        });
    }

    // Initialisation
    let employees = loadEmployees();
    console.log(employees);
    renderEmployees(employees);

    // Ajout d'un employé
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const lastname = form.lastname.value.trim();
        const firstname = form.firstname.value.trim();
        const email = form.email.value.trim();
        const position = form.position.value.trim();
        if (!lastname || !firstname || !email || !position) return;

        employees.push({ lastname, firstname, email, position });
        saveEmployees(employees);
        renderEmployees(employees);
        form.reset();
    });

    // Mise à jour du compteur
    if (countSpan) countSpan.textContent = employees.length;
});
