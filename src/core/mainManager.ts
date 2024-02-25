import { CommandType } from "src/types/coreTypes";
import DisplayManager from "./displayManager";
import EventListener from "./eventListener";
import StateManager from "./stateManager";
import { BildMenuButtonEnums, StateEnums } from "src/enums/coreEnums";
import { PreviewWebsite } from "./previewWebsite";

export default class MainManager {
  eventListener!: EventListener;
  stateManager!: StateManager;
  displayManager!: DisplayManager;
  previwWebsite!: PreviewWebsite;

  constructor() {
    this.init();
  }

  setCommand(command: CommandType) {
    const instructions = {
      userEvent: {
        mouseClick: () => {
          if (this.stateManager.states.isPreviewMode) {
            this.buildSceneObject();
            this.stateManager.changeState({
              state: StateEnums.isPreviewMode,
              value: false,
            });
          }
        },
        pressKey: ({ key }: { key: string }) => {
          if (key === "A") {
            !this.stateManager.states.isPreviewMode &&
              this.stateManager.changeState({
                state: StateEnums.isOpenBuildMenu,
                value: !this.stateManager.states.isOpenBuildMenu,
              });
          }
          if (key === "Q") {
            this.stateManager.states.isPreviewMode &&
              this.stateManager.changeState({
                state: StateEnums.isPreviewMode,
                value: false,
              });

            this.stateManager.states.isOpenBuildMenu &&
              this.stateManager.changeState({
                state: StateEnums.isOpenBuildMenu,
                value: false,
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
            /*
            setTimeOut is used to prevent the 
            button from being selected before the
             build menu is closed
            */
            setTimeout(() => {
              this.stateManager.changeState({
                state: StateEnums.isPreviewMode,
                value: true,
              });
            }, 100);

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
    this.stateManager = new StateManager(this);
    this.displayManager = new DisplayManager();
    this.eventListener = new EventListener(this.setCommand.bind(this));
    this.previwWebsite = new PreviewWebsite(this.displayManager);
  }

  buildSceneObject() {
    this.previwWebsite.addNewObject(this.displayManager.sceneObject);
  }
}
