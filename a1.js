/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  Vjan2018
//  Assignment 1 Template
/////////////////////////////////////////////////////////////////////////////////////////

console.log('Assignment 1 (Anmol Singh)');
console.log(2/0);

var foo;

console.log(foo);


//  another print example
myvector = new THREE.Vector3(0,1,2);
console.log('myvector =',myvector);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xadd8e6); // set background colour
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,20);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;
controls.autoRotate = false;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
     window.scrollTo(0,0);
   }

/////////////////////////////////////
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////

light = new THREE.PointLight(0x8833ff);
light.position.set(0,4,2);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

var diffuseMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );
var diffuseMaterial2 = new THREE.MeshLambertMaterial( {color: 0xffffff, side: THREE.DoubleSide } );
var basicMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var basicMaterial1 = new THREE.MeshLambertMaterial( {color: 0x008000} );
var basicMaterial2 = new THREE.MeshLambertMaterial( {color: 0xFFFF00} );
var basicMaterial3 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
///////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////  OBJECTS /////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////
// WORLD COORDINATE FRAME
/////////////////////////////////////

var worldFrame = new THREE.AxisHelper(5) ;
scene.add(worldFrame);


/////////////////////////////////////
// FLOOR with texture
/////////////////////////////////////

floorTexture = new THREE.ImageUtils.loadTexture('images/floor.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 1);
floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
floorGeometry = new THREE.PlaneBufferGeometry(15, 15);
floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = -1.1;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

///////////////////////////////////////////////////////////////////////
//   sphere, representing the light
///////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, basicMaterial3);
sphere.position.set(0,4,2);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

//Twisting stack

boxGeometry1 = new THREE.BoxGeometry( 2, 2, 2 );    // width, height, depth
box1 = new THREE.Mesh( boxGeometry1, diffuseMaterial);
box1.position.set(-7, 0, 3);
scene.add( box1 );

boxGeometry2 = new THREE.BoxGeometry( 2, 2, 2 );    // width, height, depth
box2 = new THREE.Mesh( boxGeometry2, basicMaterial1);
box2.position.set(-7, 2, 3);
box2.rotation.set(0,Math.PI/3,0);
scene.add( box2 );

boxGeometry3 = new THREE.BoxGeometry( 2, 2, 2 );    // width, height, depth
box3 = new THREE.Mesh( boxGeometry3, basicMaterial2);
box3.position.set(-7, 4, 3);
box3.rotation.set(0,Math.PI/6,0);
scene.add( box3 );


///////////////////////////////////////////////////////////////////////
//   box
///////////////////////////////////////////////////////////////////////

boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );    // width, height, depth
box = new THREE.Mesh( boxGeometry, diffuseMaterial );
box.position.set(-4, 0, 0);
scene.add( box );

///////////////////////////////////////////////////////////////////////
//  mcc:  multi-colour cube     [https://stemkoski.github.io/Three.js/HelloWorld.html]
///////////////////////////////////////////////////////////////////////

  // Create an array of materials to be used in a cube, one for each side
var cubeMaterialArray = [];
  // order to add materials: x+,x-,y+,y-,z+,z-
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff3333 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xff8800 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0xffff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x33ff33 } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x3333ff } ) );
cubeMaterialArray.push( new THREE.MeshBasicMaterial( { color: 0x8833ff } ) );
var mccMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );
  // Cube parameters: width (x), height (y), depth (z),
  //        (optional) segments along x, segments along y, segments along z
var mccGeometry = new THREE.BoxGeometry( 1.5, 1.5, 1.5, 1, 1, 1 );
// using THREE.MeshFaceMaterial() in the constructor below
// causes the mesh to use the materials stored in the geometry
mcc = new THREE.Mesh( mccGeometry, mccMaterials );
mcc.position.set(-2,0,0);
scene.add( mcc );

/////////////////////////////////////////////////////////////////////////
// cylinder
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
cylinderGeometry = new THREE.CylinderGeometry( 0.30, 0.30, 0.80, 20, 4 );
cylinder = new THREE.Mesh( cylinderGeometry, diffuseMaterial);
cylinder.position.set(2, 0, 0);
scene.add( cylinder );

/////////////////////////////////////////////////////////////////////////
// cone
/////////////////////////////////////////////////////////////////////////

// parameters:
//    radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight, segmentsAlongHeight
coneGeometry = new THREE.CylinderGeometry( 0.0, 0.30, 0.80, 20, 4 );
cone = new THREE.Mesh( coneGeometry, diffuseMaterial);
cone.position.set(4, 0, 0);
scene.add( cone);

/////////////////////////////////////////////////////////////////////////
// torus
/////////////////////////////////////////////////////////////////////////

// parameters:   radius of torus, diameter of tube, segments around radius, segments around torus
torusGeometry = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus = new THREE.Mesh( torusGeometry, new THREE.MeshLambertMaterial( { color: 0xffff33 } ) );
torus.position.set(6, 0, 0);   // translation
torus.rotation.set(0,0,0);     // rotation about x,y,z axes
scene.add( torus );

torusGeometry1 = new THREE.TorusGeometry( 1.2, 0.4, 10, 20 );
torus1 = new THREE.Mesh( torusGeometry, new THREE.MeshLambertMaterial( { color: 0x8833ff } ));
torus1.position.set(7.5, 0, 0);   // translation
torus1.rotation.set(Math.PI/2,0,0);     // rotation about x,y,z axes
scene.add( torus1 );



