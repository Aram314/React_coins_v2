import React from 'react'
import {API_URL} from "../../config";
import {handleResponse, handleChangePercent} from "../../helper";
import Loading from '../common/loading'
import './detail.css'

class Detail extends React.Component {
    constructor(){
        super();
        this.state = {
            loading: false,
            currency: {},
            error: null
        }
    }
    fetchCurrency(currencyId){
        this.setState({
            loading: true
        });
        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
            .then(handleResponse)
            .then(currency => {
                this.setState({
                    currency,
                    loading: false,
                    error: null
                });
                console.log('Success', currency);
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    error: error.errorMessage
                });
                console.log('Error', error);
            });
    }
    componentWillReceiveProps(nextProps){
        const currencyId = nextProps.match.params.id;
        if(this.props.location.pathname !== nextProps.location.pathname) {
            this.fetchCurrency(currencyId)
        }
    }
    componentDidMount(){
        const currencyId = this.props.match.params.id;
        this.fetchCurrency(currencyId)
    }
    render(){
        const {currency, loading, error} = this.state;
        if(loading) {
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            )
        }
        if(error) {
            return (
                <div className="error">{error}</div>
            )
        }
        return (
            <div className='Detail'>
                <h1 className='Detail-heading'>{currency.name} ({currency.symbol})</h1>
                <div className='Detail-container'>
                    <div className='Detail-item'>
                        Price <span className='Detail-value'>$ {currency.price}</span>
                    </div>
                    <div className='Detail-item'>
                        Rank <span className='Detail-value'> {currency.rank}</span>
                    </div>
                    <div className='Detail-item'>
                        24 H change <span className='Detail-value'> {handleChangePercent(currency.percentChange24h)}</span>
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>Market cap</span>
                        <span className='Detail-dollar'>$</span>
                        {currency.marketCap}
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>24H Volume</span>
                        <span className='Detail-dollar'>$</span>
                        {currency.volume24h}
                    </div>
                    <div className='Detail-item'>
                        <span className='Detail-title'>Total supply</span> {currency.totalSupply}
                    </div>
                </div>
            </div>
        )
    }
}

export default Detail