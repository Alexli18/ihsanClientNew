import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    style={{
      enableBackground: "new 0 0 512 512",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Circle
      style={{
        fill: "#ffd15d",
      }}
      cx={256}
      cy={256}
      r={256}
    />
    <Path
      style={{
        fill: "#f9b54c",
      }}
      d="M510.216 225.771 369.778 85.333S245.095 274.452 245.083 273.239l-102.86 153.428 83.547 83.547c75.186 8.89 153.559-15.505 211.249-73.195s82.085-136.063 73.197-211.248z"
    />
    <Path
      style={{
        fill: "#b97850",
      }}
      d="M142.222 85.333h227.556v341.333H142.222z"
    />
    <Path
      style={{
        fill: "#935635",
      }}
      d="M256 85.333h113.778v341.333H256z"
    />
    <Path
      style={{
        fill: "#fff",
      }}
      d="M156.013 98.263h199.973v315.475H156.013z"
    />
    <Path
      style={{
        fill: "#e6f3ff",
      }}
      d="M256 98.263h99.987v315.475H256z"
    />
    <Path
      style={{
        fill: "#734b46",
      }}
      d="M199.111 85.333h113.778v28.444H199.111z"
    />
    <Path
      style={{
        fill: "#57442f",
      }}
      d="M256 85.333h56.889v28.444H256z"
    />
    <Path
      style={{
        fill: "#84dbff",
      }}
      d="M170.667 170.667h28.444v28.444h-28.444zM170.667 227.556h28.444V256h-28.444zM170.667 284.444h28.444v28.444h-28.444zM170.667 341.333h28.444v28.444h-28.444z"
    />
    <Path
      style={{
        fill: "#cfdbe6",
      }}
      d="M227.556 193.939h113.778v5.172H227.556zM227.556 250.828h113.778V256H227.556zM227.556 307.717h113.778v5.172H227.556zM227.556 364.606h113.778v5.172H227.556zM227.556 181.872h113.778v5.172H227.556zM227.556 238.761h113.778v5.172H227.556zM227.556 295.65h113.778v5.172H227.556zM227.556 352.539h113.778v5.172H227.556z"
    />
  </Svg>
)

export default SvgComponent
