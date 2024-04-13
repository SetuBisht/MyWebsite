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

render();
sceneLoaded();

var count = 0;
function render() {
  requestAnimationFrame(render);
  // camera.position.z -= 150;
  var x = camera.position.x;
  var z = camera.position.z;
  camera.position.x = x * Math.cos(0.001) + z * Math.sin(0.001) - 10;
  camera.position.z = z * Math.cos(0.001) - x * Math.sin(0.001) - 10;
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
    console.log(link, "link");
    switch (link.toLowerCase()) {
      case "github":
        window.open("https://github.com", "_blank");
        break;
      case "linkedin":
        window.open("https://www.linkedin.com", "_blank");
        break;
      case "email":
        window.location.href = "mailto:your-email@example.com";
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
      description.style.display = "block";
      projects.style.display = "none";
    } else {
      const spanElement = document.querySelector(`[data-element="Home"]`);
      spanElement.textContent = "Home";
      description.style.display = "none";
      projects.style.display = "block";
    }
  });
});
