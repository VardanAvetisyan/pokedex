import React, { Component } from 'react';
import { connect } from 'react-redux'
import Pokedex from "./components/pokedex";


class App extends Component {


    render() {
        return (
            <div>
                <Pokedex />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    pokemon: state.pokemons.pokemons
})

export default connect(mapStateToProps)(App);