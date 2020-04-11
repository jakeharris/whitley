import React, { Component } from "react";
import * as Three from "three";
import "./App.css";
import { Render, Litly, Cube, Light } from "./render";
import { configureClicks } from "./render/click";
import { ThreeRenderTools } from "./render/render";
import { isMesh } from "./util";
import { DirectionalLight } from "three";

class App extends Component {
  mount!: HTMLDivElement;
  renderTools?: Render.ThreeRenderTools;

  componentDidMount() {
    this.renderTools = Render.createThreeRenderTools();
    configureClicks(this.renderTools);

    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(this.renderTools.renderer.domElement);

    this.buildScene(this.renderTools);

    this.animate();
  }

  buildScene({ scene, renderer }: ThreeRenderTools) {
    Litly.createLitly(this.handleLitlyLoad);

    // const pointLight = Light.createPointLight(renderer);
    // pointLight.position.set(-8, -1, 3);

    const directionalLight = new DirectionalLight(0xffffff);
    directionalLight.position.set(-1, 0.5, 0).normalize();

    const hemiLight = Light.createHemisphereLight(renderer);

    const cube = Cube.createCube({
      dimensions: { height: 1, width: 100, depth: 100 },
    });
    cube.position.set(0, -3, 0);

    scene.add(cube, hemiLight, directionalLight);
  }

  handleLitlyLoad = (obj: Three.Group) => {
    obj.scale.set(0.05, 0.05, 0.05);
    obj.rotation.set(0, -1, 0);
    obj.position.set(-1, -2.5, 0);
    obj.name = "litlyBoard";

    const setMaterialAndShadow = (o: Three.Object3D) => {
      if (isMesh(o)) {
        o.material = new Three.MeshStandardMaterial({
          color: 0xdcdcdc,
          roughness: 0.2,
          metalness: 0.1,
          bumpScale: 0.05,
        });
      }
    };

    obj.traverse(setMaterialAndShadow);

    this.renderTools?.scene.add(obj);
    this.renderTools?.camera.lookAt(obj.position);
    this.renderTools?.scene.traverse((o) => {
      if (o.type === "HemisphereLight") return;
      o.castShadow = true;
      o.receiveShadow = true;
    });
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    if (!this.renderTools) return;

    const { renderer, scene, camera } = this.renderTools;

    renderer.render(scene, camera);
  };

  render = () => <div className="App" ref={(ref) => (this.mount = ref!)}></div>;
}

export default App;
