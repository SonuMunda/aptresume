import {
  CalendarTodayOutlined,
  CurrencyRupeeOutlined,
  LocationOnOutlined,
  WorkOutline,
} from "@mui/icons-material";
import { Box, Button, Chip, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import Image from "next/image";
import Link from "next/link";

interface applyOptions {
  publisher: string;
  apply_link: string;
}

interface CardProps {
  id: string;
  imageUrl?: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  salary: string;
  type: string[];
  posted: string;
  applyOptions?: applyOptions[];
  setDescJobId: (id: string) => void;
}

const JobCard = ({
  id,
  imageUrl,
  title,
  company,
  companyUrl,
  location,
  type,
  posted,
  salary,
  applyOptions = [],
  setDescJobId,
}: CardProps) => {
  return (
    <Box
      component="div"
      className="job-card cursor-pointer p-5 lg:p-10 flex gap-6 border border-2 border-gray-300 rounded"
      onClick={() => setDescJobId(id)}
    >
      <Box component="div" className="card-image">
        <Image
          src={imageUrl || "/images/unknown-business-logo.png"}
          width={64}
          height={64}
          className="mx-auto"
          alt="company"
          unoptimized
        />
      </Box>
      <Box component="div" className="card-content">
        <Box component="div" className="job-title">
          <Typography variant="h4" component="h6" fontWeight={700}>
            {title}
          </Typography>
        </Box>
        <Box component="div" className="company-name">
          <Typography variant="h6" component="h6" fontWeight={600}>
            {company}
          </Typography>
        </Box>
        {companyUrl && (
          <Box component="div" className="company-name">
            <Link
              href={companyUrl}
              target="_blank"
              className="text-sm text-indigo-600 hover:underline"
            >
              {companyUrl}
            </Link>
          </Box>
        )}
        <Box component="div" className="job-details flex flex-wrap gap-4 mt-6">
          <Box component="div" className="job-location">
            <Chip
              variant="filled"
              label={location}
              icon={<LocationOnOutlined />}
            />
          </Box>
          <Box component="div" className="job-type">
            <Chip
              variant="filled"
              label={type.join(" | ")}
              icon={<WorkOutline />}
            />
          </Box>
          <Box component="div" className="date-posted">
            <Chip
              variant="filled"
              label={posted}
              icon={<CalendarTodayOutlined />}
            />
          </Box>

          {salary && (
            <Box component="div" className="job-salary">
              <Chip
                variant="filled"
                label={salary}
                icon={<CurrencyRupeeOutlined />}
              />
            </Box>
          )}
        </Box>

        {applyOptions && (
          <Box component={"div"} className="flex flex-wrap mt-6 gap-4">
            {applyOptions?.map((item, index) => {
              return (
                <Link href={item.apply_link} target="_blank" key={index}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: indigo[600],
                    }}
                  >
                    {item.publisher}
                  </Button>
                </Link>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default JobCard;
