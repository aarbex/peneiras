using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_peneiras.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Perfil { get; set; }
        public bool PrimeiroAcesso { get; set; }
        public DateTime DataCadastro { get; set; }
        public DateTime DataExclusao { get; set; }
    }
}