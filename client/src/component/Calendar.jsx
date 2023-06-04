import { useState } from "react";
import { DateRange, Calendar} from "react-date-range";

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';


const useCalendar = ({ selectedRange }) => {
  const selectedRanges = [
    {
      startDate: new Date(2023, 4, 1),
      endDate: new Date(2023, 4, 5),
      key: 'range1'
    },
    {
      startDate: new Date(2023, 5, 1),
      endDate: new Date(2023, 5, 5),
      key: 'range2'
    },
    // Add more ranges if needed
  ]
  ;
  const selectedRang = selectedRanges.filter(item => item.key !== "range1")
  return(
    <Calendar
      color="#3d91ff"
      date={new Date()}
      ranges={selectedRang}
      showDateDisplay={false}
      showSelectionPreview={false}
      displayMode="dateRange"
      showPreview={false}
      dragSelectionEnabled={false}
      minDate={new Date()}
      className="rounded-xl"
    />
  )
};

export default useCalendar;