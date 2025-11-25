import "./style.css";
import {
  AmbientLight,
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusKnotGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// For real-time changes testing and visulization use Tweakpane package

const scene = new Scene();

const textureLoader = new TextureLoader();

const cubeGeometry = new BoxGeometry(1, 1, 1);
const torusKnotGeometry = new TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new PlaneGeometry(1, 1);
const sphereGeometry = new SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new CylinderGeometry(0.5, 0.5, 1, 32);

const textureTest = textureLoader.load("/lava-and-rock_albedo.png");

// Texture topics:
// repeating, offset, UV Mapping, PBR Maps, roughnessMap, metalnessMap,
// normalMap, displacementMap (heighMap), Ambient occlusion

// Lighting topics:
// Ambient light, hemisphere light, directional light, directionalLightHelper,
// pointLight, spotLight, rectAreaLight

const material = new MeshBasicMaterial();
material.map = textureTest;

const group = new Group();

const cube = new Mesh(cubeGeometry, material);

const knot = new Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

const plane = new Mesh(planeGeometry, material);
plane.position.x = -1.5;

const sphere = new Mesh();
sphere.geometry = sphereGeometry;
sphere.material = material;
sphere.position.y = 1.5;

const cylinder = new Mesh();
cylinder.geometry = cylinderGeometry;
cylinder.material = material;
cylinder.position.y = -1.5;

group.add(cube);
group.add(knot);
group.add(plane);
group.add(sphere);
group.add(cylinder);
scene.add(group);

const light = new AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const camera = new PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);

camera.position.z = 5;

console.log(cube.position.distanceTo(camera.position));

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
  group.children.forEach((child) => {
    if (child instanceof Mesh) {
      child.rotation.y += 0.01;
    }
  });

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(renderLoop);
}

renderLoop();
