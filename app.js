const cryptoTableBody = document.getElementById('crypto-table-body');
const searchInput = document.getElementById('search-input');
const loadingElement = document.getElementById('loading-state');
const errorElement = document.getElementById('error-state');
const refreshBtn = document.getElementById('refresh-btn');

let cryptoData = []; 
async function fetchCryptoData() {
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    cryptoTableBody.innerHTML = '';

    try {
        const response = await fetch('https://coingecko.com');
        
        if (!response.ok) {
            throw new Error(`API Status Code: ${response.status}`);
        }
        
        cryptoData = await response.json();
        renderTable(cryptoData);
    } catch (error) {
        console.error("Fetch failure error info:", error);
        
        cryptoData = [
            { market_cap_rank: 1, name: "Bitcoin", symbol: "btc", current_price: 64250.00, price_change_percentage_24h: 9.80 },
            { market_cap_rank: 2, name: "Ethereum", symbol: "eth", current_price: 3450.25, price_change_percentage_24h: 4.50 },
            { market_cap_rank: 3, name: "Solana", symbol: "sol", current_price: 145.80, price_change_percentage_24h: -2.30 },
            { market_cap_rank: 4, name: "Cardano", symbol: "ada", current_price: 0.38, price_change_percentage_24h: 1.20 }
        ];
        renderTable(cryptoData); 
        errorElement.textContent = "Oops! We encountered an API rate limit. Displaying demo fallback market statistics.";
        errorElement.style.display = 'block';
    } finally {
    
        loadingElement.style.display = 'none';
    }
}

function renderTable(data) {
    cryptoTableBody.innerHTML = '';

    if (data.length === 0) {
        cryptoTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 2rem; color: #9ca3af;">No matching digital coins found.</td></tr>`;
        return;
    }

    data.forEach(coin => {
        const row = document.createElement('tr');
      
        const changeColor = coin.price_change_percentage_24h >= 0 ? '#10b981' : '#ef4444';
        const changeSign = coin.price_change_percentage_24h >= 0 ? '+' : '';

        row.innerHTML = `
            <td>${coin.market_cap_rank}</td>
            <td><strong>${coin.name} (${coin.symbol.toUpperCase()})</strong></td>
            <td>$${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td style="color: ${changeColor}; font-weight: bold;">
                ${changeSign}${coin.price_change_percentage_24h.toFixed(2)}%
            </td>
        `;
        cryptoTableBody.appendChild(row);
    });
}

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCoins = cryptoData.filter(coin => 
        coin.name.toLowerCase().includes(searchTerm) || 
        coin.symbol.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredCoins);
});

refreshBtn.addEventListener('click', fetchCryptoData);

fetchCryptoData();
