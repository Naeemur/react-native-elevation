/**
 * React-Native cross-platform elevations: https://gist.github.com/mmazzarolo/84b36e89180a9ba22a32de5cdf813eb7
 * Based on https://ethercreative.github.io/react-native-shadow-generator/
 * The gist was buggy, Naeem fixed.
 *
 * Usage:
 * 1. Import "elevations" from this file 
 *		import { elevations } from "config/elevations"
 * 2. Use it. Assuming you need an elevation of 2 (based on the Android 
 *		elevation standard), doing the following will cast the same shadow 
 *		on both platforms:
 *		return <View style={[{ width: 50, height: 50 }, elevations[2]]} />
 */

const { Platform } = require('react-native')

const webDepth = {
	umbra: [
		"0px 0px 0px 0px",
		"0px 2px 1px -1px",
		"0px 3px 1px -2px",
		"0px 3px 3px -2px",
		"0px 2px 4px -1px",
		"0px 3px 5px -1px",
		"0px 3px 5px -1px",
		"0px 4px 5px -2px",
		"0px 5px 5px -3px",
		"0px 5px 6px -3px",
		"0px 6px 6px -3px",
		"0px 6px 7px -4px",
		"0px 7px 8px -4px",
		"0px 7px 8px -4px",
		"0px 7px 9px -4px",
		"0px 8px 9px -5px",
		"0px 8px 10px -5px",
		"0px 8px 11px -5px",
		"0px 9px 11px -5px",
		"0px 9px 12px -6px",
		"0px 10px 13px -6px",
		"0px 10px 13px -6px",
		"0px 10px 14px -6px",
		"0px 11px 14px -7px",
		"0px 11px 15px -7px"
	],
	penumbra: [
		"0px 0px 0px 0px",
		"0px 1px 1px 0px",
		"0px 2px 2px 0px",
		"0px 3px 4px 0px",
		"0px 4px 5px 0px",
		"0px 5px 8px 0px",
		"0px 6px 10px 0px",
		"0px 7px 10px 1px",
		"0px 8px 10px 1px",
		"0px 9px 12px 1px",
		"0px 10px 14px 1px",
		"0px 11px 15px 1px",
		"0px 12px 17px 2px",
		"0px 13px 19px 2px",
		"0px 14px 21px 2px",
		"0px 15px 22px 2px",
		"0px 16px 24px 2px",
		"0px 17px 26px 2px",
		"0px 18px 28px 2px",
		"0px 19px 29px 2px",
		"0px 20px 31px 3px",
		"0px 21px 33px 3px",
		"0px 22px 35px 3px",
		"0px 23px 36px 3px",
		"0px 24px 38px 3px"
	],
	ambient: [
		"0px 0px 0px 0px",
		"0px 1px 3px 0px",
		"0px 1px 5px 0px",
		"0px 1px 8px 0px",
		"0px 1px 10px 0px",
		"0px 1px 14px 0px",
		"0px 1px 18px 0px",
		"0px 2px 16px 1px",
		"0px 3px 14px 2px",
		"0px 3px 16px 2px",
		"0px 4px 18px 3px",
		"0px 4px 20px 3px",
		"0px 5px 22px 4px",
		"0px 5px 24px 4px",
		"0px 5px 26px 4px",
		"0px 6px 28px 5px",
		"0px 6px 30px 5px",
		"0px 6px 32px 5px",
		"0px 7px 34px 6px",
		"0px 7px 36px 6px",
		"0px 8px 38px 7px",
		"0px 8px 40px 7px",
		"0px 8px 42px 7px",
		"0px 9px 44px 8px",
		"0px 9px 46px 8px"
	]
}

const webColor = {
	umbra: "rgba(0,0,0,0.2)",
	penumbra: "rgba(0,0,0,0.14)",
	ambient: "rgba(0,0,0,0.12)"
}

const derive = (i, a, b, a2, b2) => {
	return ((i - a) * (b2 - a2)) / (b - a) + a2
}

const parseShadow = (raw) => {
	const values = raw.split(" ").map(val => +val.replace("px", ""))
	return {
		x: values[0],
		y: values[1],
		blur: values[2],
		spread: values[3]
	}
}

const maxElevation = 24

