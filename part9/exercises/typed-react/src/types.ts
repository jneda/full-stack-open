interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourtPartBaseWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CourtPartBaseWithDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourtPartBaseWithDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CourtPartBaseWithDescription {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
