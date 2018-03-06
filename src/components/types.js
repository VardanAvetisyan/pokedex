import React, {Component} from 'react'
import {connect} from 'react-redux'

import {fetchTypePokemons} from "../actions/typesActions"
import {changePerPage} from "../actions/pagesActions"

class Types extends Component {
    state = {
        currentValue: this.props.currentType
    };

    handleChange(event) {
        this.props.dispatch(fetchTypePokemons(event.target.value));
        this.props.dispatch(changePerPage(949));
    }

    render() {
        let types = this.props.types;
        if (types.length > 0) {
            return (
                <div className='container'>
                    <nav aria-label="Page navigation example">
                        <div className="form-group">
                            <label>Select Type</label>
                            <select className="form-control" id="perPage"
                                    defaultValue={this.state.currentValue}
                                    onChange={this.handleChange.bind(this)}
                            >
                                <option value="All">{this.state.currentValue}</option>
                                {types.map((type) => {
                                    return <option key={type.name} value={type.url}>{type.name}</option>
                                })}

                            </select>
                        </div>
                    </nav>
                    <br/>
                    <br/>
                </div>
            );
        } else {
            return null
        }
    }
}

const mapStateToProps = state => ({
    types: state.types.types,
    currentType: state.types.currentType
})

export default connect(mapStateToProps)(Types);