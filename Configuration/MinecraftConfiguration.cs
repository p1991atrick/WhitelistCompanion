using System.ComponentModel.DataAnnotations;
using WhitelistCompanion.Attributes;

namespace WhitelistCompanion.Configuration
{
    public class MinecraftConfiguration
    {
        public const string Section = "Mc";

        [Required]
        [HostnameOrIpAddress]
        public string Hostname { get; init; }

        [Required]
        [Range(0, 65536)]
        public ushort Port { get; init; }

        [Required]
        public string Password { get; init; }
    }
}
