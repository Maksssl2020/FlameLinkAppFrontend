import * as yup from "yup";

export const signUpFirstStepValidator = yup.object().shape({
  username: yup.string().required("Username is required."),
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),
  email: yup
    .string()
    .email("Enter a valid e-mail address.")
    .required("E-mail address is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(10, "Password must be at least 10 characters long."),
  confirmPassword: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("password"), ""], "Passwords must match."),
});

export const signUpSecondStepValidator = yup.object().shape({
  country: yup.string().required("Country is required."),
  city: yup.string().required("City is required."),
  dateOfBirth: yup
    .date()
    .typeError("Enter a valid date of birth.")
    .required("Date of birth is required.")
    .test("is-18", "You must be at least 18 years old.", (value) => {
      if (!value) return false;
      const today = new Date();
      const minBirthDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(),
      );
      return value <= minBirthDate;
    }),
  gender: yup
    .mixed<"Male" | "Female" | "Other">()
    .required("Gender is required.")
    .oneOf(["Male", "Female", "Other"], "Chosen gender is invalid."),
  preference: yup
    .mixed<"Males" | "Females" | "Both">()
    .required("Preference is required.")
    .oneOf(["Males", "Females", "Both"], "Chosen preference is invalid."),
});
