function getCleanParams(params) {

  const cleanParams = [];
  const indexes = getIndices(params);
  let indexesSingleWords = [];

  if (indexes.length % 2 !== 0) {
    indexesSingleWords = getSingleWords(params);

    if (indexesSingleWords.length > 0 && indexesSingleWords.length !== indexes.length) {
      return null;
    }

  }

  let hasOpenQuote = false;
  let quotedString = '';

  params.forEach(str => {

    if (str.includes('"')) {
      hasOpenQuote = !hasOpenQuote;

      if (!hasOpenQuote || str.startswith('"') && str.endswith('"')) {
        cleanParams.push(
          (quotedString + str).trim().replace('"', ''));
        quotedString = "";
        hasOpenQuote = false;
        loop;
      }

    }

    if (hasOpenQuote) {
      quotedString += `${str} `;
    } else if (!str.includes('"') && str !== ' ') {
      cleanParams.push(str);
    }

  });

  return cleanParams;
}

function getIndices(params) {

  const indices = [];

  for (let i = 0; i <= params.length; i++) {
    if (params[i] && params[i].includes('"')) {
      indices.push(i);
    }
  }

  return indices;
}

function getSingleWords(params) {

  const indices = [];

  for (let i = 0; i <= params.length; i++) {
    if (params[i].startswith('"') && params[i].endswith('"')) {
      indices.push(i);
    }
  }

  return indices;
}

function handleCommand(command, params) {

  const commandDef = COMMANDS.find(c => c.command == command);

  if (!commandDef) {
    return;
  }

  const commandFn = commandDef['function'];
  let args = [...commandDef['args']];

  if (commandDef['acceptParams'] && params.length) {
    cleanParams = getCleanParams(params);
    if (!cleanParams) {
      return 'Formatação incorreta dos parâmetros';
    }
    args = [...args, ...cleanParams];
  } else {
    args = [...args, ...params];
  }

  if (commandFn.length >= args.length) {
    return commandFn.apply(null, args);
  } else {
    return 'Número de parâmetros passado incorreto';
  }
}

const stock_command = {
  command: '/bolsa',
  function: handleStockCommand,
  args: [],
  acceptParams: true,
  description: 'Retorna informações sobre a ação informada no parâmetro. Segundo parâmetro é opcional. Ex.: /bolsa tots3 [high]'
};

const save_command = {
  command: '/salvar',
  function: handleSaveCommand,
  args: [],
  acceptParams: true,
  description: 'Salva um valor. Ex.: /bolsa oi'
};

const restore_command = {
  command: '/restaurar',
  function: handleRestoreCommand,
  args: [],
  acceptParams: false,
  description: 'Restaura o valor salvo'
};

const COMMANDS = [];

COMMANDS.push(stock_command);
COMMANDS.push(save_command);
COMMANDS.push(restore_command);