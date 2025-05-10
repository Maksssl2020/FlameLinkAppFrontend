import Page from "../../animations/Page.tsx";
import SectionContainer from "../../components/section/SectionContainer.tsx";
import SectionBanner from "../../components/banner/SectionBanner.tsx";
import Editor from "../../components/editor/Editor.tsx";
import { useState } from "react";
import FormInput from "../../components/input/FormInput.tsx";
import FormTextArea from "../../components/textarea/FormTextArea.tsx";
import FormFileInput from "../../components/input/FormFileInput.tsx";
import ImagePreview from "../../components/image/ImagePreview.tsx";
import AnimatedButton from "../../components/button/AnimatedButton.tsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newsFormValidator } from "../../validators/newsFormValidator.ts";
import { AnimatePresence } from "framer-motion";
import { HiOutlineCheck } from "react-icons/hi2";
import { HiOutlineExclamation } from "react-icons/hi";
import { motion } from "framer-motion";

const AdminNewsForm = () => {
  const [content, setContent] = useState<string>("");
  const [imageCover, setImageCover] = useState<File | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(newsFormValidator),
  });

  const onSubmit = async (data: { title: string; description: string }) => {
    if (!content) {
      setSubmitStatus({
        success: false,
        message: "Please add content to your article",
      });
      return;
    }

    if (!imageCover) {
      setSubmitStatus({
        success: false,
        message: "Please upload a cover image",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus({
        success: true,
        message: "Article created successfully!",
      });

      // Reset form
      reset();
      setContent("");
      setImageCover(undefined);

      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Failed to create article. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page className="bg-black-100 min-h-screen">
      <SectionContainer>
        <SectionBanner title="Create News">
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  submitStatus.success
                    ? "text-green-100 bg-black-200 border-green-100"
                    : "text-red-500 bg-black-200 border-red-500"
                }`}
              >
                {submitStatus.success ? (
                  <HiOutlineCheck className="size-5" />
                ) : (
                  <HiOutlineExclamation className="size-5" />
                )}
                <span>{submitStatus.message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </SectionBanner>

        <div className="w-full max-w-6xl mx-auto bg-black-200 rounded-xl border-2 border-pink-100 shadow-lg shadow-pink-100/10 p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-8"
          >
            <div className="w-full lg:w-1/2">
              <h3 className="text-2xl text-gradient font-bold mb-4">
                Article Content
              </h3>
              <div className="w-full h-[500px] border-2 border-gray-200 rounded-xl overflow-hidden">
                <Editor onChange={setContent} />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <h3 className="text-2xl text-gradient font-bold mb-0">
                Article Details
              </h3>
              <FormInput
                title="Article title"
                type="text"
                register={register("title")}
                error={errors?.title?.message}
                formType="default"
              />
              <FormTextArea
                title="Article description"
                register={register("description")}
                error={errors?.description?.message}
              />
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <FormFileInput
                  title="Article cover"
                  multiple={false}
                  onChange={(value) => {
                    if (value) {
                      setImageCover(value);
                      setValue("cover", value);
                    }
                  }}
                />
                <div className="flex-1">
                  <ImagePreview
                    image={
                      imageCover ? URL.createObjectURL(imageCover) : undefined
                    }
                    alt="cover-preview"
                    key="cover-preview"
                  />
                </div>
              </div>

              <div className="mt-auto pt-6">
                <AnimatedButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[55px] bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold rounded-xl text-xl flex items-center justify-center"
                  hoverBackgroundColor="#E80352"
                  hoverTextColor="#FFFFFF"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Article"
                  )}
                </AnimatedButton>
              </div>
            </div>
          </form>
        </div>
      </SectionContainer>
    </Page>
  );
};

export default AdminNewsForm;
