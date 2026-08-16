using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.RegularExpressions;

namespace WhitelistCompanion.Attributes
{
    public sealed class HostnameOrIpAddressAttribute : ValidationAttribute
    {
        private static readonly Regex HostnameRegex = new(
            @"^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$",
            RegexOptions.Compiled);

        public override bool IsValid(object value)
        {
            if (value is not string s || string.IsNullOrWhiteSpace(s)) return false;

            return IPAddress.TryParse(s, out _) || HostnameRegex.IsMatch(s);
        }

        public override string FormatErrorMessage(string name) =>
            $"The {name} field must be a valid hostname or IP address.";
    }
}
