/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314 -- Sept 2023  -- A3 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('A3 Sept 2023');

var a = 7;
var b = 2.6;
console.log('a=', a, 'b=', b);
var myvector = new THREE.Vector3(0, 1, 2);
console.log('myvector =', myvector);

var animation = true;
var meshesLoaded = false;
var RESOURCES_LOADED = false;
var deg2rad = Math.PI / 180;

// give the following global scope (within in this file), which is useful for motions and objects
// that are related to animation

var crabMotion = new Motion(crabSetMatrices);
var crabClap = new Motion(crabClapMatrices)

var crabLink1, crabLink2, crabLink3, crabLink4, crabLink5, crabLink6, crabLink7, crabLink8, crabLink9, crabLink10, crabLink11, crabLink12, crabLink13, crabLink14, crabLink15, crabLink16, crabLink17, crabLink18, crabLink19, crabLink20, crabLink21
var crabLinkFrame1, crabLinkFrame2, crabLinkFrame3, crabLinkFrame4, crabLinkFrame5, crabLinkFrame6, crabLinkFrame7, crabLinkFrame8, crabLinkFrame9, crabLinkFrame10, crabLinkFrame11, crabLinkFrame12, crabLinkFrame13, crabLinkFrame14, crabLinkFrame15, crabLinkFrame16, crabLinkFrame17, crabLinkFrame18, crabLinkFrame19, crabLinkFrame20, crabLinkFrame21
var sphere;
var meshes = {};


// SETUP RENDERER & SCENE

var canvas = document.getElementById('canvas');
var camera;
var light;
var ambientLight;
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setClearColor(0xd0f0d0);     // set background colour
canvas.appendChild(renderer.domElement);

var clap = false;
var jump = false;

//////////////////////////////////////////////////////////
//  initCamera():   SETUP CAMERA
//////////////////////////////////////////////////////////

function initCamera() {
  // set up M_proj    (internally:  camera.projectionMatrix )
  var cameraFov = 30;     // initial camera vertical field of view, in degrees
  // view angle, aspect ratio, near, far
  camera = new THREE.PerspectiveCamera(cameraFov, 1, 0.1, 1000);

  var width = 10; var height = 5;

  //    An example of setting up an orthographic projection using threejs:
  //    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0.1, 1000 );

  // set up M_view:   (internally:  camera.matrixWorldInverse )
  camera.position.set(0, 12, 20);
  camera.up = new THREE.Vector3(0, 1, 0);
  camera.lookAt(0, 0, 0);
  scene.add(camera);

  // SETUP ORBIT CONTROLS OF THE CAMERA (user control of rotation, pan, zoom)
  //    const controls = new OrbitControls( camera, renderer.domElement );
  var controls = new THREE.OrbitControls(camera);
  controls.damping = 0.2;
  controls.autoRotate = false;
};

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
  window.scrollTo(0, 0);
}

////////////////////////////////////////////////////////////////////////	
// init():  setup up scene
////////////////////////////////////////////////////////////////////////	

function init() {
  console.log('init called');

  initCamera();
  initMotions();
  initLights();
  initObjects();
  initCrab();
  initFileObjects();

  window.addEventListener('resize', resize);
  resize();
};

////////////////////////////////////////////////////////////////////////
// initMotions():  setup Motion instances for each object that we wish to animate
////////////////////////////////////////////////////////////////////////

