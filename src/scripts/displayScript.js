document.addEventListener("DOMContentLoaded", (event) => {
  displayEvents();
});

function displayEvents() {
  const allFormData = JSON.parse(localStorage.getItem("allFormData")) || [];
  const eventsContainer = document.getElementById("eventsContainer");

  // Clear previous content

  allFormData.forEach((formData) => {
    const eventDiv = document.createElement("section");
    eventDiv.classList.add("kalender");
    eventDiv.innerHTML = `
    <div class="box">
        <div class="date">
           <h5>${formData.day}</h5>
           <h3>${formData.monthText}</h3>
           <h6>${formData.year}</h6>
        </div>
        <h2>${formData.name}</h2>
        <h4>${formData.subtitle}</h4>
        <p>${formData.beschreibung}</p>
        <div class="boxImg kalender-grid">
        
        </div>
        <a href="./Über_mich.html">Buchungsanfrage</a>
    </div>
    `;
    eventsContainer.appendChild(eventDiv);
  });
}
