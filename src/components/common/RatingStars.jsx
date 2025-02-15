// import React, { useEffect, useState } from "react"
// import {
//   TiStarFullOutline,
//   TiStarHalfOutline,
//   TiStarOutline,
// } from "react-icons/ti"

// function RatingStars({ Review_Count, Star_Size }) {
//   const [starCount, SetStarCount] = useState({
//     full: 0,
//     half: 0,
//     empty: 0,
//   })

//   useEffect(() => {
//     const wholeStars = Math.floor(Review_Count) || 0
//     SetStarCount({
//       full: wholeStars,
//       half: Number.isInteger(Review_Count) ? 0 : 1,
//       empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
//     })
//   }, [Review_Count])
//   return (
//     <div className="flex gap-1 text-yellow-100">
//       {[...new Array(starCount.full)].map((_, i) => {
//         return <TiStarFullOutline key={i} size={Star_Size || 20} />
//       })}
//       {[...new Array(starCount.half)].map((_, i) => {
//         return <TiStarHalfOutline key={i} size={Star_Size || 20} />
//       })}
//       {[...new Array(starCount.empty)].map((_, i) => {
//         return <TiStarOutline key={i} size={Star_Size || 20} />
//       })}
//     </div>
//   )
// }

// export default RatingStars



import React, { useEffect, useState } from "react";
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti";

function RatingStars({ Review_Count, Star_Size }) {
  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 5,
  });

  useEffect(() => {
    const validReviewCount = Math.max(0, Math.min(Number(Review_Count) || 0, 5)); // Ensure it's between 0 and 5
    const wholeStars = Math.floor(validReviewCount);
    const halfStar = Number.isInteger(validReviewCount) ? 0 : 1;
    const emptyStars = Math.max(5 - (wholeStars + halfStar), 0);

    SetStarCount({
      full: wholeStars,
      half: halfStar,
      empty: emptyStars,
    });
  }, [Review_Count]);

  return (
    <div className="flex gap-1 text-yellow-100">
      {[...Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline key={`full-${i}`} size={Star_Size || 20} />
      ))}
      {[...Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline key={`half-${i}`} size={Star_Size || 20} />
      ))}
      {[...Array(starCount.empty)].map((_, i) => (
        <TiStarOutline key={`empty-${i}`} size={Star_Size || 20} />
      ))}
    </div>
  );
}

export default RatingStars;
