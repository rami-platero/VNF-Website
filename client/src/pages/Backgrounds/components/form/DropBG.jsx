import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { mainContext } from "../../../../context/SongsContext";
import "./drop-bg.css";
import { useBGForm } from "../../../../hooks/useBGForm";

function DropBG() {
  const { theme } = useContext(mainContext);
  const {dragOver,dragEnter,dragLeave,fileDrop,handleImageReader,backgroundPreview} = useBGForm()

  /* const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };
  const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(e.dataTransfer.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setBackgroundPreview(fileobj);
    });
  };

  const handleImageReader = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0])
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setBackgroundPreview(fileobj);
    });
  }; */
  return (
    <div className="drop-bg">
      <label htmlFor="background">Background</label>
      <div
        className={`drop-container-background ${theme}`}
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <h2>Drag And Drop</h2>
        {backgroundPreview != null && (
          <img
            src={backgroundPreview.src}
            alt={backgroundPreview.name}
            className="background-preview"
          />
        )}
        <input
          type="file"
          placeholder="Background"
          name="background"
          onChange={(e) => {
            handleImageReader(e);
          }}
          required
        />
      </div>
    </div>
  );
}

export default DropBG;
