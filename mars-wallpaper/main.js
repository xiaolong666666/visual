import * as Three from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Tween from "@tweenjs/tween.js";

const RADIUS = 300;

const Options = {
  RADIUS,
  SEGMENTS: 100,
  CAMERA_FAR: 300 * 1000,
  CAMERA_FOV: 45,
  CAMERA_NEAR: 1,
  sunLightPosition: new Three.Vector3(RADIUS * 2, RADIUS * 3, RADIUS * 3),
  sunLightAutoRotateSpeed: Math.PI / 360 / 24,
  MODES: {
    mod1: {
      globeRotateSpeed: Math.PI / 360 / 6,
      cameraPosition: {
        x: RADIUS * 6,
        y: 0,
        z: 0,
      },
      cameraLookAt: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
    mod2: {
      globeRotateSpeed: Math.PI / 360 / 24,
      cameraPosition: {
        x: RADIUS * 2.5,
        y: RADIUS / 8,
        z: RADIUS / 2,
      },
      cameraLookAt: {
        x: (RADIUS * 2.5) / 2,
        y: RADIUS / 8,
        z: RADIUS / 2,
      },
    },
    mod3: {
      globeRotateSpeed: Math.PI / 360 / 36,
      cameraPosition: {
        x: RADIUS * 2,
        y: RADIUS / 8,
        z: RADIUS / 2,
      },
      cameraLookAt: {
        x: 0,
        y: 0,
        z: 0,
      },
    },
  },
};

// GLB模型的URL
// const modelUrl = "/public/assets/mars1.glb";

let mode = "mod1";

// 创建场景
const scene = new Three.Scene();

// 创建相机
const camera = new Three.PerspectiveCamera();

// 创建渲染器
const renderer = new Three.WebGLRenderer({
  canvas: document.getElementById("mars"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// 建立白光光源
const sunLight = new Three.DirectionalLight(0xffffff, 2.5);
const sunOrbit = new Three.Group();
sunOrbit.add(sunLight);
scene.add(sunOrbit);

// 创建球体
const geometry = new Three.SphereGeometry(RADIUS, 100, 100);
// 创建材料，并添加火星纹理
const textureLoader = new Three.TextureLoader();
const marsTexture = textureLoader.load("./public/assets/Mars8K_web_low.jpg");
const material = new Three.MeshLambertMaterial({ map: marsTexture });
// 创建球体网络
const sphere = new Three.Mesh(geometry, material);
sphere.position.set(0, 0, 0);
sphere.receiveShadow = true;
scene.add(sphere);

// 加载模型
// const loader = new GLTFLoader();
// loader.load(
//   modelUrl,
//   (gltf) => {
//     const model = gltf.scene;
//     console.log("model", model);
//     model.scale.set(1, 1, 1);
//     model.position.set(RADIUS, RADIUS, RADIUS);
//     // model.rotation.set(0, Math.PI / 2, 0);
//     scene.add(model);
//   },
//   undefined,
//   (error) => {
//     console.error(error);
//   }
// );

function setCamera() {
  // 设置默认值
  const _mode = Options.MODES[mode];
  const cameraPos = { ..._mode.cameraPosition };
  const cameraLookAt = { ..._mode.cameraLookAt };
  camera.position.set(cameraPos.x, cameraPos.y, cameraPos.z);
  camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);
  camera.far = Options.CAMERA_FAR;
  camera.fov = Options.CAMERA_FOV;
  camera.near = Options.CAMERA_near;
}

function setSunLight() {
  // 相对轨道的位置
  sunLight.position.copy(Options.sunLightPosition);
  // 设置光源目标
  sunLight.target = sphere;
}

// 设置相机位置
setCamera();
setSunLight();

function render() {
  const _mode = Options.MODES[mode];
  // 旋转
  sphere.rotateY(_mode.globeRotateSpeed);
  sunOrbit.rotateX(Options.sunLightAutoRotateSpeed);
  renderer.sortObjects = false;
  // 渲染场景
  renderer.render(scene, camera);
}

// 渲染循环
function animate(time) {
  requestAnimationFrame(animate);
  render();
  Tween.update(time);
}

animate();

function changeMode() {
  const duration = 1200;
  const modeBefore = Options.MODES[mode];
  mode = mode === "mod1" ? "mod2" : mode === "mod2" ? "mod3" : "mod1";
  console.log("mode", mode);
  const modeNow = Options.MODES[mode];
  const cameraPosAtTween = new Tween.Tween({ ...modeBefore.cameraPosition });
  const cameraLookAtTween = new Tween.Tween({ ...modeBefore.cameraLookAt });

  cameraPosAtTween.easing(Tween.Easing.Cubic.InOut).onUpdate((o) => {
    camera.position.set(o.x, o.y, o.z);
  });

  cameraLookAtTween.easing(Tween.Easing.Cubic.InOut).onUpdate((o) => {
    camera.lookAt(o.x, o.y, o.z);
  });

  cameraPosAtTween.to({ ...modeNow.cameraPosition }, duration).start();
  cameraLookAtTween.to({ ...modeNow.cameraLookAt }, duration).start();
}

document.addEventListener("click", changeMode, false);
