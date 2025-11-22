import "./style.css";
import {
  AxesHelper,
  BoxGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new Scene();

const cubeGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({ color: "red" });

const cubeMesh = new Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = -1;
const cubeMesh2 = new Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;
const cubeMesh3 = new Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

const group = new Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);

group.position.y = 2;

scene.add(group);

// cubeMesh.position.y = 1;
// cubeMesh.position.z = -1;

// const tempVector = new Vector3(0, 1, -1);
// cubeMesh.position.copy(tempVector);

// cubeMesh.scale.y = 2;
// cubeMesh.scale.set(2, 2, 1);

const axesHelper = new AxesHelper(2);
scene.add(axesHelper);

const camera = new PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;
camera.position.x = 3;
camera.position.y = 1;

console.log(cubeMesh.position.distanceTo(camera.position));

scene.add(camera);

const canvasEl = document.querySelector("canvas.threejs") as HTMLElement;
const renderer = new WebGLRenderer({ canvas: canvasEl, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvasEl);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function renderLoop() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

renderLoop();
