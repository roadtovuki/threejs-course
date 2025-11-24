import "./style.css";
import {
  AxesHelper,
  BoxGeometry,
  Color,
  DoubleSide,
  Fog,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// For real-time changes testing and visulization use Tweakpane package

const scene = new Scene();

const cubeGeometry = new BoxGeometry(1, 1, 1);
const planeGeometry = new PlaneGeometry(1, 1);
// const material = new MeshBasicMaterial({
//   color: "red",
//   transparent: true,
//   opacity: 0.5,
// });

const material = new MeshBasicMaterial();
material.color = new Color("limeGreen");
material.transparent = true;
material.opacity = 0.5;
material.side = DoubleSide;

const fog = new Fog(0xffffff, 1, 10);
scene.fog = fog;
scene.background = new Color(0xffffff);

const cubeMesh = new Mesh(cubeGeometry, material);

const cubeMesh2 = new Mesh(cubeGeometry, material);
cubeMesh2.position.x = 1.5;

const planeMesh = new Mesh(planeGeometry, material);
planeMesh.position.x = -1.5;

scene.add(cubeMesh);
scene.add(cubeMesh2);
scene.add(planeMesh);

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
