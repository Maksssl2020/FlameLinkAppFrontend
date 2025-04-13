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

const AdminNewsForm = () => {
  const [content, setContent] = useState<string>("");
  const [imageCover, setImageCover] = useState<File | undefined>(undefined);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newsFormValidator),
  });

  const onSubmit = (data: { title: string; description: string }) => {
    if (!content || !imageCover) return;
  };

  return (
    <Page>
      <SectionContainer>
        <SectionBanner title={"Create News"} />
        <div
          className={
            "w-full h-[725px]  flex justify-between overflow-y-auto scrollbar pr-4"
          }
        >
          <div className={"w-[50%] h-[850px] "}>
            <Editor onChange={setContent} />
          </div>
          <div className={"w-[45%] h-full flex flex-col"}>
            <FormInput
              title={"Article title"}
              type={"text"}
              register={register("title")}
              error={errors?.title?.message}
              formType={"default"}
            />
            <FormTextArea
              title={"Article description"}
              register={register("description")}
              error={errors?.description?.message}
            />
            <div className={"w-full h-auto flex gap-4 items-center "}>
              <FormFileInput
                title={"Article cover"}
                multiple={false}
                onChange={(value) => {
                  if (value) {
                    setImageCover(value);
                    setValue("cover", value);
                  }
                }}
              />
              <ImagePreview
                image={imageCover ? URL.createObjectURL(imageCover) : undefined}
                alt={"cover-preview"}
                key={"cover-preview"}
              />
            </div>
            <AnimatedButton
              type={"button"}
              className={
                "min-h-[65px] mt-auto cursor-pointer rounded-xl bg-white text-gray-200 font-bold  uppercase text-xl"
              }
            >
              Create Article
            </AnimatedButton>
          </div>
        </div>
      </SectionContainer>
    </Page>
  );
};

export default AdminNewsForm;
