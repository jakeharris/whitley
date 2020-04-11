import * as Three from "three";

export type RenderableProps = {
  scene: Three.Scene;
  camera: Three.Camera;
};

export interface ThreeRenderTools {
  scene: Three.Scene;
  camera: Three.Camera;
  renderer: Three.Renderer;
}

export function createThreeRenderTools(): ThreeRenderTools {
  const scene = new Three.Scene();
  scene.background = new Three.Color(0xdeeeff);

  // @todo: parameterize
  const camera = new Three.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 10);

  const renderer = new Three.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  return { scene, camera, renderer };
}
