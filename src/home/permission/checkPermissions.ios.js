import { PERMISSIONS } from 'react-native-permissions'

import { permissionsChecker } from './permissionsChecker'

export function checkPermissions(handleGranted) {
  let permissions = [
    PERMISSIONS.IOS.LOCATION_ALWAYS,
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
  ]
  permissionsChecker(permissions, handleGranted)
}