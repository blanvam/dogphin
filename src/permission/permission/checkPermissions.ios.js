import { PERMISSIONS } from 'react-native-permissions'

import { permissionsChecker } from './permissionsChecker'

export function checkPermissions(handleGranted) {
  let permissions = {
    "request": [
      PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      PERMISSIONS.IOS.LOCATION_ALWAYS
    ],
    "optional": [
      PERMISSIONS.IOS.LOCATION_ALWAYS
    ]
  }
  permissionsChecker(permissions, handleGranted)
}