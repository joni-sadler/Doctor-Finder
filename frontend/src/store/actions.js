// Redux actions for updating redux state

export const loadingDoctors = () => ({
  type: "LOADING_DOCTOR",
});

export const receiveDoctors = () => ({
  type: "RECEIVE_DOCTORS",
})

export const errorDoctors = () => ({
  type: "ERROR",
});

export const loadingClinics = () => ({
  type: "LOADING_CLINICS",
  });

export const receiveClinics = () => ({
  type: "RECEIVE_CLINICS",
})

export const errorClinics = () => ({
  type: "ERROR",
});
