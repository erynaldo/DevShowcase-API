const pad = value => String(value).padStart(2, '0');

const formatDateTime = value => {
  if (!value) return value;
  const date = value instanceof Date ? value : new Date(value);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} / ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}`;
};

module.exports = { formatDateTime };
