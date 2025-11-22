import "./style.css";
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new Scene();

const cubeGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({ color: "red" });

const cubeMesh = new Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

const camera = new PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;
scene.add(camera);

const canvasEl = document.querySelector("canvas.threejs") as HTMLElement;
const renderer = new WebGLRenderer({ canvas: canvasEl, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvasEl);
controls.enableDamping = true;
controls.autoRotate = true;

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
