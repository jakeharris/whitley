import * as Three from "three";

export function createPointLight(renderer: Three.Renderer) {
  const bulbGeometry = new Three.SphereBufferGeometry(0.22, 16, 8);
  const bulbLight = new Three.PointLight(0xffee88, 3, 100, 7);

  const bulbMat = new Three.MeshStandardMaterial({
    emissive: 0xffffee,
    emissiveIntensity: 1,
    color: 0xeeeeee,
  });
  bulbLight.add(new Three.Mesh(bulbGeometry, bulbMat));
  bulbLight.position.set(0, 3, 3);
  bulbLight.castShadow = true;

  return bulbLight;
}

export function createHemisphereLight(renderer: Three.Renderer) {
  const hemiLight = new Three.HemisphereLight(0xddeeff, 0x0f0e0d, 0.82);
  return hemiLight;
}
