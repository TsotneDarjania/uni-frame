"use strict";
(() => {
  // src/ui/buttons/default.ts
  var defaultButton = `<button id="${"default_button" /* defaultButton */}" class="defaultButton">Button</button>`;

  // src/ui/components/buildMenu.ts
  var buildComponent = `
<ul style="visibility: hidden; z-index:10;" id="build_menu" class="center-horizontal center-vertical">
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
    sceneObject;
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
    hidePreviewMode() {
      this.sceneObject?.remove();
    }
    showPreviewObject(sceneObjectName) {
      this.root.insertAdjacentHTML("beforeend", defaultButton);
      this.sceneObject = document.getElementById("default_button" /* defaultButton */);
      document.addEventListener("mousemove", (event) => {
        this.sceneObject.style.left = `${event.clientX}px`;
        this.sceneObject.style.top = `${event.clientY}px`;
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
    constructor(mainManager2) {
      this.mainManager = mainManager2;
    }
    states = {
      isOpenBuildMenu: false,
      isPreviewMode: false
    };
    selectedObject;
    changeState({ state, value }) {
      this.states[state] = value;
      this.states.isPreviewMode ? this.mainManager.displayManager.showPreviewMode(this.selectedObject) : this.mainManager.displayManager.hidePreviewMode();
      this.states.isOpenBuildMenu ? this.mainManager.displayManager.showBuildMenu() : this.mainManager.displayManager.hideBuildMenu();
    }
  };

  // src/helper/mathFunctions.ts
  function getRandomNumber(from, to) {
    if (from > to) {
      throw new Error(
        "Invalid input parameters. The `from` parameter must be less than or equal to the `to` parameter."
      );
    }
    const randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
    return randomNumber;
  }

  // src/core/previewWebsite.ts
  var PreviewWebsite = class {
    sceneObjects = [];
    root;
    constructor(displayManager) {
      const root = document.getElementById("app");
      const previewElement = document.createElement("div");
      previewElement.id = "preview";
      root.appendChild(previewElement);
      this.root = previewElement;
    }
    addNewObject(object) {
      this.sceneObjects.push(object);
      const newObject = object.cloneNode(true);
      newObject.style.left = object.style.left;
      newObject.style.top = object.style.top;
      newObject.style.opacity = "1";
      newObject.id = `button_${getRandomNumber(100, 1e4)}`;
      this.root.appendChild(newObject);
    }
  };

  // src/core/mainManager.ts
  var MainManager = class {
    eventListener;
    stateManager;
    displayManager;
    previwWebsite;
    constructor() {
      this.init();
    }
    setCommand(command) {
      const instructions = {
        userEvent: {
          mouseClick: () => {
            if (this.stateManager.states.isPreviewMode) {
              this.buildSceneObject();
              this.stateManager.changeState({
                state: "isPreviewMode" /* isPreviewMode */,
                value: false
              });
            }
          },
          pressKey: ({ key }) => {
            if (key === "A") {
              !this.stateManager.states.isPreviewMode && this.stateManager.changeState({
                state: "isOpenBuildMenu" /* isOpenBuildMenu */,
                value: !this.stateManager.states.isOpenBuildMenu
              });
            }
            if (key === "Q") {
              this.stateManager.states.isPreviewMode && this.stateManager.changeState({
                state: "isPreviewMode" /* isPreviewMode */,
                value: false
              });
              this.stateManager.states.isOpenBuildMenu && this.stateManager.changeState({
                state: "isOpenBuildMenu" /* isOpenBuildMenu */,
                value: false
              });
            }
          },
          clickButton: ({ button }) => {
            if (button === "Button" /* Button */ || button === "Image" /* Image */ || button === "Video" /* Video */ || button === "Text" /* Text */ || button === "Canvas" /* Canvas */ || button === "Line" /* Line */ || button === "Color" /* Color */) {
              this.stateManager.changeState({
                state: "isOpenBuildMenu" /* isOpenBuildMenu */,
                value: false
              });
              setTimeout(() => {
                this.stateManager.changeState({
                  state: "isPreviewMode" /* isPreviewMode */,
                  value: true
                });
              }, 100);
              this.stateManager.selectedObject = button;
            }
          }
        }
      };
      instructions[command.type][command.event](command.details);
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
  };

  // src/main.ts
  var mainManager = new MainManager();
})();
