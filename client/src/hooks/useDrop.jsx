import React from 'react'
import { useState } from 'react';

export function useDropArtwork() {
  const [artwork, setArtwork] = useState(null);
  const [artworkPreview, setArtworkPreview] = useState(null);
  const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setArtwork(e.dataTransfer.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setArtworkPreview(fileobj);
    });
  };

  const handleImageReader = (e) => {
    const file = e.target.files[0];
    setArtwork(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      let fileobj = {
        name: file.name,
        type: file.type,
        size: file.size,
        src: reader.result,
      };
      setArtworkPreview(fileobj);
    });
  };

  return {artwork,artworkPreview,fileDrop,handleImageReader}
}
