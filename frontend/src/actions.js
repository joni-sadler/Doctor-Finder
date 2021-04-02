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

export const loadingClinics = () => ({
  type: "LOADING_CLINICS",
});

export const receiveClinics = (clinics) => ({
  type: "RECEIVE_CLINICS",
  clinics,
});

export const errorClinics = () => ({
  type: "ERROR",
});
