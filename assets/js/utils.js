export function generateListItem(pokemon) {
  return `
    <li class="pokemon ${pokemon.mainType}" data-pokemon-id="${pokemon.number}">
      <span class="number">#${String(pokemon.number).padStart(3,'0')}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="type-list">
          ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
        </ol>
        
        <img src="${pokemon.image}" alt="${pokemon.name}">
      </div>
    </li>
  `;
}

export function generateModal(pokemon) {
  return `
    <div class="modal ${pokemon.mainType}">
      <header>
        <button id="back-button"><img src="./assets/images/back-arrow.png"></button>
        <div id="id-container">
          <h1 class="name">${pokemon.name}</h1>
          <span class="number">#${String(pokemon.number).padStart(3,'0')}</span>
        </div>
        <ol class="type-list">
          ${pokemon.types.map(type => `<li class="type">${type}</li>`).join('')}
        </ol>
        <img id="pokemon-image" src="${pokemon.image}" alt="Bulbasaur">
      </header>

      <div id="data-container">
        <div>
          <section id="about">
            <h2><div class="${pokemon.mainType}"></div>About</h2>
            <table>
              <tr>
                <td class="info-name">Height</td>
                <td class="info-value">${pokemon.height/10} m</td>
              </tr>
              <tr>
                <td class="info-name">Weight</td>
                <td class="info-value">${pokemon.weight/10} kg</td>
              </tr>
              <tr>
                <td class="info-name">Abilities</td>
                <td class="info-value" id="abilities">${pokemon.abilities.join(', ')}</td>
              </tr>
            </table>
          </section>

          <section>
            <h2><div class="${pokemon.mainType}"></div>Base Stats</h2>
            <table>
              <tr>
                <td class="info-name">HP</td>
                <td class="stats-value">${pokemon.stats['hp']}</td>
                <td class="stats-bar"><div class="bar"><div class="${getClassName(pokemon.stats['hp'])}" style="width:${getBarWidth(pokemon.stats['hp'])}%;"></div></div></td>
              </tr>
              <tr>
                <td class="info-name">Attack</td>
                <td class="stats-value">${pokemon.stats['attack']}</td>
                <td class="stats-bar"><div class="bar"><div class="${getClassName(pokemon.stats['attack'])}" style="width:${getBarWidth(pokemon.stats['attack'])}%;"></div></div></td>
              </tr>
              <tr>
                <td class="info-name">Defense</td>
                <td class="stats-value">${pokemon.stats['defense']}</td>
                <td class="stats-bar"><div class="bar"><div class="${getClassName(pokemon.stats['defense'])}" style="width:${getBarWidth(pokemon.stats['defense'])}%;"></div></div></td>
              </tr>
              <tr>
                <td class="info-name">Sp. Atk</td>
                <td class="stats-value">${pokemon.stats['special-attack']}</td>
                <td class="stats-bar"><div class="bar"><div class="${getClassName(pokemon.stats['special-attack'])}" style="width:${getBarWidth(pokemon.stats['special-attack'])}%;"></div></div></td>
              </tr>
              <tr>
                <td class="info-name">Sp. Def</td>
                <td class="stats-value">${pokemon.stats['special-defense']}</td>
                <td class="stats-bar"><div class="bar"><div class="${getClassName(pokemon.stats['special-defense'])}" style="width:${getBarWidth(pokemon.stats['special-defense'])}%;"></div></div></td>
              </tr>
              <tr>
                <td class="info-name">Speed</td>
                <td class="stats-value">${pokemon.stats['speed']}</td>
                <td class="stats-bar"><div class="bar"><div class="${getClassName(pokemon.stats['speed'])}" style="width:${getBarWidth(pokemon.stats['speed'])}%;"></div></div></td>
              </tr>
            </table>
          </section>
        </div>
      </div>
    </div>
  `;
}

function getBarWidth(statValue) {
  return (statValue <= 180) ? Math.ceil(100 * statValue / 180) : 100;
}

function getClassName(statValue) {
  if (statValue < 60) {
    return 'low';
  } else if (statValue < 90) {
    return 'average';
  } else if (statValue < 130) {
    return 'good';
  } else {
    return 'great';
  }
}