function initMotions() {
  crabMotion.addKeyFrame(new Keyframe('zero', 0.0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  crabMotion.addKeyFrame(new Keyframe('one', 1.0, [0, -1, 30, 15, 10, 15, 20, 15, 25, 15, 5, 30]));
  crabMotion.addKeyFrame(new Keyframe('two', 2.0, [0, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  crabMotion.addKeyFrame(new Keyframe('three', 3.0, [0, -3, 30, 15, 10, 15, 20, 15, 25, 15, 5, 30]));
  crabMotion.addKeyFrame(new Keyframe('two', 4.0, [0, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  crabMotion.addKeyFrame(new Keyframe('one', 5.0, [0, -1, 30, 15, 10, 15, 20, 15, 25, 15, 5, 30]));
  crabMotion.addKeyFrame(new Keyframe('zero', 6.0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));

  crabClap.addKeyFrame(new Keyframe('zero', 0.0, [0, 0]));
  crabClap.addKeyFrame(new Keyframe('one', 1.0, [30, 30]));
  crabClap.addKeyFrame(new Keyframe('zero', 2.0, [0, 0]));
  crabClap.addKeyFrame(new Keyframe('one', 3.0, [30, 30]));
  crabClap.addKeyFrame(new Keyframe('zero', 4.0, [0, 0]));
}

function crabClapMatrices(avars) {
  var theta1 = avars[0];
  var theta2 = avars[1];
  var M = new THREE.Matrix4();

  crabLinkFrame10.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame10.matrix.multiply(M.makeTranslation(2, 0, -2));
  crabLinkFrame10.matrix.multiply(M.makeRotationZ(-15 * deg2rad));
  crabLinkFrame10.matrix.multiply(M.makeRotationY(60 * deg2rad + theta1 * deg2rad));
  crabLink10.matrix.copy(crabLinkFrame10.matrix);
  crabLink10.matrix.multiply(M.makeTranslation(0.5, 0, 0));
  crabLink10.matrix.multiply(M.makeScale(1, 0.5, 0.5));

  crabLinkFrame20.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame20.matrix.multiply(M.makeTranslation(-2, 0, -2));
  crabLinkFrame20.matrix.multiply(M.makeRotationZ(15 * deg2rad));
  crabLinkFrame20.matrix.multiply(M.makeRotationY(120 * deg2rad - theta1 * deg2rad));
  crabLink20.matrix.copy(crabLinkFrame20.matrix);
  crabLink20.matrix.multiply(M.makeTranslation(0.5, 0, 0));
  crabLink20.matrix.multiply(M.makeScale(1, 0.5, 0.5));

  crabLinkFrame11.matrix.copy(crabLinkFrame10.matrix);
  crabLinkFrame11.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLinkFrame11.matrix.multiply(M.makeRotationY(60 * deg2rad + theta2 * deg2rad));
  crabLink11.matrix.copy(crabLinkFrame11.matrix);
  crabLink11.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink11.matrix.multiply(M.makeScale(2, 1, 1));

  crabLinkFrame21.matrix.copy(crabLinkFrame20.matrix);
  crabLinkFrame21.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLinkFrame21.matrix.multiply(M.makeRotationY(-60 * deg2rad  - theta2 * deg2rad));
  crabLink21.matrix.copy(crabLinkFrame21.matrix);
  crabLink21.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink21.matrix.multiply(M.makeScale(2, 1, 1));

  crabLink10.updateMatrixWorld();
  crabLinkFrame10.updateMatrixWorld();
  crabLink20.updateMatrixWorld();
  crabLinkFrame20.updateMatrixWorld();
  crabLink11.updateMatrixWorld();
  crabLinkFrame11.updateMatrixWorld();
  crabLink21.updateMatrixWorld();
  crabLinkFrame21.updateMatrixWorld();
}

function crabSetMatrices(avars) {
  var xPosition = avars[0];
  var zPosition = avars[1];
  var theta1 = avars[2];
  var theta2 = avars[3];
  var theta3 = avars[4];
  var theta4 = avars[5];
  var theta5 = avars[6];
  var theta6 = avars[7];
  var theta7 = avars[8];
  var theta8 = avars[9];
  var yPosition = avars[10];
  var jumpAngle = avars[11];
  var M = new THREE.Matrix4();

  jumpFactor = 0;
  yPos = 0;
  if (jump) {
    jumpFactor = jumpAngle * deg2rad;
    yPos = yPosition;
  }

  crabLinkFrame1.matrix.identity();
  crabLinkFrame1.matrix.multiply(M.makeTranslation(xPosition, yPos, zPosition))
  crabLink1.matrix.copy(crabLinkFrame1.matrix);
  crabLink1.matrix.multiply(M.makeScale(4, 0.75, 4));

  crabLinkFrame2.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame2.matrix.multiply(M.makeTranslation(2, 0, 2));
  crabLinkFrame2.matrix.multiply(M.makeRotationZ(-15 * deg2rad - jumpFactor));
  crabLinkFrame2.matrix.multiply(M.makeRotationY(-15 * deg2rad - theta1 * deg2rad));
  crabLink2.matrix.copy(crabLinkFrame2.matrix);
  crabLink2.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink2.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame12.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame12.matrix.multiply(M.makeTranslation(-2, 0, 2));
  crabLinkFrame12.matrix.multiply(M.makeRotationY(195 * deg2rad + theta1 * deg2rad));
  crabLinkFrame12.matrix.multiply(M.makeRotationZ(-15 * deg2rad - jumpFactor));
  crabLink12.matrix.copy(crabLinkFrame12.matrix);
  crabLink12.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink12.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame3.matrix.copy(crabLinkFrame2.matrix);
  crabLinkFrame3.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame3.matrix.multiply(M.makeRotationY(-45 * deg2rad - theta2 * deg2rad));
  crabLink3.matrix.copy(crabLinkFrame3.matrix);
  crabLink3.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink3.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame13.matrix.copy(crabLinkFrame12.matrix);
  crabLinkFrame13.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame13.matrix.multiply(M.makeRotationY(45 * deg2rad + theta2 * deg2rad));
  crabLink13.matrix.copy(crabLinkFrame13.matrix);
  crabLink13.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink13.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame4.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame4.matrix.multiply(M.makeTranslation(2, 0, 1));
  crabLinkFrame4.matrix.multiply(M.makeRotationZ(-15 * deg2rad - jumpFactor));
  crabLinkFrame4.matrix.multiply(M.makeRotationY(- theta3 * deg2rad));
  crabLink4.matrix.copy(crabLinkFrame4.matrix);
  crabLink4.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink4.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame14.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame14.matrix.multiply(M.makeTranslation(-2, 0, 1));
  crabLinkFrame14.matrix.multiply(M.makeRotationY(180 * deg2rad + theta3 * deg2rad));
  crabLinkFrame14.matrix.multiply(M.makeRotationZ(-15 * deg2rad - jumpFactor));
  crabLink14.matrix.copy(crabLinkFrame14.matrix);
  crabLink14.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink14.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame5.matrix.copy(crabLinkFrame4.matrix);
  crabLinkFrame5.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame5.matrix.multiply(M.makeRotationY(15 * deg2rad - theta4 * deg2rad));
  crabLink5.matrix.copy(crabLinkFrame5.matrix);
  crabLink5.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink5.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame15.matrix.copy(crabLinkFrame14.matrix);
  crabLinkFrame15.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame15.matrix.multiply(M.makeRotationY(-15 * deg2rad + theta4 * deg2rad));
  crabLink15.matrix.copy(crabLinkFrame15.matrix);
  crabLink15.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink15.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame6.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame6.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame6.matrix.multiply(M.makeRotationZ(-15 * deg2rad - jumpFactor));
  crabLinkFrame6.matrix.multiply(M.makeRotationY(- theta5 * deg2rad));
  crabLink6.matrix.copy(crabLinkFrame6.matrix);
  crabLink6.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink6.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame16.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame16.matrix.multiply(M.makeTranslation(-2, 0, 0));
  crabLinkFrame16.matrix.multiply(M.makeRotationY(180 * deg2rad + theta5 * deg2rad));
  crabLinkFrame16.matrix.multiply(M.makeRotationZ(-15 * deg2rad - jumpFactor));
  crabLink16.matrix.copy(crabLinkFrame16.matrix);
  crabLink16.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink16.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame7.matrix.copy(crabLinkFrame6.matrix);
  crabLinkFrame7.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame7.matrix.multiply(M.makeRotationY(45 * deg2rad - theta6 * deg2rad));
  crabLink7.matrix.copy(crabLinkFrame7.matrix);
  crabLink7.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink7.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame17.matrix.copy(crabLinkFrame16.matrix);
  crabLinkFrame17.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame17.matrix.multiply(M.makeRotationY(-45 * deg2rad + theta6 * deg2rad));
  crabLink17.matrix.copy(crabLinkFrame17.matrix);
  crabLink17.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink17.matrix.multiply(M.makeScale(2, 0.5, 0.5));


  crabLinkFrame8.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame8.matrix.multiply(M.makeTranslation(2, 0, -1));
  crabLinkFrame8.matrix.multiply(M.makeRotationZ(-15 * deg2rad  - jumpFactor));
  crabLinkFrame8.matrix.multiply(M.makeRotationY(20 * deg2rad - theta7 * deg2rad));
  crabLink8.matrix.copy(crabLinkFrame8.matrix);
  crabLink8.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink8.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame18.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame18.matrix.multiply(M.makeTranslation(-2, 0, -1));
  crabLinkFrame18.matrix.multiply(M.makeRotationZ(15 * deg2rad + jumpFactor));
  crabLinkFrame18.matrix.multiply(M.makeRotationY(165 * deg2rad + theta7 * deg2rad));
  crabLink18.matrix.copy(crabLinkFrame18.matrix);
  crabLink18.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink18.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame9.matrix.copy(crabLinkFrame8.matrix);
  crabLinkFrame9.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame9.matrix.multiply(M.makeRotationY(60 * deg2rad - theta8 * deg2rad));
  crabLink9.matrix.copy(crabLinkFrame9.matrix);
  crabLink9.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink9.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame19.matrix.copy(crabLinkFrame18.matrix);
  crabLinkFrame19.matrix.multiply(M.makeTranslation(2, 0, 0));
  crabLinkFrame19.matrix.multiply(M.makeRotationY(-60 * deg2rad + theta8 * deg2rad));
  crabLink19.matrix.copy(crabLinkFrame19.matrix);
  crabLink19.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink19.matrix.multiply(M.makeScale(2, 0.5, 0.5));

  crabLinkFrame10.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame10.matrix.multiply(M.makeTranslation(2, 0, -2));
  crabLinkFrame10.matrix.multiply(M.makeRotationZ(-15 * deg2rad));
  crabLinkFrame10.matrix.multiply(M.makeRotationY(60 * deg2rad));
  crabLink10.matrix.copy(crabLinkFrame10.matrix);
  crabLink10.matrix.multiply(M.makeTranslation(0.5, 0, 0));
  crabLink10.matrix.multiply(M.makeScale(1, 0.5, 0.5));

  crabLinkFrame20.matrix.copy(crabLinkFrame1.matrix);
  crabLinkFrame20.matrix.multiply(M.makeTranslation(-2, 0, -2));
  crabLinkFrame20.matrix.multiply(M.makeRotationZ(15 * deg2rad));
  crabLinkFrame20.matrix.multiply(M.makeRotationY(120 * deg2rad));
  crabLink20.matrix.copy(crabLinkFrame20.matrix);
  crabLink20.matrix.multiply(M.makeTranslation(0.5, 0, 0));
  crabLink20.matrix.multiply(M.makeScale(1, 0.5, 0.5));

  crabLinkFrame11.matrix.copy(crabLinkFrame10.matrix);
  crabLinkFrame11.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLinkFrame11.matrix.multiply(M.makeRotationY(60 * deg2rad));
  crabLink11.matrix.copy(crabLinkFrame11.matrix);
  crabLink11.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink11.matrix.multiply(M.makeScale(2, 1, 1));

  crabLinkFrame21.matrix.copy(crabLinkFrame20.matrix);
  crabLinkFrame21.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLinkFrame21.matrix.multiply(M.makeRotationY(-60 * deg2rad));
  crabLink21.matrix.copy(crabLinkFrame21.matrix);
  crabLink21.matrix.multiply(M.makeTranslation(1, 0, 0));
  crabLink21.matrix.multiply(M.makeScale(2, 1, 1));



  crabLink1.updateMatrixWorld();
  crabLinkFrame1.updateMatrixWorld();
  crabLink2.updateMatrixWorld();
  crabLinkFrame2.updateMatrixWorld();
  crabLink3.updateMatrixWorld();
  crabLinkFrame3.updateMatrixWorld();
  crabLink4.updateMatrixWorld();
  crabLinkFrame4.updateMatrixWorld();
  crabLink5.updateMatrixWorld();
  crabLinkFrame5.updateMatrixWorld();
  crabLink6.updateMatrixWorld();
  crabLinkFrame6.updateMatrixWorld();
  crabLink7.updateMatrixWorld();
  crabLinkFrame7.updateMatrixWorld();
  crabLink8.updateMatrixWorld();
  crabLinkFrame8.updateMatrixWorld();
  crabLink9.updateMatrixWorld();
  crabLinkFrame9.updateMatrixWorld();
  crabLink10.updateMatrixWorld();
  crabLinkFrame10.updateMatrixWorld();
  crabLink11.updateMatrixWorld();
  crabLinkFrame11.updateMatrixWorld();
  crabLink12.updateMatrixWorld();
  crabLinkFrame12.updateMatrixWorld();
  crabLink13.updateMatrixWorld();
  crabLinkFrame13.updateMatrixWorld();
  crabLink14.updateMatrixWorld();
  crabLinkFrame14.updateMatrixWorld();
  crabLink15.updateMatrixWorld();
  crabLinkFrame15.updateMatrixWorld();
  crabLink16.updateMatrixWorld();
  crabLinkFrame16.updateMatrixWorld();
  crabLink17.updateMatrixWorld();
  crabLinkFrame17.updateMatrixWorld();
  crabLink18.updateMatrixWorld();
  crabLinkFrame18.updateMatrixWorld();
  crabLink19.updateMatrixWorld();
  crabLinkFrame19.updateMatrixWorld();
  crabLink20.updateMatrixWorld();
  crabLinkFrame20.updateMatrixWorld();
  crabLink21.updateMatrixWorld();
  crabLinkFrame21.updateMatrixWorld();
}



/////////////////////////////////////	
// initLights():  SETUP LIGHTS
/////////////////////////////////////	

function initLights() {
  light = new THREE.PointLight(0xffffff);
  light.position.set(0, 4, 2);
  scene.add(light);
  ambientLight = new THREE.AmbientLight(0x606060);
  scene.add(ambientLight);
}

/////////////////////////////////////	
// MATERIALS
/////////////////////////////////////	

var diffuseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
var diffuseMaterial2 = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
var basicMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
var armadilloMaterial = new THREE.MeshBasicMaterial({ color: 0x7fff7f });

/////////////////////////////////////	
// initObjects():  setup objects in the scene
/////////////////////////////////////	

function initObjects() {
    var worldFrame = new THREE.AxesHelper(5);
    scene.add(worldFrame);

    // textured floor
    var floorTexture = new THREE.TextureLoader().load('images/sand.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(1, 1);
    var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    var floorGeometry = new THREE.PlaneGeometry(30, 30);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -1.1;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    var backdrop = new THREE.TextureLoader().load('images/ocean.jpg');
    backdrop.wrapS = backdrop.wrapT = THREE.RepeatWrapping;
    backdrop.repeat.set(1, 1);
    var backdropMaterial = new THREE.MeshBasicMaterial({ map: backdrop, side: THREE.DoubleSide });
    var backdropGeometry = new THREE.PlaneGeometry(30, 15);
    var backdropObj = new THREE.Mesh(backdropGeometry, backdropMaterial);
    backdropObj.position.z = -15;
    backdropObj.position.y = 6;
    // backdropObj.rotation.x = Math.PI / 2;
    scene.add(backdropObj);

    // sphere, located at light position
    var sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
    sphere = new THREE.Mesh(sphereGeometry, basicMaterial);
    sphere.position.set(0, 4, 2);
    sphere.position.set(light.position.x, light.position.y, light.position.z);
    scene.add(sphere);
}


function initCrab() {
  var crabMaterial = new THREE.MeshLambertMaterial({ color: 0xcf5d06 });
  var boxGeometry = new THREE.BoxGeometry(1, 1, 1);    // width, height, depth

  crabLink1 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink1);
  crabLinkFrame1 = new THREE.AxesHelper(1); scene.add(crabLinkFrame1);
  crabLink2 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink2);
  crabLinkFrame2 = new THREE.AxesHelper(1); scene.add(crabLinkFrame2);
  crabLink3 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink3);
  crabLinkFrame3 = new THREE.AxesHelper(1); scene.add(crabLinkFrame3);
  crabLink4 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink4);
  crabLinkFrame4 = new THREE.AxesHelper(1); scene.add(crabLinkFrame4);
  crabLink5 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink5);
  crabLinkFrame5 = new THREE.AxesHelper(1); scene.add(crabLinkFrame5);
  crabLink6 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink6);
  crabLinkFrame6 = new THREE.AxesHelper(1); scene.add(crabLinkFrame6);
  crabLink7 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink7);
  crabLinkFrame7 = new THREE.AxesHelper(1); scene.add(crabLinkFrame7);
  crabLink8 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink8);
  crabLinkFrame8 = new THREE.AxesHelper(1); scene.add(crabLinkFrame8);
  crabLink9 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink9);
  crabLinkFrame9 = new THREE.AxesHelper(1); scene.add(crabLinkFrame9);
  crabLink10 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink10);
  crabLinkFrame10 = new THREE.AxesHelper(1); scene.add(crabLinkFrame10);
  crabLink11 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink11);
  crabLinkFrame11 = new THREE.AxesHelper(1); scene.add(crabLinkFrame11);
  crabLink12 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink12);
  crabLinkFrame12 = new THREE.AxesHelper(1); scene.add(crabLinkFrame12);
  crabLink13 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink13);
  crabLinkFrame13 = new THREE.AxesHelper(1); scene.add(crabLinkFrame13);
  crabLink14 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink14);
  crabLinkFrame14 = new THREE.AxesHelper(1); scene.add(crabLinkFrame14);
  crabLink15 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink15);
  crabLinkFrame15 = new THREE.AxesHelper(1); scene.add(crabLinkFrame15);
  crabLink16 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink16);
  crabLinkFrame16 = new THREE.AxesHelper(1); scene.add(crabLinkFrame16);
  crabLink17 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink17);
  crabLinkFrame17 = new THREE.AxesHelper(1); scene.add(crabLinkFrame17);
  crabLink18 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink18);
  crabLinkFrame18 = new THREE.AxesHelper(1); scene.add(crabLinkFrame18);
  crabLink19 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink19);
  crabLinkFrame19 = new THREE.AxesHelper(1); scene.add(crabLinkFrame19);
  crabLink20 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink20);
  crabLinkFrame20 = new THREE.AxesHelper(1); scene.add(crabLinkFrame20);
  crabLink21 = new THREE.Mesh(boxGeometry, crabMaterial); scene.add(crabLink21);
  crabLinkFrame21 = new THREE.AxesHelper(1); scene.add(crabLinkFrame21);

  crabLink1.matrixAutoUpdate = false;
  crabLink2.matrixAutoUpdate = false;
  crabLink3.matrixAutoUpdate = false;
  crabLink4.matrixAutoUpdate = false;
  crabLink5.matrixAutoUpdate = false;
  crabLink6.matrixAutoUpdate = false;
  crabLink7.matrixAutoUpdate = false;
  crabLink8.matrixAutoUpdate = false;
  crabLink9.matrixAutoUpdate = false;
  crabLink10.matrixAutoUpdate = false;
  crabLink11.matrixAutoUpdate = false;
  crabLink12.matrixAutoUpdate = false;
  crabLink13.matrixAutoUpdate = false;
  crabLink14.matrixAutoUpdate = false;
  crabLink15.matrixAutoUpdate = false;
  crabLink16.matrixAutoUpdate = false;
  crabLink17.matrixAutoUpdate = false;
  crabLink18.matrixAutoUpdate = false;
  crabLink19.matrixAutoUpdate = false;
  crabLink20.matrixAutoUpdate = false;
  crabLink21.matrixAutoUpdate = false;
  crabLinkFrame1.matrixAutoUpdate = false;
  crabLinkFrame2.matrixAutoUpdate = false;
  crabLinkFrame3.matrixAutoUpdate = false;
  crabLinkFrame4.matrixAutoUpdate = false;
  crabLinkFrame5.matrixAutoUpdate = false;
  crabLinkFrame6.matrixAutoUpdate = false;
  crabLinkFrame7.matrixAutoUpdate = false;
  crabLinkFrame8.matrixAutoUpdate = false;
  crabLinkFrame9.matrixAutoUpdate = false;
  crabLinkFrame10.matrixAutoUpdate = false;
  crabLinkFrame11.matrixAutoUpdate = false;
  crabLinkFrame12.matrixAutoUpdate = false;
  crabLinkFrame13.matrixAutoUpdate = false;
  crabLinkFrame14.matrixAutoUpdate = false;
  crabLinkFrame15.matrixAutoUpdate = false;
  crabLinkFrame16.matrixAutoUpdate = false;
  crabLinkFrame17.matrixAutoUpdate = false;
  crabLinkFrame18.matrixAutoUpdate = false;
  crabLinkFrame19.matrixAutoUpdate = false;
  crabLinkFrame20.matrixAutoUpdate = false;
  crabLinkFrame21.matrixAutoUpdate = false;
}

