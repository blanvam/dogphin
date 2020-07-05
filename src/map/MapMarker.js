import React from 'react'
import { Marker } from 'react-native-maps'
import { View, Icon } from 'native-base'

export default MapMarker = props => 
    <Marker
        key={`${props.prefixId}_${props.item.id}`}
        coordinate={{
          latitude: props.item.coordinates.latitude,
          longitude: props.item.coordinates.longitude,
        }}
        title={props.config.title}
        description={props.config.message}
        zIndex={props.zIndex}
        pointerEvents="auto"
      >
        <View 
        style={{
          backgroundColor: props.config.backgroundColor,
          ...props.markerStyle,
        }}>
          <Icon
            style={{ 
              color: props.config.iconColor,
              ...props.iconMarkerStyle,
            }}
            type={props.config.iconFont} 
            name={props.config.iconName} 
          />
        </View>
      </Marker>
