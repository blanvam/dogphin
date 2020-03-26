import { PERMISSIONS } from 'react-native-permissions'

import { permissionsChecker } from './permissionsChecker'

export function checkPermissions(handleGranted) {
  let permissions = [
    {
      'name': PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      'rationale': { 
        'title': 'Location access only in use',
        'message': 'Need for detect your location to select location nearby you easily',
        'buttonPositive': "OK",
        'buttonNegative':"Cancel",
        'buttonNeutral': "Ask Me Later" 
      }
    },
    {
      'name': PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      'rationale': { 
        'title': 'Location access only in use',
        'message': 'Need for detect your location to select location nearby you easily',
        'buttonPositive': "OK",
        'buttonNegative':"Cancel",
        'buttonNeutral': "Ask Me Later" 
      }
    },
    {
      'name': PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
      'rationale': { 
        'title': 'Location access Always',
        'message': 'Need for detect your location to select location nearby you easily',
        'buttonPositive': "OK",
        'buttonNegative':"Cancel",
        'buttonNeutral': "Ask Me Later" 
      }
    }
  ]
  permissionsChecker(permissions, handleGranted)
}