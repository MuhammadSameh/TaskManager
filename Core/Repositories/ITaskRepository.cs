using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface ITaskRepository
    {
        Task<IReadOnlyList<Entities.Task>> GetAllAsync();
        Task<List<Entities.Task>> GetByUserIdAsync(string id);
        Task Add(Entities.Task obj);
        Task Save();
        Task Update(Entities.Task task);
        Task Delete(int id);
    }
}
