import React, { useEffect, useState } from 'react';

import { Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import { GoBack } from './Back';

import './PokeList.css';

export const ListView = () => {
  const [ state, setState ] = useState(null);

  useEffect(() => {
    window.fetch('https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20')
      .then(response => response.json())
      .then(data => setState(() => data));
  }, []);

  if (!state) {
    return <div className="loading">Loading pokemons</div>
  }

  const { results } = state;
  console.log(results);

  return (
    <ul className="poke-list">
      {
        results.map(({ name, image = 'https://via.placeholder.com/240x340' }) => (
          <li key={ name } className="poke-list__item">
            <Link className="poke-list__link" to={ `/${name}` }>
              <div className="poke-list__container-image">
                <img className="poke-list__image" src={ image } alt="Изображение покемона" />
              </div>
              <div className="poke-list__content">
                <h3 className="poke-list__name">{ name }</h3>
              </div>
            </Link>
          </li>
        ))
      }
    </ul>
  )
};

export const AbilityView = () => {
  const [state, setState] = useState(null);
  const { abilityId } = useParams();

  useEffect(() => {
    window.fetch(`https://pokeapi.co/api/v2/ability/${abilityId}`)
      .then(response => response.json())
      .then(data => setState(() => data));
  }, []);

  const { effect_entries = [] } = state || {};

  return (
      <div>
        <p>{abilityId}</p>
        <ul>
          {
            effect_entries.map((effect, index) => (
              <li key={index}>{effect.short_effect}</li>
            ))
          }
        </ul>
        <div>
          <GoBack />
        </div>
      </div>
  )
};

export const View = () => {
  const { id } = useParams();
  const { path, url } = useRouteMatch();
  const [state, setState] = useState(null);

  useEffect(() => {
    window.fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => response.json())
      .then(data => setState(() => data));
  }, []);

  const { name = '', base_experience = [], height = 0, weight = 0, abilities = [] } = state || {};

  return (
    <Switch>
      <Route path={path} exact>
        { !state && <div className="loading">Loading pokemon</div> }
        { state && <div>
          <p>name: {name}</p>
          <p>base_experience: {base_experience}</p>
          <p>weight: {weight}</p>
          <p>height: {height}</p>

          <ul>
            {
              abilities.map(ability => (
                <li key={ ability.ability.name }>
                  <Link to={`${url}/${ability.ability.name}`}>{ ability.ability.name }</Link>
                </li>
              ))
            }
          </ul>
          <div>
            <GoBack />
          </div>
        </div> }

      </Route>
      <Route path={`${path}/:abilityId`}>
        <AbilityView />
      </Route>
    </Switch>
  )
};

