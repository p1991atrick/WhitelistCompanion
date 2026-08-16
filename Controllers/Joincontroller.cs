using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WhitelistCompanion.Configuration;

namespace WhitelistCompanion.Controllers
{
    [ApiController]
    [Route("join")]
    public class JoinController : ControllerBase
    {
        private readonly ApiConfiguration _apiConfig;

        public JoinController(IOptions<ApiConfiguration> apiConfig)
        {
            if (apiConfig is null) throw new ArgumentNullException(nameof(apiConfig));

            _apiConfig = apiConfig.Value;
        }

        [HttpGet]
        public IActionResult Join()
        {
            return Redirect($"/?secret={_apiConfig.Key}");
        }
    }
}