const generateElevationStyle = (depth=0) => {
	let style = {}
	if (Platform.OS === "android") {
		style = {
			elevation: depth
		}
	} else if (Platform.OS === "ios") {
		const s = parseShadow(webDepth.penumbra[depth])
		const y = s.y === 1 ? 1 : Math.floor(s.y * 0.5)
		style = {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: y
			},
			shadowOpacity: depth <= 0 ? 0 : Number(derive(depth - 1, 1, 24, 0.2, 0.6).toFixed(2)),
			shadowRadius: Number(derive(s.blur, 1, 38, 1, 16).toFixed(2))
		}
	} else if (Platform.OS === "web") {
		style = {
			elevation: depth,
			zIndex: depth,
			boxShadow: `
				${webDepth.umbra[depth]} ${webColor.umbra},
				${webDepth.penumbra[depth]} ${webColor.penumbra},
				${webDepth.ambient[Math.max(0,depth-1)]} ${webColor.ambient}
			`
		}
	}
	return style
}

const elevations = new Array(maxElevation+1)
	.fill(undefined)
	.map((x, index) => generateElevationStyle(index))

elevations.interpolate = (anim, {inputRange,outputRange,...opts}) => {
	let style = {}
	// let style = {
	// 	backgroundColor:'#f00',
	// 	opacity:"var(--elev)",
	// 	"--elev":anim.interpolate({inputRange,outputRange:outputRange.map(v=>(v/24)+''),...opts}),
	// }
	// return {elevation:anim.interpolate({inputRange,outputRange,...opts})}
	// return {elevation:24}
	if (Platform.OS === "android") {
		style = {
			elevation: anim.interpolate({inputRange,outputRange,...opts})
		}
	} else if (Platform.OS === "ios") {
		const output = { height:[], shadowOpacity:[], shadowRadius:[] }
		outputRange.forEach(depth => {
			const s = parseShadow(webDepth.penumbra[depth])
			const y = s.y === 1 ? 1 : Math.floor(s.y * 0.5)
			output.height.push(y)
			output.shadowOpacity.push(depth <= 0 ? 0 : Number(derive(depth - 1, 1, 24, 0.2, 0.6).toFixed(2)))
			output.shadowRadius.push(Number(derive(s.blur, 1, 38, 1, 16).toFixed(2)))
		})
		style = {
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: anim.interpolate({inputRange,outputRange:output.height,...opts})
			},
			shadowOpacity: anim.interpolate({inputRange,outputRange:output.shadowOpacity,...opts}),
			shadowRadius: anim.interpolate({inputRange,outputRange:output.shadowRadius,...opts})
		}
	} else if (Platform.OS === "web") {
		const output = { elevation:[], zi:[], u1:[], u2:[], u3:[], p1:[], p2:[], p3:[], a1:[], a2:[], a3:[] }
		outputRange.forEach(depth => {
			output.elevation.push(depth)
			output.zi.push(depth+'')
			let u = webDepth.umbra[depth].split(' ')
			let p = webDepth.penumbra[depth].split(' ')
			let a = webDepth.ambient[Math.max(0,depth-1)].split(' ')
			output.u1.push(u[1])
			output.u2.push(u[2])
			output.u3.push(u[3])
			output.p1.push(p[1])
			output.p2.push(p[2])
			output.p3.push(p[3])
			output.a1.push(a[1])
			output.a2.push(a[2])
			output.a3.push(a[3])
		})
		style = {
			elevation: anim.interpolate({inputRange,outputRange:output.elevation,...opts}),
			zIndex: anim.interpolate({inputRange,outputRange:output.zi,...opts}),
			"--u1": anim.interpolate({inputRange,outputRange:output.u1,...opts}),
			"--u2": anim.interpolate({inputRange,outputRange:output.u2,...opts}),
			"--u3": anim.interpolate({inputRange,outputRange:output.u3,...opts}),
			"--p1": anim.interpolate({inputRange,outputRange:output.p1,...opts}),
			"--p2": anim.interpolate({inputRange,outputRange:output.p2,...opts}),
			"--p3": anim.interpolate({inputRange,outputRange:output.p3,...opts}),
			"--a1": anim.interpolate({inputRange,outputRange:output.a1,...opts}),
			"--a2": anim.interpolate({inputRange,outputRange:output.a2,...opts}),
			"--a3": anim.interpolate({inputRange,outputRange:output.a3,...opts}),
			// "--zi": anim.interpolate({inputRange,outputRange:output.zi,...opts}),
			// zIndex: `calc(var(--zi))`,
			boxShadow: `
				0px var(--u1) var(--u2) var(--u3) ${webColor.umbra},
				0px var(--p1) var(--p2) var(--p3) ${webColor.penumbra},
				0px var(--a1) var(--a2) var(--a3) ${webColor.ambient}
			`
		}
	}
	return style
}

module.exports = elevations