/////////////////////////////////////////////////////////////////////////////////////
//  create customShader material
/////////////////////////////////////////////////////////////////////////////////////

var customShaderMaterial = new THREE.ShaderMaterial({
  //        uniforms: { textureSampler: {type: 't', value: floorTexture}},
  vertexShader: document.getElementById('customVertexShader').textContent,
  fragmentShader: document.getElementById('customFragmentShader').textContent
});

// var ctx = renderer.context;
// ctx.getShaderInfoLog = function () { return '' };   // stops shader warnings, seen in some browsers

////////////////////////////////////////////////////////////////////////	
// initFileObjects():    read object data from OBJ files;  see onResourcesLoaded() for instances
////////////////////////////////////////////////////////////////////////	

var models;

function initFileObjects() {
  // list of OBJ files that we want to load, and their material
  models = {
    seashell: { obj: "obj/new_seashell.obj", mtl: customShaderMaterial, mesh: null },
  };

  var manager = new THREE.LoadingManager();
  manager.onLoad = function () {
    console.log("loaded all resources");
    RESOURCES_LOADED = true;
    onResourcesLoaded();
  }
  var onProgress = function (xhr) {
    if (xhr.lengthComputable) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
  };
  var onError = function (xhr) {
  };

  // Load models;  asynchronous in JS, so wrap code in a fn and pass it the index
  for (var _key in models) {
    console.log('Key:', _key);
    (function (key) {
      var objLoader = new THREE.OBJLoader(manager);
      objLoader.load(models[key].obj, function (object) {
        object.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.material = models[key].mtl;
            child.material.shading = THREE.SmoothShading;
          }
        });
        models[key].mesh = object;
      }, onProgress, onError);
    })(_key);
  }
}

