//* =============================================
//*               BASE COMPONENTS               =
//*==============================================
function ContentCredit({ children }: React.PropsWithChildren) {
  return (
    <p className="relative pl-3 leading-snug before:absolute before:left-0 before:w-3 before:content-['-']">
      <small>{children}</small>
    </p>
  );
}

//

type CourseCreditProps = {
  courseName: string;
  courseUrl: string;
  siteName: string;
  siteUrl: string;
  instructorName: string;
  instructorUrl: string;
};
function CourseCredit({
  courseName,
  courseUrl,
  siteName,
  siteUrl,
  instructorName,
  instructorUrl,
}: CourseCreditProps) {
  return (
    <ContentCredit>
      From the{' '}
      <a
        href={courseUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="linkHoverStyles"
      >
        {courseName}
        <span className="ml-[2px]">↗</span>
      </a>{' '}
      course on{' '}
      <a
        href={siteUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="linkHoverStyles"
      >
        {siteName}
        <span className="ml-[2px]">↗</span>
      </a>{' '}
      taught by{' '}
      <a
        href={instructorUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="linkHoverStyles"
      >
        {instructorName}
        <span className="ml-[2px]">↗</span>
      </a>
      .
    </ContentCredit>
  );
}

//

type DocsCreditProps = {
  docsName: string;
  docsUrl: string;
};
function DocsCredit({ docsName, docsUrl }: DocsCreditProps) {
  return (
    <ContentCredit>
      From the{' '}
      <a
        href={docsUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="linkHoverStyles"
      >
        {docsName}
        <span className="ml-[2px]">↗</span>
      </a>{' '}
      docs.
    </ContentCredit>
  );
}

//* =============================================
//*                   COURSES                   =
//*==============================================
export function TSFundamentalsCourse() {
  return (
    <CourseCredit
      courseName="TypeScript Fundamentals, v3"
      courseUrl="https://frontendmasters.com/courses/typescript-v3"
      siteName="FEM"
      siteUrl="https://frontendmasters.com"
      instructorName="Mike North"
      instructorUrl="https://github.com/mike-north"
    />
  );
}

export function IntermediateTSCourse() {
  return (
    <CourseCredit
      courseName="Intermediate TypeScript"
      courseUrl="https://frontendmasters.com/courses/intermediate-typescript"
      siteName="FEM"
      siteUrl="https://frontendmasters.com"
      instructorName="Mike North"
      instructorUrl="https://github.com/mike-north"
    />
  );
}

export function ReactAndTypescriptCourse() {
  return (
    <CourseCredit
      courseName="React and TypeScript, v2"
      courseUrl="https://frontendmasters.com/courses/react-typescript-v2"
      siteName="FEM"
      siteUrl="https://frontendmasters.com"
      instructorName="Steve Kinney"
      instructorUrl="https://github.com/stevekinney"
    />
  );
}

export function IntroToPostgreSQLCOURSE() {
  return (
    <CourseCredit
      courseName="Complete Intro to SQL & PostgreSQL"
      courseUrl="https://frontendmasters.com/courses/sql/"
      siteName="FEM"
      siteUrl="https://frontendmasters.com"
      instructorName="Brian Holt"
      instructorUrl="https://github.com/btholt"
    />
  );
}

//* =============================================
//*                     DOCS                    =
//*==============================================
export function TailwindDocs() {
  return (
    <DocsCredit docsName="Tailwind CSS" docsUrl="https://tailwindcss.com" />
  );
}

export function ReactDocs() {
  return <DocsCredit docsName="React" docsUrl="https://beta.reactjs.org" />;
}

export function TypeScriptDocs() {
  return (
    <DocsCredit
      docsName="TypeScript"
      docsUrl="https://www.typescriptlang.org"
    />
  );
}

export function MDNDocs() {
  return <DocsCredit docsName="MDN" docsUrl="https://developer.mozilla.org" />;
}
