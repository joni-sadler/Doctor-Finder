// Redux actions for updating redux state

export const loadingDoctors = () => ({
  type: "LOADING_DOCTOR",
});

export const receiveDoctors = (doctors) => ({
  type: "RECEIVE_DOCTORS",
  doctors,
});

export const errorDoctors = () => ({
  type: "ERROR",
});

// export const loadingClinics = () => ({
//   type: "LOADING_CLINICS",
// });

// export const receiveClinics = (clinics) => ({
//   type: "RECEIVE_CLINICS",
//   clinics,
// });

// export const errorClinics = () => ({
//   type: "ERROR",
// });

export const doctorLogin = () => ({
  type: "DOCTOR_LOGGED_IN",
});

export const doctorLogout = () => ({
  type: "DOCTOR_LOGGED_OUT",
});

export const errorDoctorLogin = () => ({
  type: "ERROR",
});

export const clinicLogin = () => ({
  type: "CLINIC_LOGGED_IN",
});

export const clinicLogout = () => ({
  type: "CLINIC_LOGGED_OUT",
});

export const errorClinicLogin = () => ({
  type: "ERROR",
});
