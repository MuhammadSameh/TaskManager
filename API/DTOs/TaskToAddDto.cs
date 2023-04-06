namespace API.DTOs
{
    public class TaskToAddDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }

        public Core.TaskStatus Status { get; set; } = Core.TaskStatus.Processing;
    }
}
