import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  isPremium: boolean;
  children: React.ReactNode;
}

const PremiumRoute: React.FC<Props> = ({ isPremium, children }) => {
  return isPremium ? <>{children}</> : <Navigate to="/" replace />;
};

export default PremiumRoute;
