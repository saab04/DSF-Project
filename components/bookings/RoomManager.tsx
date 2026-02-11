"use client";

import { useEffect, useState } from "react";

interface Props {
  roomType: string;
  icon: any;
  remove: any;
  add: any;
  removeFunction: any;
  count: any;
  countBooked: any;
  addFunction: any;
}

const RoomManager = ({
  roomType,
  icon,
  remove,
  add,
  removeFunction,
  count,
  countBooked,
  addFunction,
}: Props) => {
  const [available, setAvailable] = useState(count);
  return (
    <div className="sm:w-[70%] w-[90%] sm:min-w-125 min-h-30 bg-foreground shadow rounded-md mb-5 flex flex-wrap">
      <div className="sm:w-[50%] w-full min-w-62.5 min-h-30 flex justify-center items-center">
        <div className="h-full flex justify-center items-center aspect-square">
          {icon}
        </div>
        <div className="w-[70%] text-[20px] flex justify-center items-center">
          {roomType}
        </div>
      </div>
      <div className="sm:w-[50%] w-full min-w-62.5 min-h-30 flex relative">
        <div className="flex-1 flex justify-end items-center">
          <button
            className="w-15 h-15 text-[80px] flex justify-center items-center bg-buttons hover:bg-buttonsHover cursor-pointer transition rounded-xl duration-200 active:scale-95"
            onClick={async () => {
              const error = await removeFunction(roomType);
              if (error) {
                alert(error);
                return;
              }
              setAvailable((prev: number) =>
                prev > countBooked ? prev - 1 : prev,
              );
            }}
          >
            {remove}
          </button>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <p className="absolute top-2">Available</p>
          <p className="text-[20px]">{available}</p>
        </div>
        <div className="flex-1 flex justify-start items-center">
          <button
            className="w-15 h-15 text-[80px] flex justify-center items-center bg-buttons hover:bg-buttonsHover cursor-pointer transition rounded-xl duration-200 active:scale-95"
            onClick={async () => {
              const error = await addFunction(roomType);
              if (error) {
                alert(error);
                return;
              }
              setAvailable((prev: number) => prev + 1);
            }}
          >
            {add}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomManager;
