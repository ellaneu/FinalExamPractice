import { Project } from "../types/Project";


const API_URL = `https://localhost:5000/Water`;

export const fetchProjects = async (
  selectedCategories: string[]
): Promise<Project[]> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const url = `${API_URL}/AllProjects${
      categoryParams ? `?${categoryParams}` : ''
    }`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch projects');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const addProject = async (newProject: Project): Promise<Project> => {
    try {
        const response = await fetch(`${API_URL}/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProject)
        });

        if (!response.ok) {
            throw new Error('Failed to add project');
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding project', error);
        throw error;
    }
}

export const updateProject = async (projectId: number, updateProject: Project) : Promise<Project> => {
    try {

        const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateProject),
        });

        return await response.json()
        
    } catch (error) {
        console.error('Error updating project', error);
        throw error;
    }
}

export const deleteProject = async (projectId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteProject/${projectId}`, 
            {
                method: 'DELETE'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete project');
        }
    } catch (error) {
        console.error('Error deleting project', error);
        throw error;
    }
}