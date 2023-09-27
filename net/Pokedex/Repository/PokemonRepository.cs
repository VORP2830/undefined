using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pokedex.Context;
using Pokedex.Models;
using Pokedex.Repository.Interface;

namespace Pokedex.Repository
{
    public class PokemonRepository : IPokemonRepository
    {
        private readonly ApplicationDbContext _context;
        public PokemonRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Pokemon>> GetAll()
        {
            return await _context.Pokemons.ToListAsync();
        }

        public async Task<Pokemon> GetById(int id)
        {
            return await _context.Pokemons.Where(p => p.Id == id).FirstOrDefaultAsync();
        }
        public async Task Create(Pokemon pokemon)
        {
            _context.Add(pokemon);
            await _context.SaveChangesAsync();
        }
        public async Task Update(Pokemon pokemon)
        {
            _context.Update(pokemon);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var pokemon = await _context.Pokemons.Where(p => p.Id == id).FirstOrDefaultAsync();
             _context.Remove(pokemon);
            await _context.SaveChangesAsync();
        }
    }
}