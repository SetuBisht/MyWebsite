var container = document.getElementById("container");

// Add a class to the body when the scene is loaded
function sceneLoaded() {
  document.body.classList.add("loaded");
}
// three js background
var vertexHeight = 15000,
  planeDefinition = 100,
  planeSize = 1245000,
  totalObjects = 1,
  background = "#002135",
  meshColor = "#005e97";

var camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  1,
  400000
);
camera.position.z = 10000;
camera.position.y = 10000;

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(background, 1, 300000);

var planeGeo = new THREE.PlaneGeometry(
  planeSize,
  planeSize,
  planeDefinition,
  planeDefinition
);
var plane = new THREE.Mesh(
  planeGeo,
  new THREE.MeshBasicMaterial({
    color: meshColor,
    wireframe: true,
  })
);
plane.rotation.x -= Math.PI * 0.5;

scene.add(plane);

var renderer = new THREE.WebGLRenderer({ alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(background, 1);

container.appendChild(renderer.domElement);

updatePlane();

function updatePlane() {
  for (var i = 0; i < planeGeo.vertices.length; i++) {
    planeGeo.vertices[i].z += Math.random() * vertexHeight - vertexHeight;
    planeGeo.vertices[i]._myZ = planeGeo.vertices[i].z;
  }
}
var count = 0;
let rotationSpeed = 0.001;
render();
sceneLoaded();

// Variable to hold rotation speed

// Listen for mouse scroll event
window.addEventListener("wheel", function (event) {
  // Update rotation speed based on scroll direction and magnitude
  rotationSpeed += event.deltaY * 0.00001; // Adjust multiplier for sensitivity
  console.log("dasdasd", rotationSpeed);
});
function render() {
  requestAnimationFrame(render);
  // camera.position.z -= 150;
  var x = camera.position.x;
  var z = camera.position.z;
  camera.position.x =
    x * Math.cos(rotationSpeed) + z * Math.sin(rotationSpeed) - 10;
  camera.position.z =
    z * Math.cos(rotationSpeed) - x * Math.sin(rotationSpeed) - 10;
  camera.lookAt(new THREE.Vector3(0, 8000, 0));

  for (var i = 0; i < planeGeo.vertices.length; i++) {
    var z = +planeGeo.vertices[i].z;
    planeGeo.vertices[i].z =
      Math.sin(i + count * 0.00002) *
      (planeGeo.vertices[i]._myZ - planeGeo.vertices[i]._myZ * 0.6);
    plane.geometry.verticesNeedUpdate = true;

    count += 0.1;
  }

  renderer.render(scene, camera);
}

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
  //changes the size of the canavs and updates it
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
//contact links
const menuItemsContact = document.querySelectorAll(".menu-content--contact");

menuItemsContact.forEach((item) => {
  console.log(item, "item");
  item.addEventListener("click", function () {
    const link = this.querySelector("span").innerText;
    switch (link.toLowerCase()) {
      case "github":
        window.open("https://github.com/SetuBisht", "_blank");
        break;
      case "linkedin":
        window.open(
          "https://www.linkedin.com/in/vishwavijay-bisht-2952a917a/",
          "_blank"
        );
        break;
      case "email":
        window.location.href = "mailto:vish.vb11@gmail.com";
        break;
      default:
        break;
    }
  });
});

//menu funcatlity

const menu = document.querySelector(".menu");
const description = document.querySelector(".description");
const projects = document.querySelector(".projects");
const galleries = document.querySelectorAll(".gallery__column");
const text = document.querySelectorAll(".description_text");
const skills = document.querySelector(".skills");
const menuItems = document.querySelectorAll(".menu-content");
menuItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    // Toggle the 'menu-active' class among menu items
    if (this.classList.contains("menu-active")) return;
    menuItems.forEach((item) => {
      item.classList.toggle("menu-active", item === this);
    });

    // Toggle the text of the clicked menu item
    const span = this.querySelector("span");
    span.textContent =
      span.textContent === span.getAttribute("data-element")
        ? "___"
        : span.getAttribute("data-element");

    if (span.getAttribute("data-element") == "Home") {
      const spanElement = document.querySelector(`[data-element="Projects"]`);
      spanElement.textContent = "Projects";
      const spanElement2 = document.querySelector(`[data-element="Skills"]`);
      spanElement2.textContent = "Skills";
      skills.style.display = "none";
      galleries.forEach((gallery) => {
        gallery.classList.remove("slide-in");
        gallery.classList.add("slide-out");
      });
      setTimeout(() => {
        projects.style.display = "none";
        description.style.display = "block";
        text.forEach((gallery) => {
          gallery.classList.add("slide-in");
          gallery.classList.remove("slide-out");
        });
      }, 500);
    }

    if (span.getAttribute("data-element") == "Projects") {
      const spanElement = document.querySelector(`[data-element="Home"]`);
      spanElement.textContent = "Home";
      const spanElement2 = document.querySelector(`[data-element="Skills"]`);
      spanElement2.textContent = "Skills";
      skills.style.display = "none";
      description.style.display = "none";
      projects.style.display = "block";
      text.forEach((gallery) => {
        gallery.classList.remove("slide-in");
        gallery.classList.add("slide-out");
      });
      galleries.forEach((gallery) => {
        gallery.classList.remove("slide-out");
        gallery.classList.add("slide-in");
      });
    }
    if (span.getAttribute("data-element") == "Skills") {
      const spanElement = document.querySelector(`[data-element="Projects"]`);
      spanElement.textContent = "Projects";
      description.style.display = "block";
      const spanElement2 = document.querySelector(`[data-element="Home"]`);
      spanElement2.textContent = "Home";
      description.style.display = "none";
      text.forEach((gallery) => {
        gallery.classList.remove("slide-in");
        gallery.classList.add("slide-out");
      });
      galleries.forEach((gallery) => {
        gallery.classList.remove("slide-in");
        gallery.classList.add("slide-out");
      });
      setTimeout(() => {
        projects.style.display = "none";
        skills.style.display = "block";
      }, 500);
    }
  });
});

//projects conatainer
let allProjects = [];
let currentIndex = 0;
const projectContainer = document.querySelector(".projects-showcase");
// Get the container element
fetch("./assets/jsons/projects.json")
  .then((response) => response.json())
  .then((projectsShowcase) => {
    // Get the container element
  })
  .catch((error) => console.error("Error loading projects:", error));

//pagination

const leftArrow = document.querySelector(".left");
const rightArrow = document.querySelector(".right");

// Initialize index variable to keep track of currently displayed project

// Function to display the current project
function displayProject(index) {
  // Ensure index stays within bounds
  currentIndex = (index + allProjects.length) % allProjects.length;

  // Get the current project
  const currentProject = allProjects[currentIndex];

  // Update the HTML content with the current project information
  const projectName = document.querySelector(".project-heading");
  const projectDescription = document.querySelector(".project-description");
  const projectSkills = document.querySelector(".project-skills");
  const projectVisit = document.querySelector(".project-visit a");

  projectName.textContent = currentProject.name;
  projectDescription.textContent = currentProject.description;
  projectSkills.textContent = currentProject.skills.join(", ");
  projectVisit.href = currentProject.visitUrl;
}

// Event listener for left arrow click
leftArrow.addEventListener("click", () => {
  displayProject(currentIndex - 1);
});

// Event listener for right arrow click
rightArrow.addEventListener("click", () => {
  displayProject(currentIndex + 1);
});
