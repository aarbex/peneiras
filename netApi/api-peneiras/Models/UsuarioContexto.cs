using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace api_peneiras.Models
{
    public partial class UsuarioContexto : DbContext
    {
        public UsuarioContexto() : base("db")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet Usuario { get; set; }

        public System.Data.Entity.DbSet<api_peneiras.Models.Usuario> Usuarios { get; set; }
    }
}