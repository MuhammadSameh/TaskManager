using API.DTOs;
using AutoMapper;

namespace API.Mapping
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {

            CreateMap<Core.Entities.Task, TaskToAddDto>().ReverseMap();
            CreateMap<Core.Entities.Task, TaskToReadDto>().ForMember(t => t.UserName, u => u.MapFrom( i => i.user.UserName )).ReverseMap();
        }
    }
}
