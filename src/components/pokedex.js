import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchPokemons} from "../actions/pokemonsActions"
import {fetchTypes} from "../actions/typesActions";
import loader from '../loader/pikachu-loader.gif'
import Pagination from "./pagination";
import Types from "./types";


class Pokedex extends Component {

    state = {
        search: ''
    };

    componentWillMount() {
        this.props.dispatch(fetchPokemons());
        this.props.dispatch(fetchTypes())
    }

    handleSearch() {
        this.setState({
            search: this.refs.search.value
        });
    }

    render() {
        let pokemons = this.props.pokemon;

        let filteredPokemons = pokemons.filter((pokemon) => {
            return pokemon.name.indexOf(this.state.search) !== -1;
        });

        let mappedPokemon = filteredPokemons.map((pokemon, index) => {
            let types = pokemon.types.map((types, i) => {
                return <div key={i}>{types.type.name}</div>
            });
            let attributes = pokemon.abilities.map((attr, i) => {
                return <div key={i}>{attr.ability.name}</div>
            });
            return <tr key={index}>
                <td>{pokemon.name}</td>
                <td><img src={pokemon.sprites.front_default} alt=""/></td>
                <td>{types}</td>
                <td>{attributes}</td>
            </tr>
        });

        if (this.props.loader) {
            return (
                <div className='loaderWrapper'>
                    <img src={loader} className='loader' alt="Loading"/>
                </div>
            )
        }

        return (
            <div className='container'>
                <br/>
                <form className="form-group">
                    <input
                        className="form-control"
                        type="text"
                        placeholder='Search'
                        value={this.state.search }
                        onChange={this.handleSearch.bind(this)}
                        ref='search'
                    />
                </form>
                <br/>
                <Types/>
                <br/>
                <table className='table table-bordered'>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Picture</td>
                        <td>Type</td>
                        <td>Attributes</td>
                    </tr>
                    </thead>
                    <tbody>
                    {mappedPokemon}
                    </tbody>
                </table>
                <Pagination/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    pokemon: state.pokemons.pokemons,
    loader: state.pokemons.fetching,
})

export default connect(mapStateToProps)(Pokedex);
