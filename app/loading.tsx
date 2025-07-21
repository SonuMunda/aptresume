import { Skeleton } from "@mui/material";

export default function Loading() {
  return (
    <div className="h-screen w-full">
      <Skeleton variant="rectangular" width={"100%"} height={"100vh"} />
    </div>
  );
}
