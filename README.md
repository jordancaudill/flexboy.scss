# flexboy
### Get Started
Set your flexboy variables and import the library. You can set whatever names and sizes you like (default required for $flexboyContainers)
```scss
$flexboy: (
  md: 1280px,
  lg: 1600px
);
//containers require a default for 0px to next available breakpoint.
$flexboyContainers: (
  default: 600px,
  md: 900px,
  lg: 1200px
);
@import "flexboy.scss";
```
#### Use @extend
```scss
@extend .row, .j-between, .col-md;
```
#### Use class
```html
<div class="row j-between col-md"></div>
```
#### Use helper mixins
```scss
// to attach size-specific classes
// extends the row-md, j-between-md, and col-md classes.
// @mixin size($breakPointName, $selectorList)
@include size(md, (row, j-between, col));

// a mixin to create a container which subtracts width by padding.
// @mixin container($subtractPadding, $breakPointName)
padding: 40px;
@include container(40px, md);

// add gutter between children in a parent
// @mixin gutter($amount, $breakPointName)
@include gutter(20px, md);
```
### How sized classes are applied:
Flexboy.scss follows a mobile-first paradigm. The default classes apply themselves at >= 0px screen width. If you define your first breakpoint as `md: 1280px`, then the `-md` classes will apply themselves at screen widths >= 1280px.

Example: Applying the classes `.row` and `.col-md` will render a flexbox row from 0px to 1279px screen width, and a flexbox column at >= 1280px screen width. This rule holds true for all cases except the `hide` and `only` classes, which have higher precedence, since they need to override the css `display` property.

### Classes explained:
#### Flex Directions
Refer to the `flex-direction` css property. These also apply the `display: flex;` style.
* row = `flex-direction: row;`
* col = `flex-direction: column;`
* row-reverse = `flex-direction: row-reverse;`
* col-reverse = `flex-direction: column-reverse;`
#### Justify
Refer to the `justify-content` css property.
* j-start = `justify-content: flex-start;`
* j-end = `justify-content: flex-end;`
* j-center = `justify-content: center;`
* j-between = `justify-content: space-between;`
* j-around = `justify-content: space-between;`
#### Align
Refer to the `align-items` css property.
* a-start = `align-items: flex-start;`
* a-end = `align-items: flex-end;`
* a-center = `align-items: center;`
* a-baseline = `align-items: baseline;`
* a-stretch = `align-items: stretch;`
#### Wrap
Refers to the `flex-wrap` css property.
* wrap = `flex-wrap: wrap;`
* nowrap = `flex-wrap: nowrap;`
* wrap-reverse = `flex-wrap: wrap-reverse;`
#### Hide
The `hide` class applies `display: none;` to the element only at that associated size.
#### Only
The `only` class applies `display: none;` to the element at all sizes other than the associated size.
#### Container
The `container` class adds sets the width of the element to the associated $containerWidth. It also applies `margin-left: auto; margin-right: auto;` to center the container.
#### Fluid
The `fluid` class simply sets `width: 100%;`. This serves as a means to counteract the `container` class at higher breakpoints.

### Run the demo
```sh
cd demo
npm install
node server.js
```
