import React from "react";
import { useState } from "react";

export function useDropFile() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragEnter = (e) => {
    e.preventDefault();
  };
  const dragLeave = (e) => {
    e.preventDefault();
  };

  const handleFile = (e,data) => {
    e.preventDefault();
    let file;
    if (data == "drop") {
      file = e.dataTransfer.files[0];
      setFile(e.dataTransfer.files[0]);
    } else {
      file = e.target.files[0]
      setFile(e.target.files[0])
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setFilePreview(fileobj);
    });
  };

  return {
    file,
    filePreview,
    handleFile,
    dragOver,
    dragEnter,
    dragLeave,
  };
}
