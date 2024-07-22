import dayjs from "dayjs";
import { useState } from "react";


export const useCalendar = (now) => {
    const [selectedDate, setSelectedDate] = useState(now);
    const [isDatePickerVisible, setIsDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setIsDatePickerVisibility(true);
      }
    
      const hideDatePicker = () => {
        setIsDatePickerVisibility(false);
      }
    
      const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        setSelectedDate(dayjs(date));
        hideDatePicker();
      }
    
      const subtract1Month = () => {
        const newSelectedDate = dayjs(selectedDate).subtract(1, 'month');
        setSelectedDate(newSelectedDate);
      }
    
      const add1Month = () => {
        const newSelectedDate = dayjs(selectedDate).add(1, 'month');
        setSelectedDate(newSelectedDate);
      }

    return {
        selectedDate,
        isDatePickerVisible,
        showDatePicker,
        hideDatePicker,
        handleConfirm,
        setSelectedDate,
        subtract1Month,
        add1Month
    }
}