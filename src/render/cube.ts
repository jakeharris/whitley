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
const defaultMaterial = new Three.MeshBasicMaterial({ color: 0x00ff00 });

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
