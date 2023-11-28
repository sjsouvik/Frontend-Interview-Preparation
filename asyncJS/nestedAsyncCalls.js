/*

- Fetch the pokemon data from the api: https://pokeapi.co/api/v2/pokemon/
- we'll get one url for each pokemon from the above fetched data, use that to fetch the abilities for each pokemon
- for each ability there's one url to fetch the ability details

aggregate these data for each pokemon and the data should look like the following:

{
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
    abilities:[{
      ability: {
        name: "overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
        details: {} // fetched data related to each ability details after completing the last task
      },
      is_hidden: false,
      slot: 1
    }] // fetched data related to the abilities after completing the 2nd task 
}

********************************************************Solution**********************************************************/

async function aggregateData() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const { results } = await response.json();

  const output = await Promise.all(
    results.map(async (item) => {
      const response = await fetch(item.url);
      let { abilities } = await response.json();

      abilities = await Promise.all(
        abilities.map(async (item) => {
          const response = await fetch(item.ability.url);
          const abilityDetails = await response.json();
          return {
            ...item,
            ability: { ...item.ability, details: abilityDetails },
          };
        })
      );

      return { ...item, abilities: abilities || [] };
    })
  );

  console.log(output);
}

aggregateData();
