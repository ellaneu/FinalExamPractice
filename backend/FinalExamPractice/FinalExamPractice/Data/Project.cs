using System.ComponentModel.DataAnnotations;

namespace FinalExamPractice.Data;

public class Project
{
    [Key]
    public int ProjectId { get; set; }
    [Required] // required when NOT NULL 
    public string ProjectName { get; set; }
    public string? ProjectType { get; set; }
    public string? ProjectRegionalProgram { get; set; }
    public int? ProjectImpact { get; set; }
    public string? ProjectPhase { get; set; }
    public string? ProjectFunctionalityStatus {get; set;}
    
}