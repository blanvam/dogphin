import { PERMISSIONS } from 'react-native-permissions'

import { permissionsChecker } from './permissionsChecker'

export function checkPermissions(handleGranted) {
  let permissions = [
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION    
  ]
  permissionsChecker(permissions, handleGranted)
}