import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } from '/node_modules/three/examples/jsm/geometries/TeapotGeometry.js';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from '/node_modules/three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'dat.gui';

//Tạo cảnh
const scene = new THREE.Scene();

//Tạo kết xuất
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Tạo camera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);
camera.position.set(0, 30, 30);


//Thêm OrbitControl
const Orbit = new OrbitControls(camera, renderer.domElement);

//Tạo ánh sáng nền

//points, lines, solid
var boxInfo = {
    solid: true,
    lines: false,
    points: false,
    scale: 1,
}

//Tạo vật thể
const box = getBox(5, 5, 5, boxInfo);
const cone = getCone(2, 4);
const sphere = getSphere(2);
const cylinder = getCylinder(2, 2, 4);
const torus  = getTorus(2, 1);
const teapot = getTeapot(1, 2);
const capsule = getCapsule(1, 4);
const ring = getRing(1, 3);
const plane = getPlane(100, 100);


//Thêm vào cảnh
scene.add(box);
scene.add(cone);
scene.add(sphere)
scene.add(cylinder);
scene.add(torus);
scene.add(teapot);
scene.add(capsule);
scene.add(ring);
scene.add(plane);


//dat.gui
const gui = new dat.GUI();
const guiBox = gui.addFolder('Box');
guiBox.add(boxInfo, 'solid').onChange((boxInfo)=>{!boxInfo.solid});
guiBox.add(boxInfo, 'lines').onChange((boxInfo)=>{!boxInfo.lines});
guiBox.add(boxInfo, 'points').onChange((boxInfo)=>{!boxInfo.points});
guiBox.add(boxInfo, 'scale', 0, 10);
guiBox.addColor(box.material, 'color');
guiBox.add(box.material, 'visible');
guiBox.add(box.material, 'wireframe');
// guiBox.add(box.material, 'points');


//Thiết lập vị trí
box.position.set(0, 0 , 0);
cone.position.set(5, 0, 0);
sphere.position.set(10, 0, 0);
cylinder.position.set(15, 0, 0);
torus.position.set(20, 0, 0);
teapot.position.set(25, 0, 0);
capsule.position.set(30, 0, 0);
ring.position.set(35, 0, 0);
plane.position.set(0, -3, 0);

//Rotation
plane.rotation.set(-Math.PI/2, 0, 0);
torus.rotation.set(-Math.PI/2, 0, 0);
ring.rotation.set(-Math.PI/2, 0, 0);

// //Load model có sẵn từ tập tin
// const gltfloader = new GLTFLoader();

// // Optional: Provide a DRACOLoader instance to decode compressed mesh data
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath( 'three/examples/jsm/libs/draco/' );
// gltfloader.setDRACOLoader( dracoLoader );

// gltfloader.load(
// 	// resource URL
// 	'available_model/shiba/scene.gltf',
// 	// called when the resource is loaded
// 	function ( gltf ) {

//         gltf.scene.position.set(-10, 0, 0);
//         scene.add( gltf.scene );
// 	},
// 	// called while loading is progressing
// 	function ( xhr ) {

// 		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

// 	},
// 	// called when loading has errors
// 	function ( error ) {

// 		console.log( 'An error happened' );

// 	}
// );

//Hàm animation
function animate(){
    //Scale
    box.scale.set(boxInfo.scale, boxInfo.scale, boxInfo.scale);

    //Kết xuất
    Orbit.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

//Tạo hình hộp
function getBox(width, height, depth, boxInfo){
    const geo = new THREE.BoxGeometry(width, height, depth);

    const mesh = getMaterialAndMesh(geo, boxInfo);
    return mesh;
}

//Tạo hình cầu
function getSphere(radius){
    const geo = new THREE.SphereGeometry(radius);
    const mat = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 0, 0)',
    });

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;

}

//Tạo hình nón
function getCone(radius, height){
    const geo = new THREE.ConeGeometry(radius, height);
    const mat = new THREE.MeshBasicMaterial({
        color: 'rgb(0, 255, 0)',
    })

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

//Tạo hình trụ
function getCylinder(radiusTop, radiusBot, height){
    const geo = new THREE.CylinderGeometry(radiusTop, radiusBot, height);
    const mat = new THREE.MeshBasicMaterial({
        color: 'rgb(0, 0, 255)',
    })

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

//Tạo hình bánh xe
function getTorus(radius, tube){
    const geo = new THREE.TorusGeometry(radius, tube);
    const mat = new THREE.MeshBasicMaterial({
        color: "rgb(255, 255, 0)"
    });

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

//Tạo hình ấm trà
function getTeapot(size, segment){
    const geo = new TeapotGeometry(size, segment);
    const mat = new THREE.MeshBasicMaterial({
        color: 'rgb(0, 255, 255)'
    });

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

//Tạo hình tự tìm hiểu
function getCapsule(radius, length){
    const geo = new THREE.CapsuleGeometry(radius, length);
    const mat = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 0, 255)',
    });

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

function getRing(innerRadius, outerRadius){
    const geo = new THREE.RingGeometry(innerRadius, outerRadius);
    const mat = new THREE.MeshBasicMaterial();

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

function getPlane(width, height){
    const geo = new THREE.PlaneGeometry(width, height);
    const mat = new THREE.MeshBasicMaterial({
        color: 'rgb(60, 60, 60)'
    });

    const mesh = new THREE.Mesh(geo, mat);
    return mesh;
}

//Hàm lựa chọn kiểu vẽ
function getMaterialAndMesh(geo, guiInfo){
    var mat = NaN;
    var mesh = NaN;
    mat = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255, 0)',
        visible: true,
        wireframe: false,
        
    });

    mesh = new THREE.Mesh(geo, mat);
    return mesh;
}




