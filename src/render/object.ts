import { RenderableProps } from "./render";

export type Position = {
  x: number;
  y: number;
  z: number;
};

export type Rotation = {
  x: number;
  y: number;
  z: number;
};

export type Transform = RenderableProps & Position & Rotation;
