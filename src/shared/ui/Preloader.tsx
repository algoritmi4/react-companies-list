import { ReactElement } from "react";

export function Preloader(): ReactElement {
  return (
    <div className="w-12 h-12 border-[5px] border-solid border-black border-b-transparent rounded-[50%] animate-spin"></div>
  )
}
