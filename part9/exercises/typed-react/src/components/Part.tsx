import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface PartProps {
  course: CoursePart;
}

const Part = ({ course }: PartProps) => {
  const courseHeading = (
    <h2>
      {course.name} {course.exerciseCount}
    </h2>
  );

  const courseDescription = (description: string) => (
    <p>
      <em>{description}</em>
    </p>
  );

  switch (course.kind) {
    case "basic": {
      return (
        <>
          {courseHeading}
          {courseDescription(course.description)}
        </>
      );
    }
    case "group": {
      return (
        <>
          {courseHeading}
          <p>Group projects: {course.groupProjectCount}</p>
        </>
      );
    }
    case "background": {
      return (
        <>
          {courseHeading}
          {courseDescription(course.description)}
          <p>
            Cf.{" "}
            <a href={course.backgroundMaterial}>{course.backgroundMaterial}</a>
          </p>
        </>
      );
    }
    case "special": {
      return (
        <>
          {courseHeading}
          {courseDescription(course.description)}
          <p>Required skillls: {course.requirements.join(", ")}</p>
        </>
      );
    }
    default: {
      return assertNever(course);
    }
  }
};

export default Part;
