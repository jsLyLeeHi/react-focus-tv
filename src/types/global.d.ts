import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    focusable?: string;
  }
}
