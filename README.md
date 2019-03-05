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
@import "../lib/_flex.scss";
```
### Use @extend
```scss
@extend .row, .j-between, .col-md;
```
### Use class
```html
<div class="row j-between col-md"></div>
```
### Use helper mixins
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
