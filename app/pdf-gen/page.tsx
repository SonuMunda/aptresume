"use client";

import React, { useRef } from "react";

const PdfGen = () => {
  const resumeRef = useRef<HTMLElement>(null);
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 antialiased print:bg-white flex items-center">
      <div className="btn">
        <button className="bg-blue-500 text-white p-4">Download Pdf</button>
      </div>
      <div className="mx-auto max-w-4xl p-4">
        <section
          className="bg-white shadow-sm ring-1 ring-gray-200 rounded-2xl overflow-hidden print:shadow-none print:ring-0"
          ref={resumeRef}
        >
          {/* Header */}
          <header className="border-b border-gray-200 px-8 py-6">
            <h1 className="text-3xl font-bold tracking-tight">Suraj Kumar</h1>
            <p className="mt-1 text-lg text-gray-600">
              Full-Stack MERN Developer
            </p>

            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-600">
              <li>
                <a href="mailto:suraj@example.com" className="hover:underline">
                  suraj@example.com
                </a>
              </li>
              <li>
                <a href="tel:+919000000000" className="hover:underline">
                  +91 90000 00000
                </a>
              </li>
              <li>
                <a
                  href="https://suraj.dev"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  suraj.dev
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/suraj"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  github.com/suraj
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/suraj"
                  className="hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  linkedin.com/in/suraj
                </a>
              </li>
              <li>Patna, India</li>
            </ul>
          </header>

          {/* Body */}
          <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-3">
            {/* Left Column */}
            <aside className="lg:col-span-1 space-y-8">
              {/* Summary */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Summary
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  Full-stack developer with hands-on experience building
                  responsive, performant web apps using React, Node.js, Express,
                  and MongoDB. Focused on clean UI, DX, and pragmatic problem
                  solving.
                </p>
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Skills
                </h2>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "Prisma",
                    "REST APIs",
                    "WebSockets",
                    "Tailwind CSS",
                    "Git & GitHub",
                    "Vite",
                    "Jest",
                    "Zod",
                    "Socket.io",
                  ].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-gray-300 px-2.5 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Education
                </h2>
                <div className="mt-3 text-sm">
                  <p className="font-medium">B.Sc. in Computer Science</p>
                  <p className="text-gray-600">XYZ University · 2021 – 2024</p>
                </div>
              </section>

              {/* Highlights */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Highlights
                </h2>
                <ul className="mt-3 list-disc pl-5 text-sm space-y-1 text-gray-700">
                  <li>Deployed on Vercel & Netlify</li>
                  <li>Cloudinary for media</li>
                  <li>Auth: Email/Google (NextAuth/Prisma)</li>
                  <li>Real-time via Socket.io</li>
                </ul>
              </section>
            </aside>

            {/* Right Column */}
            <section className="lg:col-span-2 space-y-8">
              {/* Experience */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Experience
                </h2>
                <div className="mt-4 space-y-6">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold">
                        Full-Stack Developer · EduDocs
                      </h3>
                      <p className="text-sm text-gray-600">
                        Feb 2025 – Present · Remote
                      </p>
                    </div>
                    <ul className="mt-2 list-disc pl-5 text-sm space-y-1 text-gray-700">
                      <li>
                        Built a notes sharing platform (MERN, Tailwind,
                        Cloudinary) with real-time likes/votes.
                      </li>
                      <li>
                        Implemented PDF viewer with zoom, share, download, and
                        flip effect.
                      </li>
                      <li>
                        Added email/password + Google auth with Prisma in
                        Next.js; validated forms with Zod.
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold">
                        Frontend Developer · Personal Projects
                      </h3>
                      <p className="text-sm text-gray-600">
                        2023 – 2024 · Remote
                      </p>
                    </div>
                    <ul className="mt-2 list-disc pl-5 text-sm space-y-1 text-gray-700">
                      <li>
                        Developed responsive React apps (Weather, Gym site) with
                        modern UI and API integrations.
                      </li>
                      <li>
                        Optimized Lighthouse scores by improving bundle size and
                        image loading strategies.
                      </li>
                      <li>
                        Set up CI, previews, and deployments with
                        Vercel/Netlify.
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Projects */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Projects
                </h2>
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium">
                        EduPlay · Gamified Learning Platform
                      </p>
                      <span className="text-gray-600">MERN, Tailwind, JWT</span>
                    </div>
                    <p className="mt-1 text-gray-700">
                      Challenges, leaderboards, and rewards to boost learning
                      engagement. Modular services and reusable UI.
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-medium">
                        CrystalUI · Rainmeter Skin Suite
                      </p>
                      <span className="text-gray-600">C#, Rainmeter</span>
                    </div>
                    <p className="mt-1 text-gray-700">
                      Glassy widgets for Battery, Clock, Date, Device Info —
                      elegant, minimal, and configurable.
                    </p>
                  </div>
                </div>
              </section>

              {/* Achievements */}
              <section>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
                  Achievements
                </h2>
                <ul className="mt-3 list-disc pl-5 text-sm space-y-1 text-gray-700">
                  <li>
                    Top 5% in university hackathon for an AI-assisted notes app.
                  </li>
                  <li>
                    Open-sourced UI components and utilities adopted by peers.
                  </li>
                </ul>
              </section>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default PdfGen;
