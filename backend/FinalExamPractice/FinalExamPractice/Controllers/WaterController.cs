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
        
    }
    
}

