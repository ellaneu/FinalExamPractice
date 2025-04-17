import { Project } from "../types/Project";
import { useEffect, useState } from "react";
import { deleteProject, fetchProjects } from "../api/ProjectsAPI";
import NewProjectForm from "../components/NewProjectForm";
import EditProjectForm from "../components/EditProjectForm";

function AdminProjectsPage () {

    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                const data = await fetchProjects([]);
                setProjects(data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadProjects();
    }, []);

    const handleDelete = async (projectId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this project?');

        if (!confirmDelete) return;

        try {
            await deleteProject(projectId);
            setProjects(projects.filter((p) => p.projectId !== projectId))
        } catch (error) {
            alert('Failed to delete project. Please try again.')
        }
    }

    if (loading) return <p>Loading projects...</p>
    if (error) return <p>Error: {error}</p>

    return (

        <div>
            <h1>Admin - Projects</h1>

            {!showForm && (
                <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>Add Project</button>
            )}

            {showForm && (
                <NewProjectForm onSuccess={() => {
                    setShowForm(false);
                    fetchProjects([]).then((data) => setProjects(data));
                }}
                onCancel={() => setShowForm(false)} />
            )}

            {editingProject && (
                <EditProjectForm project={editingProject} onSuccess={() => {
                    setEditingProject(null);
                    fetchProjects([]).then((data) => setProjects(data));
                }}
                onCancel={() => setEditingProject(null)}
                />
            )}


            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Types</th>
                        <th>Regional Program</th>
                        <th>Impact</th>
                        <th>Phase</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((p) => (
                        <tr key={p.projectId}>
                            <td>{p.projectId}</td>
                            <td>{p.projectName}</td>
                            <td>{p.projectType}</td>
                            <td>{p.projectRegionalProgram}</td>
                            <td>{p.projectImpact}</td>
                            <td>{p.projectPhase}</td>
                            <td>{p.projectFunctionalityStatus}</td>
                            <td>
                                <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => setEditingProject(p)}>Edit</button>
                                <button className="btn btn-danger btn-sm w-100 mb-1" onClick={() => handleDelete(p.projectId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );

}

export default AdminProjectsPage;