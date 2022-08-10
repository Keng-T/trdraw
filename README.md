<span style="font-size:20px"><b>trdraw.js</b> -- Simple save/loadable svg drawpad!</span>

- [Features](#features)
- [Requirements](#requirements)
- [Usage](#usage)
  - [initiation](#initiation)
- [Implementation Details](#implementation-details)
  - [jQuery Objects](#jquery-objects)
  - [Handler Events](#handler-events)

# Features

* Automatically coverts drawn paths to stringified JSON object and write to the hidden input.
* Load drawing by simply triggering onchange event on the hidden input.
* Clear button to remove drawn paths and input.


# Requirements

* jQuery (>=3.6.0)
* (Optional but recommended) Boostrap (>=5.0)


# Usage

## initiation

```JS
$('???').trdraw(Object settings);
```

**Parameters:**

* Object settings for trselect with key:value [default]
  * color -- string for color [black]
  * thickness -- integer for line thicness [2]
  * width -- integer indicating width of the drawingpad [200]
  * height -- integer indicating height of the drawingpad [200]
  * readonly -- boolean is the drawpad readonly? [false]
  * clear_text -- string for clear drawing button [clear]


# Implementation Details

<b style="color:red;">For developers who intend to modify this script.</b>

## jQuery Objects

* $input = `<input>` is the hidden input for storing string
* $drawpad = `<svg>` for drawing and display

## Handler Events

* $input.on("change")
  * 
* $drawpad.on("mousedown")
  * start a new <path> only for left mouse button
* $drawpad.on("mousup")
  * stop recording to new <path>
  * add <path> to the hidden <input>
* $drawpad.on("mousemove")
  * adding new position to the path if mouse down
* (clear button).on("click")
  * clear <path> from $drawpad
  * clear value from $input