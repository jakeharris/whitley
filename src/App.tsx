import React, { Component } from "react";
import "./App.css";
import { Cube, Render } from "./render";

class App extends Component {
  mount!: HTMLDivElement;
  renderTools?: Render.ThreeRenderTools;

  componentDidMount() {
    this.renderTools = Render.createThreeRenderTools();

    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild(this.renderTools.renderer.domElement);
    this.renderTools.camera.position.z = 5;

    const cube = Cube.createCube();
    this.renderTools.scene.add(cube);
    this.animate();
  }

  animate = () => {
    requestAnimationFrame(this.animate);

    if (!this.renderTools) return;

    const { renderer, scene, camera } = this.renderTools;

    scene.children.forEach((object) => {
      object.rotation.x += 0.01;
      object.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
  };

  render = () => <div className="App" ref={(ref) => (this.mount = ref!)}></div>;
}

export default App;
