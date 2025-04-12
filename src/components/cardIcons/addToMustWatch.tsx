import React from "react";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces";  // Make sure to import the correct type if needed

interface AddToMustWatchIconProps {
  movie: BaseMovieProps;  // Type for the movie prop
  addToMustWatch: (movie: BaseMovieProps) => void;  // Function to add movie to "Must Watch"
}

const AddToMustWatchIcon: React.FC<AddToMustWatchIconProps> = ({ movie, addToMustWatch }) => {
  const handleClick = () => {
    // Trigger the addToMustWatch function when the icon is clicked
    addToMustWatch(movie);
    console.log(`Movie added to Must Watch: ${movie.title}`);  // Log for debugging
  };

  return (
    <PlaylistAddIcon 
      color="primary" 
      fontSize="large" 
      onClick={handleClick}  
    />
  );
};

export default AddToMustWatchIcon;
