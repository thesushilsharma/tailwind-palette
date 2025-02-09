import Color from "colorjs.io";
import dedent from "dedent";
import { z } from "zod";

const WCAG_THRESHOLD = 2.3;

// Define ThemeVariant and ThemeOptions with Zod validation
const ThemeVariantSchema = z.enum(["tint", "vibrant", "professional"]);
const AppearanceModeSchema = z.enum(["dark", "light"]);
const ThemeOptionsSchema = z.object({
  primary: z.string().min(1, "Primary color cannot be empty"),
  radius: z.number().positive("Radius must be a positive number"),
  variant: ThemeVariantSchema.default("professional"),
  appearance: z.enum(["light", "dark"]).optional(),
});

// TypeScript Types
type ThemeVariant = z.infer<typeof ThemeVariantSchema>;
type ThemeOptions = z.infer<typeof ThemeOptionsSchema>;
type CssVars = Record<string, string>;

const getForegroundColor = (
  background: Color,
  _light?: Color,
  _dark?: Color
): Color => {
  const lightColor =
    _light ?? background.mix("white", 0.97, { space: "oklch" });
  const darkColor = _dark ?? background.mix("black", 0.7, { space: "oklch" });
  return background.contrast(lightColor, "WCAG21") > WCAG_THRESHOLD
    ? lightColor
    : darkColor;
};

const toShadCn = (color: Color): string => {
  const [hue, saturation, lightness] = color.to("hsl").coords;
  console.log("toShadCn Output:", { hue, saturation, lightness });
  return `${Math.round(hue)} ${Math.round(saturation)}% ${Math.round(
    lightness
  )}%`;
};

const createCssVarsString = (vars: CssVars): string => {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
};

const createCssString = ({
  lightVars,
  darkVars,
}: {
  lightVars: CssVars;
  darkVars: CssVars;
}): string => {
  return dedent`
    :root {
      ${createCssVarsString(lightVars)}
    }
    
    .dark {
      ${createCssVarsString(darkVars)}
    }
  `;
};

const validateThemeOptions = (options: ThemeOptions) => {
  return {
    ...options,
    variant: ThemeVariantSchema.parse(options.variant),
    appearance: AppearanceModeSchema.parse(options.appearance),
  };
};

