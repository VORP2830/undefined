using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pokedex.Models;
using Pokedex.Repository.Interface;

namespace Pokedex.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly IPokemonRepository _pokemonRepository;

        public PokemonController(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }
       [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var pokemons = await _pokemonRepository.GetAll();
                if(pokemons == null) return NoContent();
                return Ok(pokemons);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao pegar pokemons.");
            }
        
        } 
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var pokemon = await _pokemonRepository.GetById(id);
                if(pokemon == null) return NoContent();
                return Ok(pokemon);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao pegar pokemon.");
            }
        
        }  
        [HttpPost]
        public async Task<IActionResult> Create(Pokemon pokemon)
        {
            try
            {
                await _pokemonRepository.Create(pokemon);
                return Ok();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao adicionar pokemon.");
            }
        
        } 
        [HttpPut]
        public async Task<IActionResult> Update(Pokemon pokemon)
        {
            try
            {
                await _pokemonRepository.Update(pokemon);
                return Ok();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao alterar pokemon.");
            }
        
        } 
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _pokemonRepository.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Erro ao deletar pokemon.");
            }
        
        } 
    }
}