using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using WebApplication2.Models;

namespace WebApplication2
{
    public class DummyIdentity : IIdentity
    {
        public string AuthenticationType { get; set; }

        public bool IsAuthenticated => true;

        public string Name { get; set; }

        public DummyUser User { get; set; }
    }
}
