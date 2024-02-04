"use strict";
(() => {
  // src/ui/buttons/default.ts
  var defaultButton = `<button id="${"default_button" /* defaultButton */}" class="defaultButton">Button</button>`;

  // src/ui/components/buildMenu.ts
  var buildComponent = `
<ul style="visibility: hidden" id="build_menu" class="center-horizontal center-vertical">
<li class="">
  <h3 class="">Atomus</h3>
  <ul id="${"atomus_options" /* atomusOptions */}">
    <li>${"Button" /* Button */}</li>
    <li>${"Image" /* Image */}</li>
    <li>${"Video" /* Video */}</li>
    <li>${"Text" /* Text */}</li>
    <li>${"Canvas" /* Canvas */}</li>
    <li>${"Line" /* Line */}</li>
    <li>${"Color" /* Color */}</li>
  </ul>
</li>
<li class="">
  <h3 class="">Molecules</h3>
  <ul id="${"molecules_options" /* moleculesOptions */}">
    <li>Accordion</li>
    <li>Hamburger Button</li>
    <li>DropDown Menu</li>
    <li>Progress</li>
  </ul>
</li>
<li class="">
  <h3 class="">Organoides</h3>
  <ul id="${"organoides_options" /* organoidesOptions */}">
    <li>Header</li>
    <li>Footer</li>
    <li>Slider</li>
    <li>Animation</li>
  </ul>
</li>
<li class="">
  <h3 class="">Layout</h3>
  <ul id="${"layout_options" /* layoutOptions */}" >
    <li>Standart Page</li>
  </ul>
</li>
</ul>
`;
  var buildMenu_default = buildComponent;

  // src/ui/components/main.ts
  var main = `<main>
<p id="pressToKeyText" class="title">Press Shift + A to add something to the page.</p>

<!-- Build Menu -->
${buildMenu_default}
</main>`;
  var main_default = main;

  // src/core/displayManager.ts
  var DisplayManager = class {
    root;
    updatePorcess;
    constructor() {
      this.root = document.getElementById("app");
      this.renderPage();
    }
    showBuildMenu() {
      this.hideElement("pressToKeyText" /* pressToKeyText */);
      this.showElement("build_menu" /* buildComponent */);
    }
    hideBuildMenu() {
      this.hideElement("build_menu" /* buildComponent */);
    }
    renderPage() {
      this.root.insertAdjacentHTML("beforeend", main_default);
    }
    showPreviewMode(sceneObjectName) {
      this.showPreviewObject(sceneObjectName);
    }
    showPreviewObject(sceneObjectName) {
      this.root.insertAdjacentHTML("beforeend", defaultButton);
      const sceneObject = document.getElementById("default_button" /* defaultButton */);
      document.addEventListener("mousemove", (event) => {
        sceneObject.style.left = `${event.clientX}px`;
        sceneObject.style.top = `${event.clientY}px`;
      });
    }
    showElement(id) {
      document.getElementById(id).style.display = "";
      document.getElementById(id).style.visibility = "visible";
    }
    hideElement(id) {
      document.getElementById(id).style.display = "none";
      document.getElementById(id).style.visibility = "hidden";
    }
  };

  // src/core/eventListener.ts
  var EventListener = class {
    constructor(callBack) {
      this.callBack = callBack;
      this.addEventListenerForKeys();
      this.addEventListenerForUIButtons();
      this.addEventListenerForMauseClick();
    }
    addEventListenerForMauseClick() {
      document.addEventListener("click", () => {
        this.callBack({
          type: "userEvent" /* userEvent */,
          event: "mouseClick" /* mouseClick */,
          details: {}
        });
      });
    }
    addEventListenerForKeys() {
      document.addEventListener("keydown", (event) => {
        console.log(event.key, "event.key");
        this.callBack({
          type: "userEvent" /* userEvent */,
          event: "pressKey" /* pressKey */,
          details: { key: event.key }
        });
      });
    }
    addEventListenerForUIButtons() {
      this.addEventListenerForBuildMenu();
    }
    addEventListenerForBuildMenu() {
      document.getElementById("atomus_options" /* atomusOptions */)?.childNodes.forEach((element) => {
        element.addEventListener("click", (event) => {
          this.callBack({
            type: "userEvent" /* userEvent */,
            event: "clickButton" /* clickButton */,
            details: { button: element.textContent }
          });
        });
      });
    }
  };

  // src/core/stateManager.ts
  var StateManager = class {
    states = {
      isOpenBuildMenu: false,
      isPreviewMode: false
    };
    displayManager;
    constructor() {
      this.displayManager = new DisplayManager();
    }
    selectedObject;
    changeState({ state, value }) {
      this.states[state] = value;
      if (!this.states.isPreviewMode) {
        this.states.isOpenBuildMenu ? this.displayManager.showBuildMenu() : this.displayManager.hideBuildMenu();
      }
      this.states.isPreviewMode && this.displayManager.showPreviewMode(this.selectedObject);
    }
  };

  // src/core/mainManager.ts
  var MainManager = class {
    eventListener;
    stateManager;
    constructor() {
      this.init();
      this.eventListener;
    }
    setCommand(command) {
      const instructions = {
        userEvent: {
          mouseClick: () => {
            this.stateManager.states.isPreviewMode && this.stateManager.selectedObject !== void 0 && this.buildSceneObject();
          },
          pressKey: ({ key }) => {
            if (key === "A") {
              this.stateManager.changeState({
                state: "isOpenBuildMenu" /* isOpenBuildMenu */,
                value: !this.stateManager.states.isOpenBuildMenu
              });
            }
          },
          clickButton: ({ button }) => {
            if (button === "Button" /* Button */ || button === "Image" /* Image */ || button === "Video" /* Video */ || button === "Text" /* Text */ || button === "Canvas" /* Canvas */ || button === "Line" /* Line */ || button === "Color" /* Color */) {
              this.stateManager.changeState({
                state: "isOpenBuildMenu" /* isOpenBuildMenu */,
                value: false
              });
              this.stateManager.changeState({
                state: "isPreviewMode" /* isPreviewMode */,
                value: true
              });
              this.stateManager.selectedObject = button;
            }
          }
        }
      };
      instructions[command.type][command.event](command.details);
    }
    init() {
      this.stateManager = new StateManager();
      this.eventListener = new EventListener(this.setCommand.bind(this));
    }
    buildSceneObject() {
      alert("buildSceneObject");
    }
  };

  // src/main.ts
  var mainManager = new MainManager();
  console.log("aaa");
})();
