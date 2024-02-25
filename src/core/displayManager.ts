import { defaultButton } from "src/ui/buttons/default";
import main from "src/ui/components/main";

export enum ElementID {
  buildComponent = "build_menu",
  pressToKeyText = "pressToKeyText",
  atomusOptions = "atomus_options",
  moleculesOptions = "molecules_options",
  organoidesOptions = "organoides_options",
  layoutOptions = "layout_options",
  defaultButton = "default_button",
}

export default class DisplayManager {
  root: any;
  sceneObject!: HTMLElement;

  constructor() {
    this.root = document.getElementById("app");
    this.renderPage();
  }

  showBuildMenu() {
    this.hideElement(ElementID.pressToKeyText);
    this.showElement(ElementID.buildComponent);
  }

  hideBuildMenu() {
    this.hideElement(ElementID.buildComponent);
  }

  renderPage() {
    this.root.insertAdjacentHTML("beforeend", main);
  }

  showPreviewMode(sceneObjectName: string) {
    this.showPreviewObject(sceneObjectName);
  }

  hidePreviewMode() {
    this.sceneObject?.remove();
  }

  private showPreviewObject(sceneObjectName: string) {
    this.root.insertAdjacentHTML("beforeend", defaultButton);

    this.sceneObject = document.getElementById(ElementID.defaultButton)!;
    document.addEventListener("mousemove", (event) => {
      this.sceneObject.style.left = `${event.clientX}px`;
      this.sceneObject.style.top = `${event.clientY}px`;
    });
  }

  private showElement(id: string) {
    document.getElementById(id)!.style.display = "";
    document.getElementById(id)!.style.visibility = "visible";
  }

  private hideElement(id: string) {
    document.getElementById(id)!.style.display = "none";
    document.getElementById(id)!.style.visibility = "hidden";
  }
}
