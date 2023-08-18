import "@emotion/react";
import { Theme as LocalTheme } from "../styles/theme";

declare module "@emotion/react" {
  export interface Theme extends LocalTheme {}
}
