"use client";

import { RootState } from "@/store/store";
import { Email, GitHub, Language, LinkedIn, Phone } from "@mui/icons-material";
import {
  Lato,
  Montserrat,
  Nunito,
  Open_Sans,
  Raleway,
  Roboto,
} from "next/font/google";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  style: ["normal", "italic"],
});
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
});

const MattysResume = () => {
  const { fullname, headline, phone, email, portfolio } = useSelector(
    (state: RootState) => state.basics
  );

  const { data: summary, visible } = useSelector(
    (state: RootState) => state?.summary
  );
  const profiles = useSelector((state: RootState) => state.profiles.data);
  const education = useSelector((state: RootState) => state.education.data);
  const { data: experience, visible: isExperienceVisible } = useSelector(
    (state: RootState) => state.experience
  );
  const projects = useSelector((state: RootState) => state.projects.data);
  const { data: achievements, visible: isAchievementsVisible } = useSelector(
    (state: RootState) => state.achievements
  );
  const { data: certifications, visible: isCertificationsVisible } =
    useSelector((state: RootState) => state.certifications);
  const skills = useSelector((state: RootState) => state.skills.data);
  const hobbies = useSelector((state: RootState) => state.hobbies.data);
  const languages = useSelector((state: RootState) => state.languages.data);

  const format = useSelector((state: RootState) => state.format.data);

  const getProfile = (network: string) => {
    const profile = profiles.find(
      (profile) => profile.network.toLowerCase() === network
    );
    return profile;
  };

  const githubProfile = getProfile("github");
  const linkedInProfile = getProfile("linkedin");

  return (
    <div
      className={`mattys-resume ${lato.className} ${montserrat.className} ${nunito.className} ${openSans.className} ${raleway.className} ${roboto.className}`}
      style={{
        backgroundColor: format.backgroundColor,
        fontFamily: `${format.font}, sans-serif`,
        lineHeight: format.lineHeight,
        fontSize: format.fontSize,
        color: format.textColor,
        minHeight: "297mm",
        minWidth: "210mm",
      }}
    >
      <div
        className="flex flex-col gap-4"
        style={{
          padding: format.pageMargin,
        }}
      >
        {/* Basic Info */}
        <div className="basic-info text-center">
          <h1
            className={`font-bold`}
            style={{
              fontSize: format.fontSize + 24,
              lineHeight: 1,
            }}
          >
            {fullname}
          </h1>
          <p
            style={{
              fontSize: format.fontSize + 4,
            }}
          >
            {headline}
          </p>
          <div className="contacts-info flex flex-wrap justify-center gap-4  mt-1">
            {githubProfile && (
              <span className="github flex items-center gap-1">
                <GitHub
                  sx={{
                    fontSize: format.fontSize,
                  }}
                />
                <Link
                  href={githubProfile.url}
                  target="_blank"
                  className="hover:underline"
                >
                  {githubProfile.url}
                </Link>
              </span>
            )}
            {linkedInProfile && (
              <span className="github flex items-center gap-1">
                <LinkedIn
                  sx={{
                    fontSize: format.fontSize,
                  }}
                />
                <Link
                  href={linkedInProfile.url}
                  target="_blank"
                  className="hover:underline"
                >
                  {linkedInProfile.url}
                </Link>
              </span>
            )}
            {portfolio && (
              <span className="website flex items-center gap-1">
                <Language
                  sx={{
                    fontSize: format.fontSize,
                  }}
                />
                <Link href={portfolio} className="hover:underline">
                  {portfolio}
                </Link>
              </span>
            )}
            {email && (
              <span className="email flex items-center gap-1">
                <Email
                  sx={{
                    fontSize: format.fontSize,
                  }}
                />
                {email}
              </span>
            )}
            {phone && (
              <span className="phone flex items-center gap-1">
                <Phone
                  sx={{
                    fontSize: format.fontSize,
                  }}
                />
                {phone}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className={`summary ${visible ? "block" : "hidden"}`}>
          <h2 className="uppercase border-b mb-1">Summary</h2>
          <p>{summary}</p>
        </div>

        {/* Profiles */}
        {/* <div className="profiles">
          <h2 className="uppercase border-b mb-1">Profiles</h2>
          {profiles.map((profile, index) => {
            return (
              <div className="profiles-details space-y-1" key={index}>
                <div className="flex items-center gap-4">
                  <h3 className="font-bold">{profile.network}:</h3>
                  <Link
                    href={profile.url}
                    className="hover:underline"
                  >
                    {profile.url}
                  </Link>
                </div>
              </div>
            );
          })}
        </div> */}

        {/* Education */}
        <div className="education">
          <h2 className="uppercase border-b mb-1">Education</h2>
          {education.map((edu, index) => {
            return (
              <div className="education-details space-y-1" key={index}>
                <div className="flex justify-between">
                  <h3 className=" font-medium">
                    {edu.institute} - {edu.area}
                  </h3>
                  <span className="">{edu.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="">{edu.type}</span>
                  <span className="">{edu.score}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Skills */}
        <div className="skills">
          <h2 className="uppercase border-b mb-1">Technical Skills</h2>
          {skills.map((skill, index) => {
            return (
              <div
                key={index}
                className="skill flex flex-wrap items-center gap-1"
              >
                <h6 className="font-bold">{skill.title}</h6>:
                <p>{skill.keywords}</p>
              </div>
            );
          })}
        </div>

        {/* Experience */}
        <div
          className={`experience ${isExperienceVisible ? "block" : "hidden"}`}
        >
          <h2 className="uppercase border-b mb-1">Experience</h2>
          <div className="flex flex-col gap-2">
            {experience.map((exp, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.position}</h3>
                    <h3 className="font-medium">{exp.date}</h3>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="">{exp.company}</h3>
                    <span className="">{exp.location}</span>
                  </div>
                  <div
                    className=" ms-4"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Projects */}
        <div className="projects">
          <h2 className="uppercase border-b mb-1">Projects</h2>
          <div className="projects-info">
            {projects.map((proj, index) => {
              return (
                <div className="project-info" key={index}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-2">
                      <h6 className="font-bold">{proj.title}</h6>|
                      <p>{proj.keywords}</p>
                    </div>
                    <Link
                      href={proj.link}
                      className="text-blue-700 hover:underline"
                    >
                      {proj.link}
                    </Link>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: proj.description }}
                    className="px-4"
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div
          className={`achievements ${
            isAchievementsVisible ? "block" : "hidden"
          }`}
        >
          <h2 className="uppercase border-b mb-1">Achievements</h2>
          <div className="flex flex-col gap-2">
            {achievements.map((ach, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{ach.title}</h3>
                    <h3 className="font-bold">{ach.awarder}</h3>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="">{ach.position}</h3>
                    <span className="">{ach.date}</span>
                  </div>
                  <div
                    className="ms-4"
                    dangerouslySetInnerHTML={{ __html: ach.description }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div
          className={`certifications ${
            isCertificationsVisible ? "block" : "hidden"
          }`}
        >
          <h2 className=" uppercase border-b mb-1">Certifications</h2>
          <div className="flex flex-col gap-2">
            {certifications.map((cert, index) => {
              return (
                <div className="flex flex-col" key={index}>
                  <div className="flex justify-between">
                    <h3 className="font-bold">{cert.title}</h3>
                    <h3 className="font-bold">{cert.issuer}</h3>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="">{cert.date}</h3>
                    <span className="">{cert.link}</span>
                  </div>
                  <div
                    className=" ms-4"
                    dangerouslySetInnerHTML={{ __html: cert.description }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Languages */}
        <div className="languages">
          <h2 className="uppercase border-b mb-1">Languages</h2>
          <div className="languages flex flex-wrap items-center gap-10">
            {languages.map((lang, index) => {
              return (
                <p className="hobby-name" key={index}>
                  {lang.title}
                </p>
              );
            })}
          </div>
        </div>

        {/* Hobbies */}
        <div className="hobbies">
          <h2 className="uppercase  border-b mb-1">Hobbies</h2>
          <div className="hobby flex flex-wrap items-center gap-10">
            {hobbies.map((hobby, index) => {
              return (
                <p className="hobby-name" key={index}>
                  {hobby.title}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MattysResume;
