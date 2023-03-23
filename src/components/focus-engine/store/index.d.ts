import { TypeKeyCode } from "../key_iptv";

export namespace TypeFocusStore {
  interface TypeDefStoreData {
    id: string,
    keyCode: TypeKeyCode,
  }
  interface TypeWidgetParams {
    id: string,
    rightGo: string[]
  }
}