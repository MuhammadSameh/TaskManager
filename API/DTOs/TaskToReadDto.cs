namespace API.DTOs
{
    public class TaskToReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }

        public string UserName { get; set; }
        public Core.TaskStatus Status { get; set; } = Core.TaskStatus.Processing;
    }
}
