"use client";

import ThemeCustomizer from "@/context/ThemeCustomizer";
import { useState } from "react";

const ThemeSchemaGenerator = () => {
  const [primary, setPrimary] = useState<string>("#007bff");
  const [radius, setRadius] = useState<number>(0.5);
  const [variant, setVariant] = useState<"tint" | "vibrant" | "professional">(
    "professional"
  );
  const [appearance, setAppearance] = useState<"light" | "dark">("light");

  return (
    <ThemeCustomizer
      primary={primary}
      radius={radius}
      variant={variant}
      appearance={appearance}
      setPrimary={setPrimary}
      setRadius={setRadius}
      setVariant={setVariant}
      setAppearance={setAppearance}
    />
  );
};

export default ThemeSchemaGenerator;
