"use client";
import { useState, useEffect, ReactElement } from "react";
import Loader from "../Loader";

export default function ClientLoading({
  children,
}: {
  children: ReactElement;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsClient(true);
    }, 1500);
  }, []);

  return isClient ? children : <Loader />;
}
