import React, { useEffect } from 'react'

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fa-check-circle'
      case 'error':
        return 'fa-exclamation-circle'
      case 'warning':
        return 'fa-exclamation-triangle'
      default:
        return 'fa-info-circle'
    }
  }

  const getColor = () => {
    switch (type) {
      case 'success':
        return '#28a745'
      case 'error':
        return '#dc3545'
      case 'warning':
        return '#ffc107'
      default:
        return '#17a2b8'
    }
  }

  return (
    <div
      className={`notification notification-${type}`}
      style={{
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: getColor(),
        color: 'white',
        padding: '15px 20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: 10000,
        maxWidth: '400px',
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease'
      }}
    >
      <div className="notification-content">
        <i className={`fas ${getIcon()}`}></i>
        <span>{message}</span>
        <button
          className="notification-close"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            marginLeft: '10px'
          }}
        >
          &times;
        </button>
      </div>
    </div>
  )
}

export default Notification
