const alertStyles = {
  success: 'border-green-200 bg-green-50 text-green-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
}

function Alert({ type = 'info', message, onClose }) {
  if (!message) return null

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`flex items-start justify-between gap-4 rounded-lg border p-4 text-sm ${
        alertStyles[type] || alertStyles.info
      }`}
    >
      <p>{message}</p>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="font-bold hover:opacity-70"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Alert
