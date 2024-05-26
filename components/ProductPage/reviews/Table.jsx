import { useState } from "react";
import { usePagination } from "./Pagination";
import ReviewCard from "./ReviewCard";
import { useSession } from "next-auth/react";
import { Pagination } from "@mui/material";

const Table = ({ reviews, productID }) => {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(reviews.length / PER_PAGE);
  const _DATA = usePagination(reviews, PER_PAGE);

  const handleChange = (_, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="my-2">
        {_DATA.currentData().map((review, i) => (
          <ReviewCard
            review={review}
            key={i}
            productID={productID}
            userID={session?.user?.id}
          />
        ))}
      </div>
      <div className="mt-2 ml-auto">
        <Pagination
          count={count}
          page={page}
          shape="rounded"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Table;
