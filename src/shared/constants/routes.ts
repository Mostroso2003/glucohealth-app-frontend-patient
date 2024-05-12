export const ROUTES = {
  ROOT: '/',
  LOGIN: {
    PATH: '/login',
    COMPLETE_PROFILE: { PATH: '/login/complete-profile' },
  },
  APP: {
    PATH: '/app',
    PATIENT_DATA_FORM: { PATH: '/app/patient-data-form' },
    DASHBOARD: { PATH: '/app/dashboard' },
    PATIENTS: {
      PATH: '/app/patients',
      PREREGISTER: {
        PATH: '/app/patients/preregister',
        LOGIN_DATA: { PATH: '/app/patients/preregister/login-data' },
      },
    },
    PATIENT: { PATH: '/app/patient' },
    SETTINGS: { PATH: '/app/settings' },
  },
}
