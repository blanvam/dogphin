import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import { View, Text } from 'native-base'
import  { Svg, Path } from 'react-native-svg'

const width = Dimensions.get('window').width + 10
const shapes = {
  path: "M0.00,49.98 C149.99,150.00 271.49,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z",
  width: 500,
  height: 150
}
const svgHeight = ((width)*shapes.height)/shapes.width

export default class UserHeader extends Component {
  render() {
    let viewHeight = this.props.height-shapes.height/2
    return (
      <View style={{flex:1, ...this.props.style, height: this.props.height }}>
        <View style={{backgroundColor: "#00576a", height: viewHeight }}></View>
        <Svg width={width} height={svgHeight} viewBox={`0 0 ${shapes.width+1} ${shapes.height}`}>
          <Path fill="#00576a" fillOpacity={1} d={shapes.path}></Path>
        </Svg>
      </View>
    )
  }
}