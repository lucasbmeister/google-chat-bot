

function getKeyDescription(key) {
  const descriptions = {
    change: 'Variação',
    closingPrice: 'Valor Fechamento',
    eps: 'Lucro por Ação',
    high: 'Alta',
    lastPrice: 'Últ. Preço',
    lastYearHigh: 'Alt 52 sem',
    lastYearLow: 'Bai 52 sem',
    low: 'Baixa',
    marketCap: 'Cap. Merc.',
    name: 'Nome',
    pe: 'Índice P/L',
    priceOpen: 'Abertura',
    shares: 'Ações',
    symbol: 'Simbolo',
    volume: 'Volume',
    volumeAvg: 'Média Volume',
    sector: 'Setor',
    subSector: 'Sub-Setor',
    segment: 'Segmento'
  };
  return descriptions[key];
}


function stockToString(stockInfo) {
  let stockString = '';
  Object.keys(stockInfo).forEach(key => {
    if ('number'.includes(typeof stockInfo[key])) {
      stockInfo[key] = stockInfo[key].toLocaleString('pt-BR', {minimumFractionDigits: 2});
    }
    stockString += `${getKeyDescription(key)}: ${stockInfo[key]}\n`;
  });
  return stockString;
}


function getStockInfo(stock) {
  const response = UrlFetchApp.fetch(`https://mfinance.com.br/api/v1/stocks/${stock}`, {muteHttpExceptions : true});
  const data = JSON.parse(response.getContentText());
  return data;
}


function handleStockCommand(stock, info) {
  let message = '';
  let stockInfo = {};
  if (stock) {
    stockInfo = getStockInfo(stock);
    if (stockInfo.hasOwnProperty('message')) {
      return 'Ação não encontrada (Somente IBOVESPA aceito)';
    }
    if (!info) {
      message = stockToString(stockInfo);
    } else if (info && stockInfo.hasOwnProperty('info')) {
      if ('number'.includes(typeof stockInfo[info])) {
        stockInfo[info] = stockInfo[info].toLocaleString('pt-BR', {minimumFractionDigits: 2});
        message = ` ${getKeyDescription(info)}: ${stockInfo[info]}`;
      } else {
        message = `A info. ${info} não foi encontrada`;
      }
    }
  } else {
    message = 'Informar ação. Ex.: /bolsa tots3';
  }

  return message;
}
