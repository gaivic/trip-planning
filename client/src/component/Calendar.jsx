import { useState } from "react";
import { Calendar } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const useCalendar = ({ posts }) => {
  // Map the post dates to range objects
  const postRanges = posts.map((post, index) => ({
    startDate: new Date(post.dates[0]),
    endDate: new Date(post.dates[1]),
    key: `postRange${index}`,
  }));

  return (
    <Calendar
      color="#3d91ff"
      date={new Date()}
      ranges={postRanges}
      showDateDisplay={false}
      showSelectionPreview={false}
      displayMode="dateRange"
      showPreview={false}
      dragSelectionEnabled={false}
      minDate={new Date()}
      className="rounded-xl"
    />
  );
};

export default useCalendar;
