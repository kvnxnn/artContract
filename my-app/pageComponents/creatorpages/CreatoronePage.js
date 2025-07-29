import React from "react";
import { useState } from "react";
import { useStateContext } from "@/context";
import { checkIfImage } from "@/constants";
import { ethers } from "ethers";
import Loader from "../components/Loader";
import Router from "next/router";
const CreatoronePage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = e => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setImageUrl(""); // Clear image URL input
  };

  const handleUrlChange = e => {
    setImageUrl(e.target.value);
    setImagePreview(e.target.value);
    setImageFile(null); // Clear file input
  };

  const {
    address,
    disconnectWallet,
    contract,
    loading,
    connectWallet,
    handleListArt
  } = useStateContext();

  const [form, setForm] = useState({
    artTitle: "",
    artImage: "",
    artDescription: "",
    artPrice: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    checkIfImage(form.artImage, async exists => {
      if (exists) {
        setSubmitting(true); // Start loading state
        try {
          await handleListArt({
            ...form,
            artPrice: ethers.utils.parseUnits(form.artPrice, 18)
          });
          // Reset form fields after successful submission
          setForm({
            artTitle: "",
            artImage: "",
            artDescription: "",
            artPrice: ""
          });
          // Reload to the profile page of the address that listed the art
          Router.push(`/`);
        } catch (error) {
          console.error("Error listing art:", error);
        } finally {
          setSubmitting(false); // Stop loading state
        }
      } else {
        alert("Please provide a valid image URL");
        setSubmitting(false);
        setForm({ ...form, artImage: "" });
      }
    });
  };

  return (
    <div className={`create ${submitting ? "createBlur" : ""}`}>
      {submitting && <Loader />}
      <form onSubmit={handleSubmit} className="createContainer">
        <div className="imageUpload">
          <div className="uploadArt">
            <label htmlFor="imageUpload">Upload art:</label>
            <input type="file" id="imageUpload" onChange={handleFileChange} />

            {imagePreview && (
              <div className="imagePreview">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
              </div>
            )}
          </div>

          <div className="uploadUrl">
            <label htmlFor="imageUrl">or Enter art URL:</label>
            <input
              type="text"
              id="imageUrl"
              onChange={e => handleFormFieldChange("artImage", e)}
            />
          </div>
        </div>

        {/* image upload ends */}

        <div className="artdetailsContainer">
          <div className="titleUpload">
            <label className="title" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              onChange={e => handleFormFieldChange("artTitle", e)}
              required
            />
          </div>

          <div className="descriptionUpload">
            <label className="title" htmlFor="description">
              Description:
            </label>
            <textarea
              cols="30"
              rows="5"
              id="description"
              onChange={e => handleFormFieldChange("artDescription", e)}
              required
            />
          </div>

          <div className="priceUpload">
            <label className="title" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              id="price"
              step="any"
              onChange={e => handleFormFieldChange("artPrice", e)}
              required
            />
          </div>
        </div>

        <button className="submitBtn" type="submit" disabled={submitting}>
          + Create
        </button>
      </form>
    </div>
  );
};

export default CreatoronePage;
