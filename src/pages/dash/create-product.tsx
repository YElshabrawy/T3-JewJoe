import Image from "next/image";
import React, { useReducer, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidV4 } from "uuid";
import { env } from "../../env/client.mjs";

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
);
const CreateProduct = () => {
  // Image Upload
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Used to show image in UI
    if (!e.target.files || !e.target.files[0]) {
      setImageSrc("");
      dispatch({ input: "image", value: undefined });
      return;
    }
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target) setImageSrc(onLoadEvent.target.result as string);
    };
    reader?.readAsDataURL(file as File);
    dispatch({ input: "image", value: file as File });
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(state);
    // Upload pic to supabase
    if (state.image) {
      setIsLoading(true);
      const { data, error } = await supabase.storage
        .from("images")
        .upload(uuidV4(), state.image);
      setIsLoading(false);
      if (data) {
        const imgURL =
          env.NEXT_PUBLIC_SUPABASE_URL +
          "/storage/v1/object/public/images/" +
          data.path;
        console.log("imgURL", imgURL);
        // upload to db later
      } else {
        console.log(error);
      }
    }
    // Upload entery to database
  }

  // Form
  const initialForm = {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: undefined as unknown as File,
  };

  // Control Form Inputs
  const [state, dispatch] = useReducer(formReducer, initialForm);

  function formReducer(
    state: typeof initialForm,
    action: { input: string; value: string | number | File | undefined }
  ) {
    return { ...state, [action.input]: action.value };
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const action = {
      input: e.target.name,
      value: e.target.value,
    };
    dispatch(action);
  }

  return (
    <div>
      <div className="mx-auto flex w-2/5 flex-col space-y-4">
        <h1>Create Product</h1>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <form
            className="mx-auto flex flex-col space-y-4"
            onSubmit={handleFormSubmit}
            action=""
          >
            <input
              className="rounded-md border-2 border-black px-1 py-1"
              type="text"
              name="name"
              placeholder="Product Name"
              onChange={handleChange}
              // required
            />
            <input
              className="rounded-md border-2 border-black px-1 py-1"
              type="text"
              name="description"
              placeholder="Product Description"
              onChange={handleChange}
            />
            <input
              className="rounded-md border-2 border-black px-1 py-1"
              type="number"
              step={0.01}
              name="price"
              placeholder="Price"
              // required
              onChange={handleChange}
            />
            <input
              className="rounded-md border-2 border-black px-1 py-1"
              type="number"
              name="quantity"
              placeholder="Quantity"
              // required
              onChange={handleChange}
            />
            <input
              type="file"
              name="image"
              id="image"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleImageChange}
            />
            {imageSrc != "" && (
              <Image
                alt="Product image"
                src={imageSrc}
                width="300"
                height="300"
                className="h-auto w-auto"
              />
            )}

            <button className="white-btn" type="submit">
              Create a Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
