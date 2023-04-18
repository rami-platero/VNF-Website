import React from "react";

export const useMultiFields = (initialForm) => {
  const [inputs, setInputs] = useState(initialForm);

  const addMainInput = (index, e) => {
    e.preventDefault();
    setInputs([...inputs, initialForm]);
  };

  const handleMainInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputs];
    list[index][name] = value;
    setInputs(list);
  };

  const removeMainInput = (index, e) => {
    e.preventDefault();
    setInputs(
      inputs.filter((input, idx) => {
        return idx !== index;
      })
    );
  };

  const addSingleInput = (mainIndex, e, name, keyName) => {
    e.preventDefault();
    const code = JSON.parse(
      `{${name}: [...input.${name}, { ${keyName}: "" }]}`
    );
    setInputs(
      inputs.map((input, index) => {
        if (index === mainIndex) {
          return {
            ...input,
            ...code,
          };
        } else {
          return input;
        }
      })
    );
  };

  /* const removeArtist = (mainIndex, index, name) => {
    const code =
      JSON.parse(``);
    setInputs(
      inputs.map((input, idx) => {
        if (idx === mainIndex) {
          return {
            ...input,
            artists: input.`${name}`.filter((artist, indexAr) => {
              return indexAr !== index;
            }), 
          };
        } else {
          return input;
        }
      })
    );
  }; */

  const handleArtistChange = (e, trackIndex, artistIndex) => {
    const { value } = e.target;
    setTracks(
      tracks.map((track, index) => {
        if (index === trackIndex) {
          return {
            ...track,
            artists: track.artists.map((artist, indexArt) => {
              if (indexArt === artistIndex) {
                return { name: value };
              } else {
                return artist;
              }
            }),
          };
        } else {
          return track;
        }
      })
    );
  };

  return;
};
