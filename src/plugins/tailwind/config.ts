import resolveConfig from "tailwindcss/resolveConfig"
import { ThemeConfig } from "tailwindcss/types/config"

import tailwindConfig from "../../../tailwind.config"

const fullConfig = resolveConfig(tailwindConfig)

export const tailwindTheme =
  fullConfig.theme as unknown as Required<ThemeConfig> & {
    colors: ThemeConfig["colors"]
    screens: ThemeConfig["screens"]
  }

type TWBreakpoints = {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

export const breakpoints = Object.fromEntries(
  Object.entries(tailwindTheme?.screens || {})
    .reverse()
    .map(([name, _value], idx, screensArray) => {
      const currentValue = idx === 0 ? { max: "0px" } : screensArray[idx - 1][1]
      return [name, currentValue]
    })
    .map(([name, value]) => {
      return [
        name,
        Number(
          value.max
            ? Math.round(Number(value.max.slice(0, -2)))
            : value.slice(0, -2)
        ),
      ]
    })
) as TWBreakpoints
