import * as THREE from 'three';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';
import { TeapotGeometry } from '/node_modules/three/examples/jsm/geometries/TeapotGeometry.js';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';

//Tạo cảnh
const scene = new THREE.Scene();

//Tạo kết xuất
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
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
const clock = new THREE.Clock();

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
var object_mat_affineGui = gui.addFolder('Object, Material and Affine');
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
const gltfloader = new GLTFLoader();
gltfloader.load(
	// resource URL
	'available_model/shiba.glb',
	// called when the resource is loaded
	function ( glb ) {
        var model = glb.scene;
        model.position.set(0, 0, 0);
        model.scale.set(7, 7, 7);
        model.visible = false;
        modelGui.add(model, 'visible').name('shiba');
        scene.add( model );
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

gltfloader.load(
	// resource URL
	'available_model/fly_agaric_mushroom.glb',
	// called when the resource is loaded
	function ( glb ) {
        var model = glb.scene;
        model.position.set(0, 0, 0);
        model.scale.set(0.05, 0.05, 0.05);
        model.visible = false;
        modelGui.add(model, 'visible').name('mushroom');
        scene.add( model );
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

gltfloader.load(
	// resource URL
	'available_model/soccer_ball.glb',
	// called when the resource is loaded
	function ( glb ) {
        var model = glb.scene;
        model.position.set(0, 0, 0);
        model.scale.set(3, 3, 3);
        model.visible = false;
        modelGui.add(model, 'visible').name('soccer ball');
        scene.add( model );
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



//---------------------------------------------------------
//Chiếu sáng và Texture
//Thực hiện Texture
var textureLoader = new THREE.TextureLoader();
var textureEarth = textureLoader.load('./texture/earth.jpg');

//Vật thể và mặt phẳng
const sphereLightingGeo = new THREE.SphereGeometry(5 );
const sphereLightingMat = new THREE.MeshPhongMaterial({
    map: textureEarth,
});
var sphereLightingMesh = new THREE.Mesh(sphereLightingGeo, sphereLightingMat);

const planeLightingGeo = new THREE.PlaneGeometry(100, 100);
const planeLightingMat = new THREE.MeshPhongMaterial();
var planeLightingMesh = new THREE.Mesh(planeLightingGeo, planeLightingMat);

var objectLightMesh = new THREE.Object3D();
planeLightingMesh.add(sphereLightingMesh);
objectLightMesh.add(sphereLightingMesh);
objectLightMesh.add(planeLightingMesh);

objectLightMesh.visible = false;

//Các loại ánh sáng
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0.5);
var pointLight = new THREE.PointLight(0xffffff, 0.5);
var spotLight = new THREE.SpotLight(0xffffff, 0.5);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

var sphereOfLighting1 = getSphereOfLighting();
var sphereOfLighting2 = getSphereOfLighting();
var sphereOfLighting3 = getSphereOfLighting();
var sphereOfLighting4 = getSphereOfLighting();

directionalLight.add(sphereOfLighting1);
hemisphereLight.add(sphereOfLighting2);
pointLight.add(sphereOfLighting3);
spotLight.add(sphereOfLighting4);

//Thay đổi vị trí chiếu sáng
directionalLight.position.set(0, 20, 0);
hemisphereLight.position.set(0, 20, 0);
pointLight.position.set(0, 20, 0);
spotLight.position.set(0, 20, 0);
ambientLight.position.set(0, 20, 0);

//Điều chỉnh thông số cho phù hợp 
sphereLightingMesh.castShadow = true;
sphereLightingMesh.position.set(0, 6, 0);
planeLightingMesh.receiveShadow = true;
planeLightingMesh.rotation.set(-Math.PI/2, 0, 0);
planeLightingMesh.side = THREE.DoubleSide;
directionalLight.castShadow = true;
hemisphereLight.castShadow = true;
pointLight.castShadow = true;
spotLight.castShadow = true;

//Thiết lập visible = false
directionalLight.visible = false;
hemisphereLight.visible = false;
pointLight.visible = false;
spotLight.visible = false;
ambientLight.visible = false;

//add object, lighting váo scene
scene.add(objectLightMesh);
scene.add(directionalLight);
scene.add(hemisphereLight);
scene.add(pointLight);
scene.add(spotLight);
scene.add(ambientLight);

//dat.gui cho Lighting and Texture
var lighting_textureGui = gui.addFolder('Lighting and Texture');
lighting_textureGui.add(objectLightMesh, 'visible').name('object');
var lightingGui = lighting_textureGui.addFolder('Lighting');
lightingGui.add(directionalLight, 'visible').name('directional light');
lightingGui.add(hemisphereLight, 'visible').name('hemisphere light');
lightingGui.add(pointLight, 'visible').name('point light');
lightingGui.add(spotLight, 'visible').name('spot light');
lightingGui.add(ambientLight, 'visible').name('ambient light');



//-------------------------------------------------------------------
//Animation cho vật thể
var texturePokemonBall = textureLoader.load('./texture/pokemon_ball.jpg');
var textureSnowBall = textureLoader.load('./texture/snow_ball.jpg');

var pokemonBallGeo = new THREE.SphereGeometry(5);
var pokemonBallMat = new THREE.MeshBasicMaterial({
    map: texturePokemonBall,
});
var pokemonBallMesh = new THREE.Mesh(pokemonBallGeo, pokemonBallMat);

var planeOfPokemonBallGeo = new THREE.PlaneGeometry(50, 50);
var planeOfPokemonBallMat = new THREE.MeshBasicMaterial({
    color: 'rgb(150, 150, 150)',
});
var planeOfPokemonBallMesh = new THREE.Mesh(planeOfPokemonBallGeo, planeOfPokemonBallMat);
var centerOfTurnAround = new THREE.Object3D();
var animationObjectGroup = new THREE.Object3D();

//Add vật thể với nhau
centerOfTurnAround.add(pokemonBallMesh);
animationObjectGroup.add(planeOfPokemonBallMesh);
animationObjectGroup.add(centerOfTurnAround);
scene.add(animationObjectGroup);

//Thay đổi thông số cho phù hợp
pokemonBallMesh.position.set(10, 5, 0);
pokemonBallMesh.rotation.set(Math.PI/2, -Math.PI/2, Math.PI/2);
planeOfPokemonBallMesh.rotation.set(-Math.PI/2, 0, 0);
planeOfPokemonBallMesh.side = THREE.DoubleSide;
centerOfTurnAround.position.set(0, 0, 0);
animationObjectGroup.visible = true;


//Chuẩn bị thông số
var trigger = {
    jump: false,
    roll: false,
    turn_around: false,
}


//dat.gui cho animation
var animationGui = gui.addFolder('Animation');
animationGui.add(planeOfPokemonBallMesh, 'visible').name('object');
animationGui.add(trigger, 'jump');
animationGui.add(trigger, 'roll');
animationGui.add(trigger, 'turn_around').name('turn around');

//Hàm thực hiện Nhảy
var time;
function animateJump(){
    centerOfTurnAround.translateY(Math.sin(2*time)/2);
}

//Hàm thực hiện Lăn
function animateRoll(){
    pokemonBallMesh.rotateZ(-Math.PI/24);
}

//Hàm thực hiện Xoay tròn
function animateTurnAround(){
    centerOfTurnAround.rotateY(-Math.PI/32);
}


//-------------------------------------------------------------------
//Hàm animate để thực hiện render 
function animate(){

    //Biến đổi affine gồm Tịnh tiến, Quay, Tỉ lệ lên từng object
    for(let i=0; i<objectName.length; i++){
        renderAffine(objectInfo[i], objectList[i]);
    }

    //Phép chiếu phối cảnh, thay đổi vị trí (x, y, z) và lookAt (near, far)
    //camera.position.set(cameraInfo.x_position, cameraInfo.y_position, cameraInfo.z_position);
    //camera.lookAt(cameraInfo.x_lookAt, cameraInfo.y_lookAt, cameraInfo.z_lookAt);
    //Có orbitControls
    Orbit.update();


    //Thêm animation cho vật thể
    time = clock.getElapsedTime();

    if(trigger.jump)
        animateJump();
    if(trigger.roll)
        animateRoll();
    if(trigger.turn_around)
        animateTurnAround();
    

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
    const mat_line = new THREE.LineBasicMaterial({
        visible: false,
    })
    const mat_point = new THREE.PointsMaterial({
        visible: false,
    });

    var mesh_solid = new THREE.Mesh(geo, mat_solid);
    var mesh_line = new THREE.Line(geo, mat_line);
    var mesh_point = new THREE.Points(geo, mat_point);

    scene.add(mesh_solid);
    scene.add(mesh_line);
    scene.add(mesh_point);

    return {solid: mesh_solid, line: mesh_line, point: mesh_point}
}

//Hàm thực hiện build dat.gui cho mỗi vật thể
function buildGui(gui, nameFolder, boxInfo, boxList){
    const boxGui = gui.addFolder(nameFolder);
    boxGui.add(boxList.solid.material, 'visible').name('solid');
    boxGui.add(boxList.line.material, 'visible').name('lines');
    boxGui.add(boxList.point.material, 'visible').name('points');

    var boxPosition = boxGui.addFolder('Translation');
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
    boxList.line.position.set(boxInfo.x_position, boxInfo.y_position, boxInfo.z_position);
    boxList.point.position.set(boxInfo.x_position, boxInfo.y_position, boxInfo.z_position);

    boxList.solid.rotation.set(boxInfo.x_rotation, boxInfo.y_rotation, boxInfo.z_rotation);
    boxList.line.rotation.set(boxInfo.x_rotation, boxInfo.y_rotation, boxInfo.z_rotation);
    boxList.point.rotation.set(boxInfo.x_rotation, boxInfo.y_rotation, boxInfo.z_rotation);

    boxList.solid.scale.set(boxInfo.x_scaling, boxInfo.y_scaling, boxInfo.z_scaling);
    boxList.line.scale.set(boxInfo.x_scaling, boxInfo.y_scaling, boxInfo.z_scaling);
    boxList.point.scale.set(boxInfo.x_scaling, boxInfo.y_scaling, boxInfo.z_scaling);
}

//Hàm giúp tạo ra cầu chỉ vị trí ánh sáng
function getSphereOfLighting(){
    var Geo = new THREE.SphereGeometry(0.5);
    var Mat = new THREE.MeshBasicMaterial({
        color: 'rgb(255, 255, 0)'
    });
    var Mesh = new THREE.Mesh(Geo, Mat);
    return Mesh;
}