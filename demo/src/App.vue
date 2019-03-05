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
@import "../flexboy.scss";
#breakpoints {
	@extend .row;
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
  height: 800px;
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
h4, h6 {
	line-height: 0px;
	margin-left: 20px;
}
body {
  margin: 0;
}
</style>

<template>
  <div id="app">
    <div>
      <section id="breakpoints">
		  <div>
			<h4>breakpoints</h4>
			<h6>md: 1280px</h6>
			<h6>lg: 1600px</h6>
		  </div>
		  <div>
			<h4>containers</h4>
			<h6>default: 600px</h6>
			<h6>md: 900px</h6>
			<h6>lg: 1200px</h6>
		  </div>
      </section>
      <section id="controls">
        <div class="control-type" :key="type" v-for="type in types">
          <div
            class="control"
            :class="{even: idx % 2 === 0}"
            :key="control.name"
            v-for="(control, idx) in classes[type]"
          >
            <div class="size" :key="size.size" v-for="size in sizes">
              <label v-if="!size.name" :for="control.name">.{{control.name}}</label>
              <label v-if="size.name" :for="control.name">.{{control.name}}-{{size.name}}</label>
              <input type="checkbox" @change="changeCSS()" v-model="control.values[size.name]" :name="control.name">
            </div>
          </div>
        </div>
      </section>
      <button @click="children > 1? children-- : null;">Remove child</button>
      <button @click="children < 10? children++ : null;">Add child</button>
    </div>
	<h4>{{classList}}</h4>
    <section id="parent">
      <div class="child" :key="child" v-for="child in children">{{child}}</div>
    </section>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  computed: {
	  classList: function(vm = this) {
		  let classList = "";
		  vm.types.forEach(function(type) {
			  vm.classes[type].forEach(function(someClass) {
				  if (someClass.values[""]) {
					  classList += "." + someClass.name;
				  }
				  if (someClass.values["md"]) {
					  classList += "." + someClass.name + "-md";
				  }
				  if (someClass.values["lg"]) {
					  classList += "." + someClass.name + "-lg";
				  }
			  });
		  });
		  return classList;
	  }
  },
  data: function() {
    return {
      sizes: [
        { name: "", size: 0 },
        { name: "md", size: 1280 },
        { name: "lg", size: 1600 }
      ],
      children: 5,
      classes: {
		direction: [
			{name: "row", values: {"": false, md: false, lg: false}},
			{name: "col", values: {"": false, md: false, lg: false}},
			{name: "row-reverse", values: {"": false, md: false, lg: false}},
			{name: "col-reverse", values: {"": false, md: false, lg: false}}
		],
        justify: [
			{name: "j-start", values: {"": false, md: false, lg: false}},
			{name: "j-end", values: {"": false, md: false, lg: false}},
			{name: "j-center", values: {"": false, md: false, lg: false}},
			{name: "j-between", values: {"": false, md: false, lg: false}},
			{name: "j-around", values: {"": false, md: false, lg: false}},
		],
        align: [			{name: "a-start", values: {"": false, md: false, lg: false}},
			{name: "a-end", values: {"": false, md: false, lg: false}},
			{name: "a-center", values: {"": false, md: false, lg: false}},
			{name: "a-baseline", values: {"": false, md: false, lg: false}},
			{name: "a-stretch", values: {"": false, md: false, lg: false}},
],
        container: [			{name: "container", values: {"": false, md: false, lg: false}},
			{name: "fluid", values: {"": false, md: false, lg: false}}
],
        wrap: [
			{name: "wrap", values: {"": false, md: false, lg: false}},
			{name: "nowrap", values: {"": false, md: false, lg: false}},
			{name: "wrap-reverse", values: {"": false, md: false, lg: false}}
			],
        hide: [{name: "hide", values: {"": false, md: false, lg: false}}],
        only: [{name: "only", values: {"": false, md: false, lg: false}}]
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
    changeCSS: function(vm = this) {
      let oldStyles = document.getElementById("generated-styles");
      if (oldStyles) {
        oldStyles.remove();
      }
		  let extend = "";
		  vm.types.forEach(function(type) {
			  vm.classes[type].forEach(function(someClass) {
				  if (someClass.values[""]) {
					  extend += "." + someClass.name + ",";
				  }
				  if (someClass.values["md"]) {
					  extend += "." + someClass.name + "-md" + ",";
				  }
				  if (someClass.values["lg"]) {
					  extend += "." + someClass.name + "-lg" + ",";
				  }
			  });
		  });
      let fileref = document.createElement("link");
      fileref.setAttribute("rel", "stylesheet");
      fileref.setAttribute("id", "generated-styles");
      fileref.setAttribute(
        "href",
        "/style.css?extend=" + extend
      );
      document.getElementsByTagName("head")[0].appendChild(fileref);
    }
  },
  mounted: function() {
    this.changeCSS();
  }
};
</script>

