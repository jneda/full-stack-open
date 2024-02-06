import { CoursePart } from "../types";

import Part from "./Part";

interface ContentProps {
  courses: CoursePart[];
}

const Content = ({ courses }: ContentProps) => (
  <>
    {courses.map((course) => (
      <Part key={course.name} course={course} />
    ))}
  </>
);

export default Content;
