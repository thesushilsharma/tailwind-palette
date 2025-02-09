"use client";

import createTheme from "@/lib/colorGenerate";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Define props type
interface ThemeCustomizerProps {
  primary: string;
  radius: number;
  variant: "tint" | "vibrant" | "professional";
  appearance: "light" | "dark";
  setPrimary: (value: string) => void;
  setRadius: (value: number) => void;
  setVariant: (value: "tint" | "vibrant" | "professional") => void;
  setAppearance: (value: "light" | "dark") => void;
}

const ThemeCustomizer = ({
  primary,
  radius,
  variant,
  appearance,
  setPrimary,
  setRadius,
  setVariant,
  setAppearance,
}: ThemeCustomizerProps) => {
  const [themeStyles, setThemeStyles] = useState<string>("");

  useEffect(() => {
    const theme = createTheme({ primary, radius, variant, appearance });
    setThemeStyles(theme);
    document.documentElement.setAttribute("data-theme", appearance);
  }, [primary, radius, variant, appearance]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(themeStyles);
      alert("Theme CSS copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="p-6 bg-background text-foreground rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold">Customize Your Theme</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Theme Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Primary Color Input */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Primary Color</label>
              <Input
                type="color"
                value={primary}
                onChange={(e) => setPrimary(e.target.value)}
                className="w-20 border border-border"
              />
            </div>

            {/* Border Radius Slider */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Border Radius: {radius}rem</label>
              <Slider
                min={0}
                max={2}
                step={0.1}
                value={[radius]}
                onValueChange={(val) => setRadius(val[0])}
                className="text-muted-foreground"
              />
            </div>

            {/* Variant Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Variant</label>
              <Select value={variant} onValueChange={(value: "tint" | "vibrant" | "professional") => setVariant(value)}>
                <SelectTrigger className="border border-border">
                  <SelectValue placeholder="Select Variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="tint">Tint</SelectItem>
                  <SelectItem value="vibrant">Vibrant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Appearance Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Appearance</label>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Dark Mode</label>
                <Switch
                  checked={appearance === "dark"}
                  onCheckedChange={(checked) => setAppearance(checked ? "dark" : "light")}
                />
              </div>
            </div>

            <Button onClick={handleCopy} className="w-full bg-primary text-primary-foreground border border-border">
              Copy Theme CSS
            </Button>
          </CardContent>
        </Card>

        {/* Live Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-4 border border-border rounded-lg bg-muted">
            <p className="text-lg text-muted-foreground">This is a live preview of your theme.</p>
            <Button className="mt-2 bg-primary text-primary-foreground">Primary Button</Button>
            <Button className="mt-2 bg-secondary text-secondary-foreground">Secondary Button</Button>
            <Button className="mt-2 bg-accent text-accent-foreground">Accent Button</Button>
            <Button className="mt-2 bg-destructive text-destructive-foreground">Destructive Button</Button>
          </CardContent>
        </Card>
      </div>

      {/* Inject CSS Styles */}
      <style dangerouslySetInnerHTML={{ __html: themeStyles }} />
    </div>
  );
};

export default ThemeCustomizer;
