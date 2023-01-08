import React, { useReducer, useState } from "react";
import { TypeOf } from "zod";

const CreateProduct = () => {
  // Image Upload
  const [file, setFile] = useState<File | undefined>(undefined);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    setFile(e.target.files?.[0]);
  };
  const uploadImage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!file) return;
    console.log("hhhh");
  };
  // Form
  const initialForm = {
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: "",
  };
  function formReducer(
    state: typeof initialForm,
    action: { input: string; value: string | number }
  ) {
    return { ...state, [action.input]: action.value };
  }
  const [state, dispatch] = useReducer(formReducer, initialForm);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const action = {
      input: e.target.name,
      value: e.target.value,
    };
    dispatch(action);
  }

  return (
    <div>
      <div className="mx-auto flex w-1/5 flex-col space-y-4">
        <h1>Create Product</h1>
        <input
          className="rounded-md border-2 border-black px-1 py-1"
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <input
          className="rounded-md border-2 border-black px-1 py-1"
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />
        <button className="white-btn" onClick={() => console.log(state)}>
          Click me
        </button>
        <button className="white-btn" onClick={uploadImage}>
          Upload Image
        </button>
      </div>
    </div>
  );
};

export default CreateProduct;
