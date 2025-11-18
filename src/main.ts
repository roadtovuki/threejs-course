import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

const scene = new Scene();

const cubeGeometry = new BoxGeometry(1, 1, 1);
const cubeMaterial = new MeshBasicMaterial({ color: "red" });

const cubeMesh = new Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

camera.position.z = 5;
scene.add(camera);

const canvasEl = document.querySelector("canvas.threejs") as Element;
const renderer = new WebGLRenderer({ canvas: canvasEl });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
