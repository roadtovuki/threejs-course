import "./style.css";
import {
  AxesHelper,
  BufferAttribute,
  BufferGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new Scene();

const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
const bufferAttribute = new BufferAttribute(vertices, 3);

const geometry = new BufferGeometry();
geometry.setAttribute("position", bufferAttribute);

const cubeMaterial = new MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new Mesh(geometry, cubeMaterial);
scene.add(cubeMesh);

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
