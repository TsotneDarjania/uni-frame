import { getRandomNumber } from "src/helper/mathFunctions";
import DisplayManager from "./displayManager";

export class PreviewWebsite {
  sceneObjects: HTMLElement[] = [];

  root: any;

  constructor(displayManager: DisplayManager) {
    const root = document.getElementById("app");
    const previewElement = document.createElement("div");
    previewElement.id = "preview";

    root!.appendChild(previewElement);

    this.root = previewElement;
  }

  addNewObject(object: HTMLElement) {
    this.sceneObjects.push(object);

    const newObject = object.cloneNode(true) as HTMLElement;
    newObject.style.left = object.style.left;
    newObject.style.top = object.style.top;
    newObject.style.opacity = "1";
    newObject.id = `button_${getRandomNumber(100, 10000)}`;
    this.root.appendChild(newObject);
  }
}
