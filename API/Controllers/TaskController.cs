using API.DTOs;
using AutoMapper;
using Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : Controller
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;
        public TaskController(ITaskRepository taskRepository, IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetTasks()
        {
            var tasks = await _taskRepository.GetAllAsync();
            var tasksToRead = _mapper.Map<List<TaskToReadDto>>(tasks);
            return Ok(tasksToRead);
        }

        [HttpPost]
        public async Task<ActionResult> AddTask(TaskToAddDto taskDto)
        {
            try
            {
                var task = _mapper.Map<Core.Entities.Task>(taskDto);
                await _taskRepository.Add(task);
                return Ok(task);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
            

        }

        [HttpDelete]
        public ActionResult DeleteTask(int taskId)
        {
            try
            {
                _taskRepository.Delete(taskId);
                return Ok();
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
           
        }

        [HttpPut]
        public ActionResult UpdateTask(TaskToReadDto task)
        {
            try
            {
               var taskToUpdate =  _mapper.Map<Core.Entities.Task>(task);
                _taskRepository.Update(taskToUpdate);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
                
            }
        }

        [HttpGet]
        [Route("/UserTasks")]
        public async Task<ActionResult> GetTaskForUser(string userId)
        {
           var tasks = await _taskRepository.GetByUserIdAsync(userId);
           var tasksToRead = _mapper.Map<List<TaskToReadDto>>(tasks);
            return Ok(tasksToRead);
        }
    }
}
