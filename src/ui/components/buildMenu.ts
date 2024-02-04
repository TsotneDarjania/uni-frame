import { ElementID } from "src/core/displayManager";
import { BildMenuButtonEnums } from "src/enums/coreEnums";

const buildComponent = `
<ul style="visibility: hidden" id="build_menu" class="center-horizontal center-vertical">
<li class="">
  <h3 class="">Atomus</h3>
  <ul id="${ElementID.atomusOptions}">
    <li>${BildMenuButtonEnums.Button}</li>
    <li>${BildMenuButtonEnums.Image}</li>
    <li>${BildMenuButtonEnums.Video}</li>
    <li>${BildMenuButtonEnums.Text}</li>
    <li>${BildMenuButtonEnums.Canvas}</li>
    <li>${BildMenuButtonEnums.Line}</li>
    <li>${BildMenuButtonEnums.Color}</li>
  </ul>
</li>
<li class="">
  <h3 class="">Molecules</h3>
  <ul id="${ElementID.moleculesOptions}">
    <li>Accordion</li>
    <li>Hamburger Button</li>
    <li>DropDown Menu</li>
    <li>Progress</li>
  </ul>
</li>
<li class="">
  <h3 class="">Organoides</h3>
  <ul id="${ElementID.organoidesOptions}">
    <li>Header</li>
    <li>Footer</li>
    <li>Slider</li>
    <li>Animation</li>
  </ul>
</li>
<li class="">
  <h3 class="">Layout</h3>
  <ul id="${ElementID.layoutOptions}" >
    <li>Standart Page</li>
  </ul>
</li>
</ul>
`;

export default buildComponent;
