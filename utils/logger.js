export function logInfo(message, meta = {}) {
  console.log(
    JSON.stringify({
      level: "info",
      time: new Date().toISOString(),
      message,
      ...meta,
    })
  );
}

export function logError(message, meta = {}) {
  console.error(
    JSON.stringify({
      level: "error",
      time: new Date().toISOString(),
      message,
      ...meta,
    })
  );
}
