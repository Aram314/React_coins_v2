import React from 'react'
import  './search.css'
import Loading from './loading'
import {API_URL} from "../../config"
import {handleResponse} from "../../helper"
import {withRouter} from 'react-router-dom'

class Search extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            searchQuery: '',
            searchResult: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        const searchQuery = event.target.value;
        this.setState({
            searchQuery,
            loading: true
        });
        if(!searchQuery) {
            this.setState({
                searchQuery: '',
                searchResult: [],
                loading: false
            });
            return ''
        }
        fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
            .then(handleResponse)
            .then(searchResult => {
                this.setState({
                    searchResult,
                    loading: false
                });
            })
    }
    handleRedirect(currencyId){
        this.setState({
            searchQuery: '',
            searchResult: []
        });
        this.props.history.push(`/currency/${currencyId}`)
    }
    renderSearchResults(){
        const {searchResult, searchQuery, loading} = this.state;
        if(!searchQuery) {
            return ''
        }
        if(searchResult.length > 0){
            return (
                <div className='Search-result-container'>
                    {searchResult.map(result => {
                        return (
                            <div
                                className="Search-result"
                                key={result.id}
                                onClick={()=>{this.handleRedirect(result.id)}}
                            >
                                {result.name} ({result.symbol})
                            </div>
                        )
                    })}
                </div>
            )
        }
        if(!loading) {
            return (
                <div className="Search-result-container">
                    <div className='Search-no-result'>No currencies are find</div>
                </div>
            )
        }
    }
    render(){
        const {loading, searchQuery} = this.state;
        return (
            <div className='Search'>
                <span className='Search-icon' />
                <input
                    className='Search-input'
                    placeholder='Currency name'
                    value={searchQuery}
                    onChange={this.handleChange}
                />
                {loading &&
                    <div className='Search-loading'><Loading width='12px' height='12px' /></div>
                }
                {this.renderSearchResults()}
            </div>
        )
    }
}

export default withRouter(Search)