import { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';
import { fetchProjects } from '../api/ProjectsAPI';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const data = await fetchProjects(selectedCategories);
        setProjects(data); 
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    getProjects();
  }, [selectedCategories]);

  return (
    <>
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type:</strong> {p.projectType}
              </li>
              <li>
                <strong>Regional Program:</strong> {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact:</strong> {p.projectImpact}
              </li>
              <li>
                <strong>Project Phase:</strong> {p.projectPhase}
              </li>
              <li>
                <strong>Project Status:</strong> {p.projectFunctionalityStatus}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProjectList;
