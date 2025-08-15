// 404 handler
export function notFound(req, res, _next) {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl })
}

// Centralized error handler
export function errorHandler(err, _req, res, _next) {
  const status = err.status || 500
  const message = err.message || 'Internal Server Error'
  const details = process.env.NODE_ENV === 'development' ? err.stack : undefined
  res.status(status).json({ error: message, status, details })
}
