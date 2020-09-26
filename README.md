# React Native Elevation

Cross platform material design elevation for react native, for Android, iOS and Web (with umbra, penumbra and ambient shadows).

## Features
- Pure JS, lightweight, works on Android, iOS and Web
- Supports interpolated animations for elevations on all platforms
- Uses platform specific styles for view and animation

![Demo Image](https://naeemur.github.io/asset-bucket/rn-elevation.gif)

## Installation

```
npm install react-native-elevation
```

## Usage

```js
import { Component } from 'react'
import { View, Text, Animated, StyleSheet } from 'react-native'

import Elevations from 'react-native-elevation'

const styles = StyleSheet.create({
	some: {
		margin:8,
		...Elevations[4]
	}
})

class App extends Component {
	render() {
		return (
			<View style={[]}>
				<View style={styles.some}>{...}</View>
				<View style={Elevations[2]}>{...}</View>
				<View style={[{height:100},Elevations[4]]}>{...}</View>
				<View style={[{height:100,...Elevations[6]}]}>{...}</View>
			</View>
		)
	}
}

export default App
```

## API

## ***Elevations***

An array of elevations from 0 to 24 that use platform specific styles

## Methods
```Elevations.interpolate(animatedValue, {inputRange:Array,outputRange:Array})```

Does interpolated animation on the `animatedValue`. Remember that, `outputRange` values must be integers between 0 to 24.

## Notes
On iOS, target view should have `overflow:'visible'` for the shadow to show up.

React Native Web might show some warning on devTools console while animating. This is due to use of CSS variables and React Native Web handling it poorly. This should be ignored.

## License
The MIT License (MIT)

Copyright (c) 2020 Md. Naeemur Rahman (https://naeemur.github.io)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.