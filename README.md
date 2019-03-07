# flexboy.scss
flexboy.scss is a light-weight scss library, with the purpose of exposing useful SCSS selectors for your project's typical colors, fonts, and flexbox properties. Define your own responsive breakpoints for your project, and take advantage of the SCSS @extend functionality to keep your styles short, clean, and readable.

### Get Started
Declare your flexboy variable and import the library. Then, you are free to use the flexboy selectors anywhere within scope.
```scss
$flexboy: ( 
  //set any names and sizes you like. These will be used to determine at what screen width to apply styles, as well as the @extend selector names.
  breakpoints: (
    md: 1280px,
    lg: 1600px
  ),
  containers: (
    // requires a default for the 0px breakpoint
    default: 600px,
    md: 900px,
    lg: 1200px
  ),
  // whether to set margins to 0 for elements that have their own default margins (h1, h2, p, etc.) (defaults to false)
  disableDefaultMargins: false,
  // any names and values that you like.
  colors: (
    myRed: #ff0505,
    myBlue: rgba(0, 0, 255, 1),
    greatGreen: green
  ), 
  // font families and their associated weights
  fonts: (
    helvetica: (400, 700, 900), 
    roboto: (400, 500)
  )
);
@import "flexboy.scss";

.test {
  @extend %row, %j-between, %col-md, %helvetica-400, %myRed-lg;
}
```
#### Use helper mixins
```scss
// to attach size-specific classes
// extends the row-md, j-between-md, and col-md classes.
// @mixin size($breakPointName, $selectorList)
@include size(md, (row, j-between, col, myRed));

// a mixin to create a container which subtracts width by padding.
// @mixin container($subtractPadding, $breakPointName)
padding: 40px;
@include container(40px, md);

// add gutter between children in a parent
// @mixin gutter($amount, $breakPointName)
@include gutter(20px, md);
```
### How sized classes are applied:
flexboy.scss follows a mobile-first paradigm. The default classes apply themselves at >= 0px screen width. If you define your first breakpoint as `md: 1280px`, then the `-md` classes will apply themselves at screen widths >= 1280px.

Example: Applying the classes `.row` and `.col-md` will render a flexbox row from 0px to 1279px screen width, and a flexbox column at >= 1280px screen width. This rule holds true for all cases except the `hide` and `only` classes, which have higher precedence, since they need to override the css `display` property.

### Selectors explained:
#### Flex Directions
Refer to the `flex-direction` css property. These also apply the `display: flex;` style.
* `%row` = `flex-direction: row;`
* `%col` = `flex-direction: column;`
* `%row-reverse` = `flex-direction: row-reverse;`
* `%col-reverse` = `flex-direction: column-reverse;`
#### Justify
Refer to the `justify-content` css property.
* `%j-start` = `justify-content: flex-start;`
* `%j-end` = `justify-content: flex-end;`
* `%j-center` = `justify-content: center;`
* `%j-between` = `justify-content: space-between;`
* `%j-around` = `justify-content: space-between;`
#### Align
Refer to the `align-items` css property.
* `%a-start` = `align-items: flex-start;`
* `%a-end` = `align-items: flex-end;`
* `%a-center` = `align-items: center;`
* `%a-baseline` = `align-items: baseline;`
* `%a-stretch` = `align-items: stretch;`
#### Wrap
Refers to the `flex-wrap` css property.
* `%wrap` = `flex-wrap: wrap;`
* `%nowrap` = `flex-wrap: nowrap;`
* `%wrap-reverse` = `flex-wrap: wrap-reverse;`
#### Hide
The `%hide` selector applies `display: none;` to the element only at that associated size.
#### Only
The `%only` selector applies `display: none;` to the element at all sizes other than the associated size.
#### Container
The `%container` selector sets the width of the element to the associated container width. It also applies `margin-left: auto; margin-right: auto;` to center the container.
#### Fluid
The `%fluid` selector simply sets `width: 100%;`. This serves as a means to counteract the `container` class at higher breakpoints.
#### Colors
These selectors refer to various color related properties. See the following examples for a color defined as `myRed: red`:
* `%myRed` = `color: red;`
* `%myRed-bg` = `background-color: red;`
* `%myRed-fill` = `fill: red;`
* `%myRed-stroke` = `stroke: red;`
### Fonts
These selectors refer to the font family and weight. See the following examples for a font defined as `helvetica: (400, 700, 900)`:
* `%helvetica-400` = `font-family: helvetica; font-weight: 400;`
* `%helvetica-900` = `font-family: helvetica; font-weight: 900;`
### Sizes and Line Heights
These selectors refer to the font-size and line-height css propertues. Currently, there are selectors for sizes and line heights from 1px to 250px.
* `%s-48` = `font-size: 48px;`
* `%lh-60` = `line-height: 60px;`
