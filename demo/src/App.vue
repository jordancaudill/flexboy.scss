<style lang="scss">
$flexboy: (
  md: 1280px,
  lg: 1600px
);
$flexboyContainers: (
  default: 600px,
  md: 900px,
  lg: 1200px
);
@import "../lib/_flex.scss";
#app {
  //   @extend .row;
}
#controls {
  @extend .row, .wrap, .j-around;

  .control-type {
    padding: 10px;
	width: 200px;
	border: solid 2px gray;
    .control {
      //   height: 40px;
	  //   @extend .row, .j-end, .a-center;
	  &.even {
		  background: lightblue;
	  }
      .size {
		  height: 30px;
        font-family: Helvetica, sans-serif;
        color: gray;
        &:first-child {
          font-size: 20px;
          color: black;
          input[type="checkbox"] {
            width: 20px;
            height: 20px;
          }
        }
        label {
          user-select: none;
        }
      }
    }
  }
}
#parent {
  width: 100%;
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
    <div>
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
      <section id="controls">
        <div class="control-type" :key="type" v-for="type in types">
          <div class="control" :class="{even: idx % 2 === 0}" :key="control" v-for="(control, idx) in classes[type]">
            <div class="size" :key="size.size" v-for="size in sizes">
              <label v-if="!size.name" :for="control">.{{control}}</label>
              <label v-if="size.name" :for="control">.{{control}}-{{size.name}}</label>
              <input type="checkbox" :name="control">
            </div>
          </div>
        </div>
      </section>
      <button @click="children > 1? children-- : null;">Remove child</button>
      <button @click="children < 10? children++ : null;">Add child</button>
    </div>
    <section id="parent">
      <div class="child" :key="child" v-for="child in children">{{child}}</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data: function() {
    return {
      sizes: [
        { name: "", size: 0 },
        { name: "md", size: 1280 },
        { name: "lg", size: 1600 }
      ],
      children: 5,
      classes: {
        direction: ["row", "col", "row-reverse", "col-reverse"],
        justify: ["j-start", "j-end", "j-center", "j-between", "j-around"],
        align: ["a-start", "a-end", "a-center", "a-baseline", "a-stretch"],
        container: ["container", "fluid"],
        wrap: ["wrap", "wrap-reverse", "nowrap"],
        hide: ["hide"],
        only: ["only"]
      },
      types: [
        "direction",
        "justify",
        "align",
        "container",
        "wrap",
        "hide",
        "only"
      ]
    };
  },
  methods: {
    changeCSS: function() {
      let oldStyles = document.getElementById("generated-styles");
      if (oldStyles) {
        oldStyles.remove();
      }
    //   let extend = "";
    //   types.forEach(function(type) {
    //     classes[type].forEach(function(className) {
    //       if (document.getElementById(className).checked) {
    //         extend += "." + className + ",";
    //       }
    //     });
    //   });
      let fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("id", "generated-styles");
      fileref.setAttribute(
        "href",
        "https://localhost:8081/style.css?extend=" + extend
      );
      document.getElementsByTagName("head")[0].appendChild(fileref);
    }
  },
  mounted: function() {
    changeCSS();
  }
};
</script>