/////////////////////////////////////
//  CUSTOM OBJECT
////////////////////////////////////

var geom = new THREE.Geometry();
var v0 = new THREE.Vector3(3,0,0);
var v1 = new THREE.Vector3(1.5,3,-1.5);
var v2 = new THREE.Vector3(3,0,-3);
var v3 = new THREE.Vector3(0,0,-3);
var v4 = new THREE.Vector3(0,0,0);

geom.vertices.push(v0);
geom.vertices.push(v1);
geom.vertices.push(v2);
geom.vertices.push(v3);
geom.vertices.push(v4);

geom.faces.push( new THREE.Face3( 0, 1, 2 ) );
geom.faces.push( new THREE.Face3( 1, 3, 2 ) );
geom.faces.push( new THREE.Face3( 0, 2,3));
geom.faces.push( new THREE.Face3( 1, 4,3));
geom.faces.push( new THREE.Face3( 1, 4,0));
geom.faces.push( new THREE.Face3( 4, 0,3));
geom.computeFaceNormals();

customObject = new THREE.Mesh( geom, diffuseMaterial2 );
customObject.position.set(0, 0, -2);
scene.add(customObject);

/////////////////////////////////////////////////////////////////////////////////////
//  ARMADILLO
/////////////////////////////////////////////////////////////////////////////////////

// MATERIALS
var armadilloMaterial = new THREE.ShaderMaterial();

// LOAD SHADERS
var shaderFiles = [
  'glsl/armadillo.vs.glsl',
  'glsl/armadillo.fs.glsl'
];

new THREE.SourceLoader().load(shaderFiles, function(shaders) {
  armadilloMaterial.vertexShader = shaders['glsl/armadillo.vs.glsl'];
  armadilloMaterial.fragmentShader = shaders['glsl/armadillo.fs.glsl'];
})

var armadillo;

//   NOTE:  Unfortunately, the following loading code does not easily allow for multiple
//          instantiations of the OBJ geometry.

function loadOBJ(file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function() {
    console.log('Failed to load ' + file);
  };

  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.parent = worldFrame;
    armadillo = object;
    scene.add(object);
  }, onProgress, onError);
}

  // now load the actual armadillo
loadOBJ('obj/armadillo.obj', armadilloMaterial, 1, 0,0,0, 0,Math.PI,0);

var audio = document.createElement('audio');
var source = document.createElement('source');
source.src = '/Users/anmolsingh/Desktop/CPSC/CPSC314/a1/sounds/0739.ogg';
audio.appendChild(source);

function playx(){
  setTimeout(function() {
    audio.play();
  }, 500);
}

///////////////////////////////////////////////////////////////////////////////////////
// LISTEN TO KEYBOARD
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  if (keyboard.pressed("W")) {
    console.log('W pressed');
    if(light.position.y < 5.0){
      light.position.y += 0.1;
      playx();
    }
  } else if (keyboard.pressed("S")){
      if(light.position.y > -5.0){
        light.position.y -= 0.1;
        playx();
      }
  }
  if (keyboard.pressed("A")){
    if(light.position.x > -5.0){
    light.position.x -= 0.1;
    playx();
  }
  }
  else if (keyboard.pressed("D")){
    if(light.position.x < 5.0){
    light.position.x += 0.1;
    playx();
  }
  }
  if(keyboard.pressed("T")){
    torus.rotation.x += 0.1;
    torus1.rotation.x += 0.1;
    playx();
  }
  if(keyboard.pressed("C")){
    box1.rotation.y += 0.1;
    box2.rotation.y += 0.1;
    box3.rotation.y += 0.1;
    playx();
  }
  if(keyboard.pressed("space")){
    floor.rotation.z +=0.1;
    playx();
  }
  if(keyboard.pressed("H")){
    armadillo.position.x -= 0.1;
    armadillo.rotation.z -=0.4;
    playx();
  }
  if(keyboard.pressed("K")){
    armadillo.position.x += 0.1;
    armadillo.rotation.z +=0.4;
    playx();
  }
  if(keyboard.pressed("U")){
    armadillo.position.z -= 0.1;
    armadillo.rotation.x -= 0.4;
    playx();
  }
  if(keyboard.pressed("J")){
    armadillo.position.z += 0.1;
    armadillo.rotation.x += 0.4;
    playx();
  }
  if(keyboard.pressed("N")){
    armadillo.rotation.y -= 0.1;
    playx();
  }
  if(keyboard.pressed("M")){
    armadillo.rotation.y += 0.1;
    playx();
  }
  if(keyboard.pressed("G")){
    armadillo.position.x -= 0.1;
    armadillo.rotation.y -= 1;
    playx();
  }
  if(keyboard.pressed("L")){
    armadillo.position.x += 0.1;
    armadillo.rotation.y += 1;
    playx();
  }
  if(keyboard.pressed("P")){
    armadillo.position.y += 0.1;
    playx();
  }
  if(keyboard.pressed("V")){
    armadillo.position.y -= 0.1;
    playx();
  }
  if(keyboard.pressed("R")){
    armadillo.position.y = 0;
    armadillo.position.x = 0;
    armadillo.position.z = 0;
    playx();
  }
  sphere.position.set(light.position.x, light.position.y, light.position.z);
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}

update();