const createTheme = (options: ThemeOptions): string => {
  // Validate input with Zod
  const validatedOptions = validateThemeOptions(options);
  const { primary, radius, variant } = validatedOptions;

  const color = new Color(primary);
  let lightVars: CssVars, darkVars: CssVars;

  if (variant === "tint") {
    const lightBg = new Color(color).set("oklch.l", 0.98).set("oklch.c", 0.01);
    const darkBg = new Color(color).set("oklch.l", 0.2).set("oklch.c", 0.02);
    const lightPrimary = new Color(color).set("oklch.l", 0.5);
    const darkPrimary = new Color(color).set("oklch.l", 0.7);
    const lightAccent = new Color(color)
      .set("oklch.l", 0.94)
      .set("oklch.c", 0.05);
    const darkAccent = new Color(color)
      .set("oklch.l", 0.3)
      .set("oklch.c", 0.08);
    const lightBorder = new Color(color)
      .set("oklch.l", 0.9)
      .set("oklch.c", 0.05);
    const darkBorder = new Color(color)
      .set("oklch.l", 0.3)
      .set("oklch.c", 0.08);
    const lightFg = new Color(color).set("oklch.l", 0.1).set("oklch.c", 0.1);
    const darkFg = new Color(color).set("oklch.l", 0.9).set("oklch.c", 0.05);
    lightVars = {
      "--background": toShadCn(lightBg),
      "--foreground": toShadCn(lightFg),
      "--muted": toShadCn(lightBorder),
      "--muted-foreground": toShadCn(lightFg),
      "--popover": toShadCn(lightBg),
      "--popover-foreground": toShadCn(lightFg),
      "--card": toShadCn(lightBg),
      "--card-foreground": toShadCn(lightFg),
      "--border": toShadCn(lightBorder),
      "--input": toShadCn(lightBorder),
      "--primary": toShadCn(lightPrimary),
      "--primary-foreground": toShadCn(getForegroundColor(lightPrimary)),
      "--secondary": toShadCn(lightAccent),
      "--secondary-foreground": toShadCn(lightFg),
      "--accent": toShadCn(lightAccent),
      "--accent-foreground": toShadCn(lightFg),
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "60 9.1% 97.8%",
      "--ring": toShadCn(lightPrimary),
      "--radius": `${radius}rem`,
    };
    darkVars = {
      "--background": toShadCn(darkBg),
      "--foreground": toShadCn(darkFg),
      "--muted": toShadCn(darkBorder),
      "--muted-foreground": toShadCn(darkFg),
      "--popover": toShadCn(darkBg),
      "--popover-foreground": toShadCn(darkFg),
      "--card": toShadCn(darkBg),
      "--card-foreground": toShadCn(darkFg),
      "--border": toShadCn(darkBorder),
      "--input": toShadCn(darkBorder),
      "--primary": toShadCn(darkPrimary),
      "--primary-foreground": toShadCn(getForegroundColor(darkPrimary)),
      "--secondary": toShadCn(darkAccent),
      "--secondary-foreground": toShadCn(darkFg),
      "--accent": toShadCn(darkAccent),
      "--accent-foreground": toShadCn(darkFg),
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "0 0% 98%",
      "--ring": toShadCn(darkPrimary),
      "--radius": `${radius}rem`,
    };
  } else if (variant === "vibrant") {
    const lightBg = new Color(color).set("oklch.l", 0.8).set("oklch.c", 0.1);
    const lightElementBg = new Color(color)
      .set("oklch.l", 0.98)
      .set("oklch.c", 0.05);
    const lightPrimary = new Color(color)
      .set("oklch.l", 0.7)
      .set("oklch.c", 0.2);
    const lightAccent = new Color(color)
      .set("oklch.l", 0.85)
      .set("oklch.c", 0.1);
    const lightBorder = new Color(color)
      .set("oklch.l", 0.7)
      .set("oklch.c", 0.15);
    const lightFg = new Color(color).set("oklch.l", 0.2).set("oklch.c", 0.15);
    const darkBg = new Color(color).set("oklch.l", 0.05).set("oklch.c", 0.15);
    const darkElementBg = new Color(color)
      .set("oklch.l", 0.2)
      .set("oklch.c", 0.08);
    const darkPrimary = new Color(color)
      .set("oklch.l", 0.6)
      .set("oklch.c", 0.2);
    const darkAccent = new Color(color)
      .set("oklch.l", 0.4)
      .set("oklch.c", 0.15);
    const darkBorder = new Color(color)
      .set("oklch.l", 0.4)
      .set("oklch.c", 0.15);
    const darkFg = new Color(color).set("oklch.l", 0.95).set("oklch.c", 0.15);
    lightVars = {
      "--background": toShadCn(lightBg),
      "--foreground": toShadCn(lightFg),
      "--muted": toShadCn(lightBorder),
      "--muted-foreground": toShadCn(lightFg),
      "--popover": toShadCn(lightElementBg),
      "--popover-foreground": toShadCn(lightFg),
      "--card": toShadCn(lightElementBg),
      "--card-foreground": toShadCn(lightFg),
      "--border": toShadCn(lightBorder),
      "--input": toShadCn(lightBorder),
      "--primary": toShadCn(lightPrimary),
      "--primary-foreground": toShadCn(getForegroundColor(lightPrimary)),
      "--secondary": toShadCn(lightAccent),
      "--secondary-foreground": toShadCn(lightFg),
      "--accent": toShadCn(lightAccent),
      "--accent-foreground": toShadCn(lightFg),
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "60 9.1% 97.8%",
      "--ring": toShadCn(lightPrimary),
      "--radius": `${radius}rem`,
    };
    darkVars = {
      "--background": toShadCn(darkBg),
      "--foreground": toShadCn(darkFg),
      "--muted": toShadCn(darkBorder),
      "--muted-foreground": toShadCn(darkFg),
      "--popover": toShadCn(darkElementBg),
      "--popover-foreground": toShadCn(darkFg),
      "--card": toShadCn(darkElementBg),
      "--card-foreground": toShadCn(darkFg),
      "--border": toShadCn(darkBorder),
      "--input": toShadCn(darkBorder),
      "--primary": toShadCn(darkPrimary),
      "--primary-foreground": toShadCn(getForegroundColor(darkPrimary)),
      "--secondary": toShadCn(darkAccent),
      "--secondary-foreground": toShadCn(darkFg),
      "--accent": toShadCn(darkAccent),
      "--accent-foreground": toShadCn(darkFg),
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "0 0% 98%",
      "--ring": toShadCn(darkPrimary),
      "--radius": `${radius}rem`,
    };
  } else {
    darkVars = {
      "--background": "240 10% 3.9%",
      "--foreground": "0 0% 98%",
      "--muted": "240 3.7% 15.9%",
      "--muted-foreground": "240 5% 64.9%",
      "--popover": "240 10% 3.9%",
      "--popover-foreground": "0 0% 98%",
      "--card": "240 10% 3.9%",
      "--card-foreground": "0 0% 98%",
      "--border": "240 3.7% 15.9%",
      "--input": "240 3.7% 15.9%",
      "--primary": toShadCn(color),
      "--primary-foreground": toShadCn(getForegroundColor(color)),
      "--secondary": "240 3.7% 15.9%",
      "--secondary-foreground": "0 0% 98%",
      "--accent": "240 3.7% 15.9%",
      "--accent-foreground": "0 0% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "0 0% 98%",
      "--ring": "240 4.9% 83.9%",
      "--radius": `${radius}rem`,
    };
    lightVars = {
      "--background": "0 0% 100%",
      "--foreground": "20 14.3% 4.1%",
      "--muted": "60 4.8% 95.9%",
      "--muted-foreground": "25 5.3% 44.7%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "20 14.3% 4.1%",
      "--card": "0 0% 100%",
      "--card-foreground": "20 14.3% 4.1%",
      "--border": "20 5.9% 90%",
      "--input": "20 5.9% 90%",
      "--primary": toShadCn(color),
      "--primary-foreground": toShadCn(getForegroundColor(color)),
      "--secondary": "60 4.8% 95.9%",
      "--secondary-foreground": "24 9.8% 10%",
      "--accent": "60 4.8% 95.9%",
      "--accent-foreground": "24 9.8% 10%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "60 9.1% 97.8%",
      "--ring": "20 14.3% 4.1%",
      "--radius": `${radius}rem`,
    };
  }

  return createCssString({ lightVars, darkVars });
};

export default createTheme;
