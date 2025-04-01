import * as yup from "yup";

export const createInterestValidator = yup.object().shape({
  interestName: yup.string().required("Interest name is required."),
});
