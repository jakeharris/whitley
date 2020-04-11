import * as Three from "three";

export type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type CubeProps = {
  dimensions: Dimensions;
  material: Three.Material;
};

const defaultDimensions = { width: 1, height: 1, depth: 1 };
const defaultMaterial = new Three.MeshStandardMaterial({
  color: 0xddeeff,
  roughness: 0.8,
  metalness: 0.5,
  bumpScale: 0.0005,
});

export function createCube(props?: Partial<CubeProps>): Three.Mesh {
  const dimensions = {
    ...defaultDimensions,
    ...props?.dimensions,
  };
  const geometry = new Three.BoxGeometry(
    dimensions.width,
    dimensions.height,
    dimensions.depth
  );

  const material = props && props.material ? props.material : defaultMaterial;

  return new Three.Mesh(geometry, material);
}
