import DisplayManager from "./displayManager";
import MainManager from "./mainManager";

export default class StateManager {
  states = {
    isOpenBuildMenu: false,
    isPreviewMode: false,
  };

  constructor(public mainManager: MainManager) {}

  selectedObject!: string;

  changeState({ state, value }: { state: string; value: any }) {
    this.states[state as keyof typeof this.states] = value;

    this.states.isPreviewMode
      ? this.mainManager.displayManager.showPreviewMode(this.selectedObject)
      : this.mainManager.displayManager.hidePreviewMode();

    this.states.isOpenBuildMenu
      ? this.mainManager.displayManager.showBuildMenu()
      : this.mainManager.displayManager.hideBuildMenu();
  }
}
