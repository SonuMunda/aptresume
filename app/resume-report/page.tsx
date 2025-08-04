"use client";

import React, { useEffect, useState } from "react";
import { ATSReport } from "@/types/atsReportTypes";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import AtsResultSidebar from "../components/ats/AtsResultSidebar";
import AtsContent from "../components/ats/AtsContent";
import AtsResultBottomBar from "../components/ats/AtsResultBottomBar";
import AtsReportHeader from "../components/ats/AtsReportHeader";
import { useSearchParams } from "next/navigation";
import { getResumeAtsReport } from "../utils/getResumeAtsReport";
import { getResume } from "../utils/getResume";
import { getParsedResume } from "../utils/getParsedResume";
import AtsResultLoader from "../components/ats/AtsResultLoader";
import ErrorComponent from "../components/ErrorComponent";
import { ApiError } from "next/dist/server/api-utils";

type ErrorProps = {
  message: string;
  status: number;
};

const ResumeReport = () => {
  const [atsReport, setAtsReport] = useState<ATSReport>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorProps | null>(null);

  const searchParms = useSearchParams();
  const id = searchParms?.get("id");

  useEffect(() => {
    const getAtsReport = async () => {
      if (id) {
        try {
          const file = await getResume(id as string);
          const parsedResume = await getParsedResume(file?.url);
          const parsedText = parsedResume.text;
          const report = await getResumeAtsReport(
            parsedText,
            file?.file_size,
            file?.file_type
          );

          setAtsReport(report);
        } catch (error: unknown) {
          let message = "Internal Server Error";
          let status = 500;
          if (error instanceof ApiError) {
            message = error.message;
            status = error.statusCode;
          }
          setError({
            message,
            status,
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError({
          message: "No resume id provided",
          status: 400,
        });
      }
    };
    getAtsReport();
  }, [id]);

  if (loading) return <AtsResultLoader />;

  return (
    <>
      <AtsReportHeader />
      <main>
        {error ? (
          <ErrorComponent
            errorStatus={error?.status}
            errorText={error?.message}
          />
        ) : (
          atsReport && (
            <Box
              component={motion.section}
              className="ats-report bg-gray-100 min-h-screen pb-24"
            >
              <Box component={motion.div} className="container max-w-7xl mx-auto sm:p-4">
                <Box
                  component={motion.div}
                  className="content flex justify-center gap-10"
                >
                  <AtsResultSidebar
                    score={atsReport.breakdown_by_category.overall_score.score}
                  />
                  <AtsContent report={atsReport} />
                  <AtsResultBottomBar />
                </Box>
              </Box>
            </Box>
          )
        )}
      </main>
    </>
  );
};

export default ResumeReport;
