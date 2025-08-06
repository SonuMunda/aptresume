import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

const JobCardSkeleton = () => {
  return (
    <Box component={"div"} className="max-w-7xl p-4 mx-auto">
      <Box
        component={"div"}
        className="skeleton w-full xl:Ww-1/2 p-8 border-2 border-gray-300 rounded-2xl"
      >
        <Stack spacing={1}>
          {/* Icon and Title */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="50%" height={30} />
          </Stack>

          {/* Company and Link */}
          <Skeleton variant="text" width="70%" height={20} />
          <Skeleton
            variant="text"
            width="60%"
            height={20}
            sx={{ color: "primary.main" }}
          />

          {/* Location, Job Type, and Date */}
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Skeleton
              variant="rectangular"
              width={60}
              height={30}
              sx={{ borderRadius: 15 }}
            />
            <Skeleton
              variant="rectangular"
              width={80}
              height={30}
              sx={{ borderRadius: 15 }}
            />
            <Skeleton
              variant="rectangular"
              width={70}
              height={30}
              sx={{ borderRadius: 15 }}
            />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default JobCardSkeleton;
