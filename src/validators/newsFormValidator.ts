import * as yup from "yup";

export const newsFormValidator = yup.object().shape({
  title: yup.string().required("Title is required."),
  description: yup.string().required("Description is required."),
  cover: yup
    .mixed<File>()
    .test(
      "required",
      "Cover image is required.",
      (value) => value && value.length > 0,
    )
    .test("fileSize", "File is too large.", (value) => {
      return value && value[0] && value[0].size <= 5 * 1024 * 1024; // 5MB
    })
    .test(
      "fileType",
      "Invalid image format. Valid formats: jpg, jpeg, png.",
      (value) => {
        return (
          value &&
          value[0] &&
          ["image/jpeg", "image/jpg", "image/png"].includes(value[0].type)
        );
      },
    ),
  content: yup.string().required("Content is required."),
});
