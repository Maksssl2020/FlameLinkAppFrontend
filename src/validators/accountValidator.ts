import * as yup from "yup";

export const ChangePasswordValidator = yup.object().shape({
  currentPassword: yup.string().required("Current password is required."),
  newPassword: yup.string().required("New password is required."),
  retypeNewPassword: yup
    .string()
    .required("Retype password is required.")
    .oneOf([yup.ref("newPassword"), ""], "Passwords must match."),
});
