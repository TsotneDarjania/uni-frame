import DisplayManager from "./displayManager";

export default class StateManager {
  states = {
    isOpenBuildMenu: false,
    isPreviewMode: false,
  };

  displayManager!: DisplayManager;
  constructor() {
    this.displayManager = new DisplayManager();
  }

  selectedObject!: string;

  changeState({ state, value }: { state: string; value: any }) {
    this.states[state as keyof typeof this.states] = value;

    if (!this.states.isPreviewMode) {
      this.states.isOpenBuildMenu
        ? this.displayManager.showBuildMenu()
        : this.displayManager.hideBuildMenu();
    }

    this.states.isPreviewMode &&
      this.displayManager.showPreviewMode(this.selectedObject);
  }
}
