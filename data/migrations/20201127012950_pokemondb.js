
exports.up = function(knex) {
    return knex.schema
      .createTable('pokemon', pokemon => {
          pokemon.integer('id')
                  .unique()
                  .notNullable();
          pokemon.text('pokemon_name')
                  .unique()
                  .notNullable();
          pokemon.integer('pokemon_attack')
                  .notNullable();
          pokemon.integer('pokemon_defense')
                  .notNullable();
          pokemon.integer('pokemon_stamina')
                  .notNullable();
      })
  };
  
  exports.down = function(knex) {
      return knex.schema
          .dropTableIfExists('pokemon');
  };
  