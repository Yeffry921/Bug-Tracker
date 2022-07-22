
const projects = [
  {
    title: "Project Number #1",
    dateCreated: "12/12/21",
    status: "active",
    deadline: "06/12/22",
    id: 12345,
    bugs: ["bug 1", "bug 2", "bug3"],
  },
  {
    title: "Project Number #2",
    dateCreated: "12/12/21",
    status: "active",
    deadline: "06/12/22",
    id: 12345,
    bugs: ["my bug 1", "my bug 2", "my bug 3"],
  },
  {
    title: "Project Number #3",
    dateCreated: "12/12/21",
    status: "active",
    deadline: "06/12/22",
    id: 12345,
    bugs: [
      {
        title: "bug #1",
        severity: "severe",
        status: "in progress",
        createdAt: "12/12/2034",
        dueDate: "12/12/2035",
      },
    ],
  },
];

const sample = projects.map((project) => {
  return (
    <div>
      <h1>{project.title}</h1>
      <span>Bugs {project.bugs.length}</span>
    </div>
  );
});