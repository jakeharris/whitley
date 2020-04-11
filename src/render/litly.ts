import * as Three from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const litlyModelPath = "litlyboard.obj";

export function createLitly(handleCreation: (obj: Three.Group) => void) {
  const loader = new OBJLoader();

  loader.load(
    litlyModelPath,
    handleCreation,
    (progress) =>
      console.log(`${(progress.loaded / progress.total) * 100}% loaded`),
    (error) => console.error(error)
  );
}
