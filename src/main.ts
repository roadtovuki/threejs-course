import "./style.css";
import {
  AmbientLight,
  BoxGeometry,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// For real-time changes testing and visulization use Tweakpane package

const scene = new Scene();

const cubeGeometry = new BoxGeometry(1, 1, 1);
const torusKnotGeometry = new TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new PlaneGeometry(1, 1);

// const material = new MeshLambertMaterial();
const material = new MeshPhongMaterial();
material.shininess = 90;

const cubeMesh = new Mesh(cubeGeometry, material);

const torusMesh = new Mesh(torusKnotGeometry, material);
torusMesh.position.x = 1.5;

const planeMesh = new Mesh(planeGeometry, material);
planeMesh.position.x = -1.5;

scene.add(cubeMesh);
scene.add(torusMesh);
scene.add(planeMesh);

const light = new AmbientLight(0xffffff, 0.2);
scene.add(light);

const pointLight = new PointLight(0xffffff, 0.3);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// const axesHelper = new AxesHelper(2);
// cubeMesh.add(axesHelper);

const camera = new PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;

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
