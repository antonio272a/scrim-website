import React, { useContext } from 'react'
import context from '../../context/MyContext';
import trashIcon from '../../images/trash.svg';
import deafultImage from "../../images/default-avatar.png";
import resizeImage from '../../utils/resizeImg';
import { deleteLogo } from '../../supabase/utils/logoUtils';

function ImageInput() {
  const { 
    isEditing, 
    hasAvatar, 
    user, 
    oldName, 
    setHasAvatar, 
    setLogoImg, 
    setLogoUrl, 
    logoUrl 
  } = useContext(context);

  const handleDeleteLogo = async () => {
    const error = await deleteLogo(user.id, oldName);
    console.log(error);
    if (!error) {
      setLogoImg(false);
      setHasAvatar(false);
      setLogoUrl(false);
    }
  };

  const handleImageInput = async ({ target: { files } }) => {
    const image = await resizeImage(files[0]);
    const imageUrl = URL.createObjectURL(image);
    setLogoImg(image);
    setLogoUrl(imageUrl);
  };


  return (
    <section className="d-flex mb-3">
      <label htmlFor="formFileSm">
        <div style={{ position: "relative" }}>
          {(isEditing && hasAvatar) && (
            <button
              type="button"
              style={{
                position: "absolute",
                right: "0px",
                bottom: "0px",
                backgroundColor: "transparent",
                border: "none",
              }}
              onClick={handleDeleteLogo}
            >
              <img width="10px" src={trashIcon} alt="Delete Logo" />
            </button>
          )}
          <img src={logoUrl || deafultImage} alt="" width="100px" height="100px" />
        </div>
      </label>
      <input
        id="formFileSm"
        type="file"
        accept="image/*"
        onChange={handleImageInput}
        style={{ display: "none" }}
        disabled={!isEditing}
      />
    </section>
  );
}

export default ImageInput