/////////////////////////////////////////////////////////////////////////////////////
// onResourcesLoaded():  once all OBJ files are loaded, this gets called.
//                       Object instancing is done here
/////////////////////////////////////////////////////////////////////////////////////

function onResourcesLoaded() {
  for(let i = 0; i < 30; i++) {
    shell_name = "shell".concat(i.toString());
    meshes[shell_name] = models.seashell.mesh.clone();

    num1 = 1
    num2 = 1
    if (Math.random() > 0.5) {
      num1 = -1;
    }
    if (Math.random() > 0.5) {
      num2 = -1;
    }

    meshes[shell_name].position.set(num1 * Math.floor(Math.random() * 16), -1.15, num2 * Math.floor(Math.random() * 16));
    meshes[shell_name].rotation.set(0, Math.random() * Math.PI, 0);
    meshes[shell_name].scale.set(0.1, 0.1, 0.1);
    scene.add(meshes[shell_name]);
  }

  meshesLoaded = true;
}


///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

// movement
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  var keyCode = event.which;
  // up
  if (keyCode == "W".charCodeAt()) {          // W = up
    light.position.y += 0.11;
    // down
  } else if (keyCode == "S".charCodeAt()) {   // S = down
    light.position.y -= 0.11;
    // left
  } else if (keyCode == "A".charCodeAt()) {   // A = left
    light.position.x -= 0.1;
    // right
  } else if (keyCode == "D".charCodeAt()) {   // D = right
    light.position.x += 0.11;
  } else if (keyCode == " ".charCodeAt()) {   // space
    animation = !animation;
  } else if (keyCode == "K".charCodeAt()) {   // space
    clap = !clap;
  } else if (keyCode == "J".charCodeAt()) {
    jump = !jump;
  }
};


///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK:    This is the main animation loop
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  //    console.log('update()');
  var dt = 0.02;
  if (animation && meshesLoaded) {
    // advance the motion of all the animated objects
    crabMotion.timestep(dt);
  }
  if (clap) {
    crabClap.timestep(dt);
  }
  if (meshesLoaded) {
    sphere.position.set(light.position.x, light.position.y, light.position.z);
    renderer.render(scene, camera);
  }
  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
}

init();
update();
