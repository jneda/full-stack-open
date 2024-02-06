interface Course {
  name: string;
  exerciseCount: number;
}

interface ContentProps {
  courses: Course[];
}

const Content = ({ courses }: ContentProps) => (
  <>
    <p>
      {courses[0].name} {courses[0].exerciseCount}
    </p>
    <p>
      {courses[1].name} {courses[1].exerciseCount}
    </p>
    <p>
      {courses[2].name} {courses[2].exerciseCount}
    </p>
  </>
);

export default Content;
