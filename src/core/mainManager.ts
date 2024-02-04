import { CommandType } from "src/types/coreTypes";
import DisplayManager from "./displayManager";
import EventListener from "./eventListener";
import StateManager from "./stateManager";
import { BildMenuButtonEnums, StateEnums } from "src/enums/coreEnums";

export default class MainManager {
  eventListener!: EventListener;
  stateManager!: StateManager;

  constructor() {
    this.init();

    this.eventListener;
  }

  setCommand(command: CommandType) {
    const instructions = {
      userEvent: {
        mouseClick: () => {
          this.stateManager.states.isPreviewMode &&
            this.stateManager.selectedObject !== undefined &&
            this.buildSceneObject();
        },
        pressKey: ({ key }: { key: string }) => {
          if (key === "A") {
            this.stateManager.changeState({
              state: StateEnums.isOpenBuildMenu,
              value: !this.stateManager.states.isOpenBuildMenu,
            });
          }
        },

        clickButton: ({ button }: { button: string }) => {
          if (
            button === BildMenuButtonEnums.Button ||
            button === BildMenuButtonEnums.Image ||
            button === BildMenuButtonEnums.Video ||
            button === BildMenuButtonEnums.Text ||
            button === BildMenuButtonEnums.Canvas ||
            button === BildMenuButtonEnums.Line ||
            button === BildMenuButtonEnums.Color
          ) {
            this.stateManager.changeState({
              state: StateEnums.isOpenBuildMenu,
              value: false,
            });
            this.stateManager.changeState({
              state: StateEnums.isPreviewMode,
              value: true,
            });
            this.stateManager.selectedObject = button;
          }
        },
      },
    };

    instructions[command.type as keyof typeof instructions][
      command.event as keyof typeof instructions.userEvent
    ](command.details);
  }

  init() {
    this.stateManager = new StateManager();
    this.eventListener = new EventListener(this.setCommand.bind(this));
  }

  buildSceneObject() {
    alert("buildSceneObject");
  }
}
