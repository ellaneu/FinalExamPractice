using FinalExamPractice.Data;
using Microsoft.AspNetCore.Mvc;

namespace FinalExamPractice.Controllers
{
    [Route("[controller]")]
    [ApiController]
    
    public class WaterController : ControllerBase
    {
        private WaterDbContext _waterContext;
    
        public WaterController(WaterDbContext temp)
        {
            _waterContext = temp;
        }

        [HttpGet("AllProjects")]
        public IActionResult GetProjects([FromQuery] List<string>? projectTypes = null)
        {
            var query = _waterContext.Projects.AsQueryable();

            if (projectTypes != null && projectTypes.Any())
            {
                query = query.Where(p => projectTypes.Contains(p.ProjectType ?? ""));
            }

            var something = query.ToList();
            
            
            return Ok(something);
            
            
        }

        [HttpGet("GetProjectTypes")]
        public IActionResult GetProjectTypes()
        {
            var projectTypes = _waterContext.Projects
                .Select(p => p.ProjectType)
                .Distinct()
                .ToList();
            
            return Ok(projectTypes);
        }

        [HttpPost("Add")]
        public IActionResult AddProject([FromBody] Project newProject)
        {
            _waterContext.Projects.Add(newProject);
            _waterContext.SaveChanges();
            
            return Ok(newProject);
        }
        
        [HttpPut("UpdateProject/{projectId}")]
        public IActionResult UpdateProject(int projectId, [FromBody] Project updatedProject)
        {
            var existingProject = _waterContext.Projects.Find(projectId);

            if (existingProject != null)
            {
                existingProject.ProjectName = updatedProject.ProjectName;
                existingProject.ProjectType = updatedProject.ProjectType;
                existingProject.ProjectRegionalProgram = updatedProject.ProjectRegionalProgram;
                existingProject.ProjectImpact = updatedProject.ProjectImpact;
                existingProject.ProjectPhase = updatedProject.ProjectPhase;
                existingProject.ProjectFunctionalityStatus = updatedProject.ProjectFunctionalityStatus;
            }
            
            _waterContext.Projects.Update(existingProject);
            _waterContext.SaveChanges();
            
            return Ok(existingProject);
        }

        [HttpDelete("DeleteProject/{projectId}")]
        public IActionResult DeleteProject(int projectId)
        {
            var existingProject = _waterContext.Projects.Find(projectId);

            if (existingProject == null)
            {
                return NotFound(new {message = "Project not found"});
            }
            
            _waterContext.Projects.Remove(existingProject);
            _waterContext.SaveChanges();
            
            return NoContent();
        }
        
    }
    
}

