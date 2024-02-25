import { EventEnums, TypeEnums } from "src/enums/coreEnums";
import { ElementID } from "./displayManager";

export default class EventListener {
  constructor(public callBack: Function) {
    this.addEventListenerForKeys();
    this.addEventListenerForUIButtons();
    this.addEventListenerForMauseClick();
  }

  addEventListenerForMauseClick() {
    document.addEventListener("click", () => {
      this.callBack({
        type: TypeEnums.userEvent,
        event: EventEnums.mouseClick,
        details: {},
      });
    });
  }

  addEventListenerForKeys() {
    document.addEventListener("keydown", (event) => {
      this.callBack({
        type: TypeEnums.userEvent,
        event: EventEnums.pressKey,
        details: { key: event.key },
      });
    });
  }

  addEventListenerForUIButtons() {
    this.addEventListenerForBuildMenu();
  }

  addEventListenerForBuildMenu() {
    document
      .getElementById(ElementID.atomusOptions)
      ?.childNodes.forEach((element) => {
        element.addEventListener("click", (event) => {
          this.callBack({
            type: TypeEnums.userEvent,
            event: EventEnums.clickButton,
            details: { button: element.textContent },
          });
        });
      });
  }
}
