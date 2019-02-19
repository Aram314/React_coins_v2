import React from 'react'
import './table.css'
import {API_URL} from "../../config";
import Loading from '../common/loading'
import Pagination from "./pagination";
import Table from './table'
import {handleResponse} from "../../helper";

class List extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            page: 1,
            totalPages: 0
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    }
    fetchCurrencies(){
        const {page} = this.state;
        this.setState({
            loading: true
        });
        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                const {currencies, totalPages} = data;
                this.setState({
                    currencies,
                    loading: false,
                    error: null,
                    totalPages
                });
                console.log('Success', currencies);
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false
                });
                console.log('Error', error);
            });
    }
    componentDidMount(){
        this.fetchCurrencies();
    }

    handleChangePage(direction){
        let nextPage = this.state.page;
        if(direction === 'next') {
            nextPage = nextPage + 1;
        } else {
            nextPage = nextPage - 1;
        }
        this.setState({
            page: nextPage
        }, this.fetchCurrencies)
    }
    render(){
        const {currencies, error, loading, totalPages, page} = this.state;
        if(loading) {
            return (
                <div className='loading-container'>
                    <Loading />
                </div>
            )
        }
        if(error) {
            return (
                <div className='error'>{error}</div>
            )
        }
        return(
            <div>
                <Table currencies={currencies} />
                <Pagination page={page} totalPages={totalPages} handleChangePage={this.handleChangePage}/>
            </div>
        )
    }
}

export default List