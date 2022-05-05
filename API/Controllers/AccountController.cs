using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized("Invalid email");
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return Unauthorized("Invalid password");

        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerdto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registerdto.Email))
            {
                ModelState.AddModelError("email","Email taken");
                return ValidationProblem(ModelState);
            }

            if (await _userManager.Users.AnyAsync(x => x.UserName == registerdto.Username))
            {
                ModelState.AddModelError("username","Username taken");
                return ValidationProblem(ModelState);
            }

            var user = new AppUser
            {
                DisplayName = registerdto.DisplayName,
                UserName = registerdto.Username,
                Email = registerdto.Email
            };

            var result = await _userManager.CreateAsync(user, registerdto.Password);

            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }

            return BadRequest("Problem registering user");

        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            //return "";
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return CreateUserObject(user);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.UserName,
                Token = _tokenService.CreateToken(user),
                Image = null,
                Username = user.Email
            };
        }

    }
}