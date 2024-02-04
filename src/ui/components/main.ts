import buildComponent from "./buildMenu";

const main = `<main>
<p id="pressToKeyText" class="title">Press Shift + A to add something to the page.</p>

<!-- Build Menu -->
${buildComponent}
</main>`;

export default main;
