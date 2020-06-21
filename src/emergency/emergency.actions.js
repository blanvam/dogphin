import emergencyTypes from './emergency.action-types'


export const toggleEmergencyModal = status => {
  return {
    type: emergencyTypes.TOGGLE_EMERGENCY_MODAL,
    status,
  }
}
