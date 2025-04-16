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
        public IEnumerable<Project> GetProjects()
        {
            return _waterContext.Projects.ToList();
        }
        
    }
    
}

