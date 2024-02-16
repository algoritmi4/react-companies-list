import { ReactElement } from "react";

interface ITableHeaderProps {
  secondColumnText: string;
  thirdColumnText: string;
  fourthColumnText: string;
}

export function TableHeader({ secondColumnText, thirdColumnText, fourthColumnText }: ITableHeaderProps): ReactElement {
  return (
    <div className="w-full border-solid border-black border-2 flex">
      <div className="w-1/4 px-1 py-2 flex items-center justify-center">
        <label className="cursor-pointer" htmlFor="check">Выбрать все</label>
        <input className="w-5 h-5 ml-2 cursor-pointer" type="checkbox" id="check" />
      </div>
      <div className="w-1/4 px-1 py-2">
        <p className="text-lg">{secondColumnText}</p>
      </div>
      <div className="w-1/4 px-1 py-2">
        <p className="text-lg">{thirdColumnText}</p>
      </div>
      <div className="w-1/4 px-1 py-2">
        <p className="text-lg">{fourthColumnText}</p>
      </div>
    </div>
  )
}
