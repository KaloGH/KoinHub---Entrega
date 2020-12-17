export { CryptoInfo }
class CryptoInfo {
    constructor() { }

    exchangeRates() {
        return new Promise(async (resolve) => {
            await fetch('https://api.coingecko.com/api/v3/exchange_rates')
                .then(res => res.json())
                .then(data => resolve(data));
        });
    }

    coinsList() {
        return new Promise(async (resolve) => {
            await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=15&page=1&sparkline=false')
                .then(res => res.json())
                .then(data => resolve(data));
        });
    }

    infoAboutCoin(id) {
        return new Promise(async (resolve) => {
            await fetch('https://api.coingecko.com/api/v3/coins/' + id + '?market_data=true')
                .then(res => res.json())
                .then(data => resolve(data));
        });
    }
}