import { PERMISSIONS } from 'react-native-permissions'

import { permissionsChecker } from './permissionsChecker'

export function checkPermissions(handleGranted) {
  let permissions = [
    {
      'name': PERMISSIONS.IOS.LOCATION_ALWAYS,
      'rationale': { 
        'title': 'Location Access Always',
        'message': 'Need for detect your location to select location nearby you easily',
        'buttonPositive': "OK",
        'buttonNegative':"Cancel",
        'buttonNeutral': "Ask Me Later" 
      }
    },
    {
      'name': PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      'rationale': { 
        'title': 'Location Access only in use',
        'message': 'Need for detect your location to select location nearby you easily',
        'buttonPositive': "OK",
        'buttonNegative':"Cancel",
        'buttonNeutral': "Ask Me Later" 
      }
    }
  ]
  permissionsChecker(permissions, handleGranted)
}