using API.DTOs;
using API.Helpers;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<User> userManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<ActionResult<string>> Register(RegisterDto registerDto)
        {
            var customer = new User
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
            };

            var result = await _userManager.CreateAsync(customer, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            await _userManager.AddClaimsAsync(customer, new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, customer.Id)
            });

            return Ok(new { id = customer.Id });

        }

        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult> Login(LoginDto loginDto)
        {
            var customer = await _userManager.FindByEmailAsync(loginDto.Email);
            if (customer == null) return BadRequest("This email is not registered");
            var isAuth = await _userManager.CheckPasswordAsync(customer, loginDto.Password);
            if (!isAuth) return Unauthorized("Wrong Password");

            var claims = await _userManager.GetClaimsAsync(customer);
            var key = TokenHelper.GenerateSecretKey(_configuration);
            var securityToken = TokenHelper.GenerateToken(claims, DateTime.Now.AddDays(1), key);
            var tokenHandler = new JwtSecurityTokenHandler();
            var id = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;


            return Ok(
                new { Token = tokenHandler.WriteToken(securityToken), ExpirtyDate = securityToken.ValidTo , Id = id}
                );


        }

    }
}
