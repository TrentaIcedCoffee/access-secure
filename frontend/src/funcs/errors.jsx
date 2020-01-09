class DebugError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DebugError';
  }
}

export { DebugError };