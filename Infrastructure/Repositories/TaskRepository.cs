using Core.Repositories;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskContext _taskContext;

        public TaskRepository(TaskContext taskContext)
        {
            _taskContext = taskContext;
        }

        public async System.Threading.Tasks.Task Add(Core.Entities.Task obj)
        {
            var task = await _taskContext.AddAsync(obj);
            await _taskContext.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var taskToDelete = new Core.Entities.Task { Id = id };
            _taskContext.Tasks.Attach(taskToDelete);
            _taskContext.Remove(taskToDelete);
            _taskContext.SaveChanges();
        }

        public async Task<IReadOnlyList<Core.Entities.Task>> GetAllAsync()
        {
            return await _taskContext.Tasks.Include(t => t.user).ToListAsync();
        }

        public async Task<List<Core.Entities.Task>> GetByUserIdAsync(string id)
        {
            return await _taskContext.Tasks.Where(t => t.UserId == id).ToListAsync();
        }

        public async System.Threading.Tasks.Task Save()
        {
            await _taskContext.SaveChangesAsync();
        }

        public async System.Threading.Tasks.Task Update(Core.Entities.Task task)
        {
            _taskContext.Entry(task).State = EntityState.Modified;
            await _taskContext.SaveChangesAsync();
        }
    }
}
