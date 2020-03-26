import { check, request, RESULTS } from 'react-native-permissions';

export function permissionsChecker(permissions, handleGranted) {
  Promise.all(permissions.map(p => check(p.name, p.rationale)))
    .then((results) => {
     granted = true 
      results.forEach((result, index) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(`The permission ${permissions[index].name} is not available (on this device / in this context)`)
            granted = false
            break;
          case RESULTS.DENIED:
            console.log(`The permission ${permissions[index].name} has not been requested / is denied but requestable`)
            granted = false
            request(permissions[index].name)
            break;
          case RESULTS.GRANTED:
            console.log(`The permission ${permissions[index].name} is granted`)
            granted = granted && true
            break;
          case RESULTS.BLOCKED:
            console.log(`The permission ${permissions[index].name} is denied and not requestable anymore`)
            granted = false
            break;
          default:
            console.log('No one')
            granted = false
            break;
        }
      })
      handleGranted(granted)
    }).catch(error => {
      console.log(`ERRORRRR ${error}`)
      handleGranted(false)
    })
}