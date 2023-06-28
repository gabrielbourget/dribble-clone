"use client";

import { useState } from "react";
import Image from "next/image";
import { SessionInterface } from "@/common.types";
import { categoryFilters } from "@/constants";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";

type ProjectFormProps = {
  type: string;
  session: SessionInterface;
}

const ProjectForm = ({ type, session }: ProjectFormProps) => {
  const handleFormSubmit = (e: any) => {

  };
  // const handleFormSubmit = (e: React.FormEvent<HTMLInputElement>) => {

  // };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {

  };

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, value }));
  }

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    image: "",
    description: "",
    liveSiteUrl: "",
    githubUrl: "",
    category: "",
  })

  return (
    <form action="" className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container w-full lg:min-h-[400px] min-h-[200px] relative">
        <label htmlFor="poster" className="flexCenter form_iamge-label">
          {
            (form.image) ? (
              "Image"
            ) : (<p>Add a project photo</p>)
          }
        </label>
        <input
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {
          (form.image) ? (
            <>
              <Image
                src={form?.image}
                className="sm:p-10 object-contain z-20"
                alt="Project poster"
                fill
              />
            </>
          ) : undefined
        }
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value: string) => handleStateChange("title", value)}
      />
      <FormField
        title="Description"
        state={form.description}
        isTextArea
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value: string) => handleStateChange("description", value)}
      />
      <FormField
        type="url"
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="Site URL"
        setState={(value: string) => handleStateChange("liveSiteURL", value)}
      />
      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl}
        placeholder="Github URL"
        setState={(value: string) => handleStateChange("title", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value: string) => handleStateChange("category", value)}
      />
      
      <div className="flexStart w-full">
        <button>Create Project</button>
      </div>
    </form>
  )
}

export default ProjectForm