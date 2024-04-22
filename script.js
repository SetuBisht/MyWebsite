var container = document.getElementById("container");

function sceneLoaded() {
  document.body.classList.add("loaded");
  // Get the text block element
  const textBlock = document.getElementById("textBlock");
  // Show the text block
  textBlock.style.display = "block";
  // Hide the text block after 3 seconds
  setTimeout(() => {
    textBlock.style.display = "none";
  }, 3000);
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

// Listen for mouse scroll event
window.addEventListener("wheel", function (event) {
  // Update rotation speed based on scroll direction and magnitude
  rotationSpeed += event.deltaY * 0.00001;
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
const skillBox = document.querySelectorAll(".v-boxes");
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

      description.style.display = "none";
      projects.style.display = "block";
      skillBox.forEach((gallery) => {
        gallery.classList.remove("slide-in");
        gallery.classList.add("slide-out");
      });
      skills.style.display = "none";
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
      skillBox.forEach((gallery) => {
        gallery.classList.remove("slide-in");
        gallery.classList.add("slide-out");
      });
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
        skillBox.forEach((gallery) => {
          gallery.classList.add("slide-in");
          gallery.classList.remove("slide-out");
        });
      }, 500);
    }
  });
});

//cursor
let cursor = document.getElementById("cursor");
let circle1 = document.getElementById("circle1");

let mouseX = (event) => event.clientX;
let mouseY = (event) => event.clientY;

let positionElement = (event) => {
  console.log(event.clientX, event.clientY, "asdasd");
  let mouse = {
    x: mouseX(event),
    y: mouseY(event),
  };
  cursor.style.top = mouse.y + "px";
  cursor.style.left = mouse.x + "px";
};
function changeCursorColorToWhite() {
  circle1.style.backgroundColor = "white";
}

// Function to reset cursor color to default
function resetCursorColor() {
  circle1.style.backgroundColor = "#ffc107";
}

let timer = false;
window.onmousemove = (event) => {
  let _event = event;
  timer = setTimeout(() => {
    positionElement(_event);
  }, 1);
};
menuItems.forEach((item, index) => {
  item.addEventListener("mouseover", changeCursorColorToWhite);
  item.addEventListener("mouseout", resetCursorColor);
});

function hideCursor() {
  circle1.style.visibility = "hidden";
}

// Function to reset cursor color to default
function showCursor() {
  circle1.style.visibility = "visible";
}
const links = document.querySelectorAll(".gallery__link");
const box = document.querySelectorAll(".box");
links.forEach((item, index) => {
  item.addEventListener("mouseover", hideCursor);
  item.addEventListener("mouseout", showCursor);
});
box.forEach((item, index) => {
  item.addEventListener("mouseover", hideCursor);
  item.addEventListener("mouseout", showCursor);
});
