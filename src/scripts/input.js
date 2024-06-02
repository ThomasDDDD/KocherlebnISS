document.addEventListener("DOMContentLoaded", (event) => {
  loadData();
  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById("addEventBtn").addEventListener("click", saveData);
  document
    .getElementById("deleteEventBtn")
    .addEventListener("click", deleteSelectedSection);
  document
    .getElementById("deleteAllEventsBtn")
    .addEventListener("click", deleteAllData);
}

function saveData() {
  const dateValue = document.getElementById("date").value;
  const name = document.getElementById("name").value;
  const subtitle = document.getElementById("subtitle").value;
  const beschreibung = document.getElementById("beschreibung").value;

  const date = new Date(dateValue);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const monthText = monthNames[month];

  const id = "section-" + Date.now();

  const formData = {
    id,
    day,
    monthText,
    year,
    name,
    subtitle,
    beschreibung,
  };
  console.log("Saving data:", formData);

  let allFormData = JSON.parse(localStorage.getItem("allFormData")) || [];
  allFormData.push(formData);
  localStorage.setItem("allFormData", JSON.stringify(allFormData));

  updateDeleteFormOptions();

  document.getElementById("form-input").reset();
}

function loadData() {
  const allFormData = JSON.parse(localStorage.getItem("allFormData")) || [];
  const sectionsSelect = document.getElementById("sections");

  sectionsSelect.innerHTML = "";

  allFormData.forEach((formData) => {
    const option = document.createElement("option");
    option.value = formData.id;
    option.text = `${formData.name} (${formData.day} ${formData.monthText} ${formData.year})`;
    sectionsSelect.appendChild(option);
  });

  const deleteForm = document.getElementById("deleteForm");
}

function deleteSection(id) {
  let allFormData = JSON.parse(localStorage.getItem("allFormData")) || [];
  allFormData = allFormData.filter((formData) => formData.id !== id);
  localStorage.setItem("allFormData", JSON.stringify(allFormData));

  // Aktualisiere die Optionen im Selector
  updateDeleteFormOptions();
}

function deleteSelectedSection() {
  const sectionsSelect = document.getElementById("sections");
  const selectedId = sectionsSelect.value;
  if (selectedId) {
    deleteSection(selectedId);
  }
}

function updateDeleteFormOptions() {
  const sectionsSelect = document.getElementById("sections");
  const allFormData = JSON.parse(localStorage.getItem("allFormData")) || [];

  // Lösche die bestehenden Optionen im Selector
  sectionsSelect.innerHTML = "";

  allFormData.forEach((formData) => {
    const option = document.createElement("option");
    option.value = formData.id;
    option.text = `${formData.name} (${formData.day} ${formData.monthText} ${formData.year})`;
    sectionsSelect.appendChild(option);
  });
}

function deleteAllData() {
  localStorage.removeItem("allFormData");

  // Nach dem Löschen die Anzeige aktualisieren
  updateDeleteFormOptions();
}

// const section = document.createElement("section");
// section.id = formData.id;
// section.innerHTML = `
//     <div class="box">
//         <div class="date">
//             <h5>${formData.day}</h5>
//             <h3>${formData.monthText}</h3>
//             <h6>${formData.year}</h6>
//         </div>
//         <h2>${formData.name}</h2>
//         <h4>${formData.subtitle}</h4>
//         <p>${formData.beschreibung}</p>
//     </div>
//     `;
// sectionsContainer.appendChild(section);

/*
document.addEventListener("DOMContentLoaded", (event) => {
  if (document.getElementById("input-2")) {
    const formData = JSON.parse(localStorage.getItem("formData"));

    if (formData) {
      const displaySection = document.getElementById("input-2");
      displaySection.innerHTML = `
            <div class="box">
                <div class="date">
                    <h5>${formData.day}</h5>
                    <h3>${formData.monthText}</h3>
                    <h6>${formData.year}</h6>
                </div>
                <h2>${formData.name}</h2>
                <h4>${formData.subtitle}</h4>
                <p>${formData.beschreibung}</p>
            </div>
            `;
    } else {
      document.getElementById("input-2").innerHTML =
        "<p>Keine Daten gefunden.</p>";
    }
  }
});
*/
