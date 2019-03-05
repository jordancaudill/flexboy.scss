<style lang="scss">
$flexboy: (md: 1280px, lg: 1600px);
// $containerWidths: (600, 900, 1200);
@import "../lib/_flex.scss";
#controls {
//   display: flex;
//   flex-direction: row;
  // align-items: center;
  @extend %row-md;
  // @include desktop(('.row'));
  .type-section {
    // background: rgba(0, 0, 255, 0.2);\
    padding: 10px;
    .control {
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      label {
        // display: block;
        user-select: none;
        font-family: Helvetica, sans-serif;
      }
      input[type="checkbox"] {
        width: 20px;
        height: 20px;
      }
    }
  }
}
#parent {
  background: rgba(255, 0, 0, 0.1);
  margin-top: 30px;
}
.child {
  $max: 11;
  $deg: 360 / $max;
  @for $i from 1 to $max {
    &:nth-child(#{$i}) {
      $hue: adjust_hue(turquoise, $i * $deg);
      background: linear-gradient(45deg, $hue, adjust_hue($hue, 30%));
      border: solid 4px $hue;
      width: 100px + ($i * 15);
      height: 100px - ($i * 7);
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-family: Helvetica, sans-serif;
  color: white;
  font-weight: 900;
}

body {
  margin: 0;
}
</style>

<template>
  <div id="app">
    <section id="breakpoints">
      <form id="new-breakpoint" onsubmit="addBreakpoint()">
        <label>New Breakpoint</label>
        <input placeholder="Breakpoint name (ex: md)" type="text" id="new-breakpoint-name">
        <input
          placeholder="Breakpoint width (ex: 1280)"
          type="number"
          min="1"
          id="new-breakpoint-size"
        >
        <button type="submit">Add</button>
      </form>
    </section>
    <section id="controls"></section>
    <button onclick="deleteChild()">Remove child</button>
    <button onclick="addChild()">Add child</button>
    <section id="parent"></section>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted: function() {
    const parent = document.getElementById("parent");
    const types = [
      "direction",
      "justify",
      "align",
      "container",
      "wrap",
      "hide",
      "show",
      "flex",
      "only"
    ];
    const classes = {
      direction: ["row", "col", "row-reverse", "col-reverse"],
      justify: ["j-start", "j-end", "j-center", "j-between", "j-around"],
      align: ["a-start", "a-end", "a-center", "a-baseline", "a-stretch"],
      container: ["container", "fluid"],
      wrap: ["wrap", "wrap-reverse", "nowrap"],
      hide: ["hide", "hide-at"],
      show: ["show", "show-at"],
      flex: ["flex", "flex-at"],
      only: ["only"]
    };
    let breakpoints = {};

    function addChild() {
      if (parent.children.length < 10) {
        let child = document.createElement("div");
        let t = document.createTextNode(parent.children.length + 1);
        child.appendChild(t);
        child.className += "child";
        parent.appendChild(child);
      }
    }
    function deleteChild() {
      if (parent.lastChild) {
        parent.removeChild(parent.lastChild);
      }
    }
    function setupControls() {
      let controls = document.getElementById("controls");
      types.forEach(function(type) {
        let typeSection = document.createElement("div");
        typeSection.setAttribute("class", "type-section");
        controls.appendChild(typeSection);

        classes[type].forEach(function(className) {
          let control = document.createElement("div");
          control.setAttribute("class", "control");
          let label = document.createElement("label");
          label.setAttribute("for", className);
          label.textContent = "." + className;
          control.appendChild(label);
          let input = document.createElement("input");
          input.addEventListener("change", changeCSS);
          input.setAttribute("name", className);
          input.setAttribute("id", className);
          input.setAttribute("type", "checkbox");
          control.appendChild(input);
          typeSection.appendChild(control);
        });
      });
    }
    function setupBreakpoints() {
      let breakpointsSection = document.getElementById("breakpoints");
    }

    function addBreakpoint() {}

    function changeCSS() {
      let oldStyles = document.getElementById("generated-styles");
      if (oldStyles) {
        oldStyles.remove();
      }
      let extend = "";
      types.forEach(function(type) {
        classes[type].forEach(function(className) {
          if (document.getElementById(className).checked) {
            extend += "." + className + ",";
          }
        });
      });
      let fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("id", "generated-styles");
      fileref.setAttribute(
        "href",
        "https://localhost:8081/style.css?extend=" + extend
      );
      document.getElementsByTagName("head")[0].appendChild(fileref);
    }
    for (let i = 0; i < 5; i++) {
      addChild();
    }
    setupControls();
    changeCSS();
  }
};
</script>

