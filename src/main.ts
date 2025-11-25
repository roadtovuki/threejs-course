import "./style.css";
import {
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry,
  WebGLRenderer,
  Clock,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new Scene();

const sphereGeometry = new SphereGeometry(1, 32, 32);

const sunMaterial = new MeshBasicMaterial({ color: 0xfff700 });
const sun = new Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

const earthMaterial = new MeshBasicMaterial({
  color: "blue",
});
const earth = new Mesh(sphereGeometry, earthMaterial);
earth.position.x = 10;
sun.add(earth);

const moonMaterial = new MeshBasicMaterial({
  color: "grey",
});
const moon = new Mesh(sphereGeometry, moonMaterial);
moon.scale.setScalar(0.3);
moon.position.x = 2;
earth.add(moon);

const camera = new PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);

camera.position.z = 100;
camera.position.y = 5;

scene.add(camera);

const canvasEl = document.querySelector("canvas.threejs") as HTMLElement;
const renderer = new WebGLRenderer({ canvas: canvasEl, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, canvasEl);
controls.enableDamping = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new Clock();
function renderLoop() {
  const elapsedTime = clock.getElapsedTime();
  // add animation here
  earth.rotation.y += 0.01;

  earth.position.x = Math.sin(elapsedTime) * 10;
  earth.position.z = Math.cos(elapsedTime) * 10;

  moon.position.x = Math.sin(elapsedTime) * 2;
  moon.position.x = Math.cos(elapsedTime) * 2;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

renderLoop();
