import SectionHeading from "@/ui/resume_builder/SectionHeading";
import { DashboardOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { templates } from "@/data/resume_builder/data";
import ResumeTemplateCard from "@/ui/resume_builder/ResumeTemplateCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setTemplate } from "@/store/slices/resume/formatSlice";

const TemplatesSection = () => {
  const { template } = useSelector((state: RootState) => state.format.data);
  const dispatch = useDispatch();
  return (
    <Box component={"div"} className="templates flex flex-col gap-6">
      {/* Heading */}
      <SectionHeading Icon={DashboardOutlined} heading="Templates" />
      {/* Previews */}
      <Box
        component={"div"}
        className="templates-previews grid grid-cols-2 gap-4"
      >
        {templates.map((item) => {
          return (
            <Box
              component={"div"}
              key={item.id}
              className={`template-card ${
                template === item.name &&
                "border-2 border-blue-700 shadow rounded"
              }`}
              onClick={() => dispatch(setTemplate(item.name))}
            >
              <ResumeTemplateCard title={item.title} url={item.url} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TemplatesSection;
