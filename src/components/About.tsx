import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";

import { FaGithubSquare, FaXingSquare } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center  pt-10">
      <h2 className="text-xl font-semibold mb-2">About</h2>
      <p className="mb-2 max-w-prose">
        Welcome to the Chicago Crime Watch (CCW) Project! This dashboard offers
        an interactive overview of crime statistics across various Chicago
        districts. Use the map to filter district data with a click, and hover
        over districts to see overall crime statistics.
      </p>
      <h3 className="text-lg font-semibold mb-2">Data Sources</h3>
      <p className="mb-2 max-w-prose">
        Our data is sourced from the publicly available Chicago Data Portal. It
        is regularly preprocessed and updated to ensure the latest crime
        information is reflected.
      </p>
      <h3 className="text-lg font-semibold mb-2">Features</h3>
      <ul className="list-disc list-inside mb-2 max-w-prose text-left">
        <li>
          Interactive map for filtering and displaying crime incidents by
          district.
        </li>
        <li>Charts visualizing crime trends from 2019 to 2023.</li>
        <li>Customizable data views based on user preferences.</li>
        <li>Comprehensive crime type statistics.</li>
      </ul>
      <h3 className="text-lg font-semibold mb-2">Sources</h3>
      <p className="mb-2 max-w-prose">
        To view, collaborate, contribute and provide feedback to the project,
        you can use the feedback form or reach out through the following
        socials:
      </p>
      <div className="flex gap-3 pt-3  justify-center  ">
        <a
          href="https://github.com/Nimrod2022/chicago-crime-AD"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithubSquare className="size-7  " />
        </a>

        <a
          href="https://www.linkedin.com/in/nimrod-kibet-b6b340115/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="size-7 " />
        </a>
        <a
          href="https://www.xing.com/profile/Nimrod_Kibet"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaXingSquare className="size-7 " />
        </a>

        <a
          href="https://twitter.com/MandelaGI?t=ejgoi2MMFnyuNXcdNoMXtA&s=09"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaSquareXTwitter className="size-7 " />
        </a>
      </div>
    </div>
  );
};

export default About;
