import * as Three from "three";
import { ThreeRenderTools } from "./render";
import { Vector2 } from "three";

export function configureClicks(tools: ThreeRenderTools) {
  function onMouseMove(event: MouseEvent) {
    const mousePosition = mouseToWorldCoordinates(event, tools.renderer);

    const raycaster = new Three.Raycaster();
    raycaster.setFromCamera(mousePosition, tools.camera);

    const litlyBoard = tools.scene.children.find(
      (child) => child.name === "litlyBoard"
    );

    if (!litlyBoard) return;

    const intersections = raycaster.intersectObjects(litlyBoard.children);
    if (intersections.length > 0) {
      for (const intersection of intersections) {
        // @todo: make this show a glow over the LED
        // intersection.object.visible = !intersection.object.visible;
      }
    }
  }

  document.addEventListener("mousemove", onMouseMove, false);
}

const mouseToWorldCoordinates = (
  event: MouseEvent,
  renderer: Three.Renderer
): Vector2 =>
  new Vector2(
    2 * (event.clientX / renderer.domElement.clientWidth) - 1,
    1 - (event.clientY / renderer.domElement.clientHeight) * 2
  );
