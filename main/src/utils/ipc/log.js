const getPrefix = (level) => `[${level}]`;
const getMsg = (level, msg, dump={}) => 
  `${getPrefix(level)} ${msg} ${dump && Object.keys(dump).length > 0 ? ` - ${JSON.stringify(dump)}` : ''}`
;

const log = {
  error: (msg, dump={}) => console.error(getMsg('ERROR', msg, dump)),
  warn: (msg, dump={}) => console.warn(getMsg('WARN', msg, dump)),
  info: (msg, dump={}) => console.log(getMsg('INFO', msg, dump)),
};

module.exports = log;
