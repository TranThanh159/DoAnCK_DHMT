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

//Thông tin của các khối
var boxInfo = {
    width: 5,
    height: 5,
    depth: 5,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,

}

var sphereInfo = {
    radius: 5,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,

}

var coneInfo = {
    radius: 3,
    height: 6,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,
}

var cylinderInfo = {
    radiusTop: 3,
    radiusBot: 3,
    height: 4,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,
}

var torusInfo = {
    radius: 5,
    tube: 2,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,
}

var teapotInfo = {
    size: 5,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,

}

var capsuleInfo = {
    radius: 3,
    length: 5,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,
}

var torusKnotInfo = {
    radius: 5,
    tube: 1,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,

}

var planeInfo = {
    width: 30,
    height: 30,
    x_position: 0, y_position: 0, z_position: 0,
    x_rotation: 0, y_rotation: 0, z_rotation: 0,
    x_scaling: 1, y_scaling: 1, z_scaling: 1,

}

//Thông tin Camera
var cameraInfo = {
    x_position: 10,
    y_position: 10,
    z_position: 10,
}



//Tạo vật thể
var boxGeo = new THREE.BoxGeometry(boxInfo.width, boxInfo.height, boxInfo.depth);
var boxList = getMaterialandAddScene(scene, boxGeo);
var sphereGeo = new THREE.SphereGeometry(sphereInfo.radius);
var sphereList = getMaterialandAddScene(scene, sphereGeo);
var coneGeo = new THREE.ConeGeometry(coneInfo.radius, coneInfo.height);
var coneList = getMaterialandAddScene(scene, coneGeo);
var cylinderGeo = new THREE.CylinderGeometry(cylinderInfo.radiusTop, cylinderInfo.radiusBot, cylinderInfo.height);
var cylinderList = getMaterialandAddScene(scene, cylinderGeo);
var torusGeo = new THREE.TorusGeometry(torusInfo.radius, torusInfo.tube);
var torusList = getMaterialandAddScene(scene, torusGeo);
var teapotGeo = new TeapotGeometry(teapotInfo.size);
var teapotList = getMaterialandAddScene(scene, teapotGeo);

var capsuleGeo = new THREE.CapsuleGeometry(capsuleInfo.radius, capsuleInfo.length);
var capsuleList = getMaterialandAddScene(scene, capsuleGeo);
var torusKnotGeo = new THREE.TorusKnotGeometry(torusKnotInfo.radius, torusKnotInfo.tube)
var torusKnotList = getMaterialandAddScene(scene, torusKnotGeo);
var planeGeo = new THREE.PlaneGeometry(planeInfo.width, planeInfo.height);
var planeList = getMaterialandAddScene(scene, planeGeo);

//Thay đổi thuộc tính cho plane để dễ nhìn hơn
planeList.solid.material.side = THREE.DoubleSide;
planeList.point.material.side = THREE.DoubleSide;

//Gom thông tin các đối tượng
const objectGeo = [boxGeo, sphereGeo, coneGeo, cylinderGeo, torusGeo, teapotGeo, capsuleGeo, torusKnotGeo, planeGeo]
const objectInfo = [boxInfo, sphereInfo, coneInfo, cylinderInfo, torusInfo, teapotInfo, capsuleInfo, torusKnotInfo, planeInfo]
const objectList = [boxList, sphereList, coneList, cylinderList, torusList, teapotList, capsuleList, torusKnotList, planeList]
const objectName = ['Box', 'Sphere', 'Cone', 'Cylinder', 'Torus', 'Teapot', 'Capsule', 'TorusKnot', 'Plane']

//dat.gui
const gui = new dat.GUI();
var object_mat_affineGui = gui.addFolder('Object, Material, Affine');
for(let i=0; i<objectName.length; i++){
    buildGui(object_mat_affineGui, objectName[i], objectInfo[i], objectList[i]);
}
var modelGui = object_mat_affineGui.addFolder('Available model');
//dat.gui camera
//Không cần vì có OrbitControl
var cameraGui = gui.addFolder('Camera (using OrbitControls)');

//light for mushroom and soccer ball
var ambientLightForModel = new THREE.AmbientLight(0xffffff, 1);
ambientLightForModel.visible = false;
modelGui.add(ambientLightForModel, 'visible').name('lighting for seeing model');
scene.add(ambientLightForModel);

