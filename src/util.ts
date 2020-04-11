import { Object3D, Mesh } from "three";

export function isMesh(obj: Object3D): obj is Mesh {
  return obj.type === "Mesh";
}
