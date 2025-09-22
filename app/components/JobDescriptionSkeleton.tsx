import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

const JobDescriptionSkeleton = () => {
  return (
    <Box component={"div"}  className='skeleton w-full p-8 border-2 border-gray-300 rounded'>
      <Stack spacing={2}>
        {/* Title */}
        <Skeleton variant="text" width="60%" height={40} />
        
        {/* Company and Location */}
        <Stack direction="row" spacing={2}>
          <Skeleton variant="text" width="30%" height={30} />
          <Skeleton variant="text" width="20%" height={30} />
        </Stack>
        
        {/* Description */}
        <Skeleton variant="rectangular" height={100} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="90%" />
        
        {/* Additional Details */}
        <Stack spacing={1}>
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="text" width="50%" height={30} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default JobDescriptionSkeleton;