const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p style={{ fontWeight: "700" }}>Number of exercises {sum}</p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((elem, index) => {
      return <Part part={elem} key={index} />;
    })}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((total, part) => {
          return total + part.exercises;
        }, 0)}
      />
    </div>
  );
};

export default Course;
