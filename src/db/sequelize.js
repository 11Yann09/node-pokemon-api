const { Sequelize, DataTypes } = require("sequelize");
const PokemonModels = require("../models/pokemon");
const pokemons = require("../db/mock-pokemon");

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Pokemon = PokemonModels(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(),
      }).then((bulbizarre) => console.log(bulbizarre.toJSON()));
    });
    console.log("La base de données a été synchronisée.");
  });
};
module.exports = { initDb, Pokemon };
