import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type DatePickerInputProps = {
  title: string;
  initSelectedDate?: Date | null;
  onChange: (date: Date) => void;
  error?: string;
};

const DatePickerInput = ({
  title,
  onChange,
  error,
  initSelectedDate = null,
}: DatePickerInputProps) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initSelectedDate,
  );

  useEffect(() => {
    if (initSelectedDate) {
      setSelectedDate(new Date(initSelectedDate));
    }
  }, [initSelectedDate]);

  return (
    <div className={"w-auto h-auto flex flex-col text-white gap-3"}>
      <label className={"ml-2 text-xl"}>{title}</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          if (date) {
            setSelectedDate(date);
            onChange(date);

            console.log(date);
          }
        }}
        maxDate={today}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        customInput={
          <motion.input
            whileFocus={{ borderColor: "#E80352" }}
            style={{ borderColor: "#292929" }}
            className={
              "w-full h-[50px] bg-gray-200 px-2 border-2 rounded-xl outline-none"
            }
          />
        }
      />
      <p className={"text-lg text-red-500 h-[25px]"}>{error && error}</p>
    </div>
  );
};

export default DatePickerInput;
