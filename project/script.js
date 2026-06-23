import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const params = new URLSearchParams(window.location.search);
const file = params.get("model");

document.getElementById("downloadBtn").href = "models/" + file;
document.getElementById("downloadBtn").download = file;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf2f2f2);

const camera = new THREE.PerspectiveCamera(
45,
window.innerWidth / window.innerHeight,
0.1,
100
);

camera.position.set(0,2,8);

const renderer = new THREE.WebGLRenderer({
antialias:true
});

renderer.setSize(window.innerWidth*0.9,500);

document.getElementById("viewer").appendChild(renderer.domElement);

const controls = new OrbitControls(camera,renderer.domElement);
controls.enableDamping=true;

scene.add(new THREE.AmbientLight(0xffffff,2));

const light=new THREE.DirectionalLight(0xffffff,2);
light.position.set(3,3,3);

scene.add(light);

let model;

const loader=new GLTFLoader();

loader.load("models/"+file,function(gltf){

model=gltf.scene;
scene.add(model);

});

function animate(){

requestAnimationFrame(animate);

if(model){

model.rotation.y+=0.005;

}

controls.update();
renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth*0.9,500);

});