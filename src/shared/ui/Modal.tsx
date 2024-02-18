import { ReactElement } from "react";
import { useAppDispatch } from "../model/hooks";
import { setIsCompanyPopupClose } from "@/features/AddCompanyPopup/model/addCompanyPopupSlice";
import { setIsEmployeePopupClose } from "@/features/AddEmployeePopup/model/addEmployeePopupSlice";

interface IModal {
  children: ReactElement;
}

export function Modal({ children }: IModal): ReactElement {
  const dispatch = useAppDispatch();

  function handleClose() {
    dispatch(setIsCompanyPopupClose());
    dispatch(setIsEmployeePopupClose());
  }

  return (
    <div className={`fixed inset-y-0 inset-x-0 flex flex-col items-center justify-center z-20 duration-300 box-border`}>
      <span className="absolute inset-y-0 inset-x-0 z-10 bg-black opacity-50" onClick={handleClose}></span>
      <div className="z-20 relative mx-auto">
        <button type="button" onClick={handleClose} className="absolute border-none bg-cross bg-transparent bg-no-repeat bg-cover bg-center w-11 h-11 cursor-pointer top-[-42px] right-[-42px] hover:opacity-70 duration-100"></button>
        {children}
      </div>
    </div>
  )
}
