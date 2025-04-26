import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateActorPage";
import ActorDetails from "../components/actorDetails";

const ActorDetailsPage: React.FC = () => {
  const { state: { actor } } = useLocation();

  return (
    <PageTemplate actor={actor}>
      <ActorDetails {...actor} />
    </PageTemplate>
  );
};

export default ActorDetailsPage;
