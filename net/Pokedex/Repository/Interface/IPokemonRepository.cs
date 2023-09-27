using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pokedex.Models;

namespace Pokedex.Repository.Interface
{
    public interface IPokemonRepository
    {
        Task<IEnumerable<Pokemon>> GetAll();
        Task<Pokemon> GetById(int id);
        Task Create(Pokemon pokemon);
        Task Update (Pokemon pokemon); 
        Task Delete (int id);
    }
}