//Load model có sẵn từ tập tin
//Gồm 3 model: shiba, mushroom, ball
const gltfloader1 = new GLTFLoader();
gltfloader1.load(
	// resource URL
	'available_model/shiba.glb',
	// called when the resource is loaded
	function ( glb ) {
        var shiba = glb.scene;
        shiba.position.set(0, 0, 0);
        shiba.scale.set(7, 7, 7);
        shiba.visible = false;
        modelGui.add(shiba, 'visible').name('shiba');
        scene.add( shiba );
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

var gltfloader2 = new GLTFLoader();
gltfloader2.load(
	// resource URL
	'available_model/fly_agaric_mushroom.glb',
	// called when the resource is loaded
	function ( glb2 ) {
        var mushroom = glb2.scene;
        mushroom.position.set(0, 0, 0);
        mushroom.scale.set(0.05, 0.05, 0.05);
        mushroom.visible = false;
        modelGui.add(mushroom, 'visible').name('mushroom');
        scene.add( mushroom );
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);

var gltfloader3 = new GLTFLoader();
gltfloader3.load(
	// resource URL
	'available_model/soccer_ball.glb',
	// called when the resource is loaded
	function ( glb3 ) {
        var ball = glb3.scene;
        ball.position.set(0, 0, 0);
        ball.scale.set(3, 3, 3);
        ball.visible = false;
        modelGui.add(ball, 'visible').name('soccer ball');
        scene.add( ball );
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log( 'An error happened' );
	}
);


//Hàm animation
function animate(){

    //Biến đổi affine gồm Tịnh tiến, Quay, Tỉ lệ lên từng object
    for(let i=0; i<objectName.length; i++){
        renderAffine(objectInfo[i], objectList[i]);
    }

    //Phép chiếu phối cảnh, thay đổi vị trí (x, y, z) và lookAt (near, far)
    //camera.position.set(cameraInfo.x_position, cameraInfo.y_position, cameraInfo.z_position);
    //Có orbitControls
    Orbit.update();
    // camera.lookAt(cameraInfo.x_lookAt, cameraInfo.y_lookAt, cameraInfo.z_lookAt);

    //Kết xuất
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

//Hàm thực hiện tạo material và mesh tương ứng, sau đó add vào scene
function getMaterialandAddScene(scene, geo){
    const mat_solid = new THREE.MeshBasicMaterial({
        visible: false,
    });
    const mat_point = new THREE.PointsMaterial({
        visible: false,
    });

    var mesh_solid = new THREE.Mesh(geo, mat_solid);
    var mesh_point = new THREE.Points(geo, mat_point);

    scene.add(mesh_solid);
    scene.add(mesh_point);

    return {solid: mesh_solid, point: mesh_point}
}

//Hàm thực hiện build dat.gui cho mỗi vật thể
function buildGui(gui, nameFolder, boxInfo, boxList){
    const boxGui = gui.addFolder(nameFolder);
    boxGui.add(boxList.solid.material, 'visible').name('solid');
    boxGui.add(boxList.solid.material, 'wireframe').name('lines');
    boxGui.add(boxList.point.material, 'visible').name('points');

    var boxPosition = boxGui.addFolder('Transform');
    boxPosition.add(boxInfo, 'x_position', -20, 20).name('position x');
    boxPosition.add(boxInfo, 'y_position', -20, 20).name('position y');
    boxPosition.add(boxInfo, 'z_position', -20, 20).name('position z');

    var boxRotation = boxGui.addFolder('Rotation');
    boxRotation.add(boxInfo, 'x_rotation', -20, 20).name('rotation x');
    boxRotation.add(boxInfo, 'y_rotation', -20, 20).name('rotation y');
    boxRotation.add(boxInfo, 'z_rotation', -20, 20).name('rotation z');

    var boxScaling = boxGui.addFolder('Scaling');
    boxScaling.add(boxInfo, 'x_scaling', -20, 20).name('scaling x');
    boxScaling.add(boxInfo, 'y_scaling', -20, 20).name('scaling y');
    boxScaling.add(boxInfo, 'z_scaling', -20, 20).name('scaling z');
}

//Hàm thực hiện render các phép biến đổi Affine
function renderAffine(boxInfo, boxList){
    boxList.solid.position.set(boxInfo.x_position, boxInfo.y_position, boxInfo.z_position);
    boxList.point.position.set(boxInfo.x_position, boxInfo.y_position, boxInfo.z_position);

    boxList.solid.rotation.set(boxInfo.x_rotation, boxInfo.y_rotation, boxInfo.z_rotation);
    boxList.point.rotation.set(boxInfo.x_rotation, boxInfo.y_rotation, boxInfo.z_rotation);

    boxList.solid.scale.set(boxInfo.x_scaling, boxInfo.y_scaling, boxInfo.z_scaling);
    boxList.point.scale.set(boxInfo.x_scaling, boxInfo.y_scaling, boxInfo.z_scaling);
}