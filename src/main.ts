import "./style.css";
import {
  AxesHelper,
  BoxGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new Scene();

const cubeGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = 1;
scene.add(cubeMesh);

// cubeMesh.rotation.y = 7; // It is In Rad, Math.PI is half rotation
cubeMesh.rotation.reorder("YXZ");
cubeMesh.rotation.y = MathUtils.degToRad(90);
cubeMesh.rotation.x = MathUtils.degToRad(45);

const axesHelper = new AxesHelper(2);
cubeMesh.add(axesHelper);

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
