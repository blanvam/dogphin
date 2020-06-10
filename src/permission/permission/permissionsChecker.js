import { checkMultiple, request, RESULTS } from 'react-native-permissions'

export function permissionsChecker(permissions, handleGranted) {
  let requestPermissions = permissions["request"]
  let optionalPermissions = permissions["optional"]
  checkMultiple(requestPermissions).then(response => {
    let granted = true
    for (const perm of requestPermissions) {
      switch (response[perm]) {
        case RESULTS.UNAVAILABLE:
          console.log(`The permission ${perm} is not available (on this device / in this context)`)
          if (optionalPermissions.includes(perm)) {
            granted = granted && true
          } else {
            granted = false
          }
          break;
        case RESULTS.DENIED:
          console.log(`The permission ${perm} has not been requested / is denied but requestable`)
          granted = false
          request(perm)
          break;
        case RESULTS.GRANTED:
          console.log(`The permission ${perm} is granted`)
          granted = granted && true
          break;
        case RESULTS.BLOCKED:
          console.log(`The permission ${perm} is denied and not requestable anymore`)
          granted = false
          break;
        default:
          console.log('No one')
          granted = false
          break;
      }
    } 
    handleGranted(granted)
  })
}