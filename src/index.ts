import logger from './lib'

logger.error('abc123', 'This is an error message')
logger.warn('def456', 'This is a warning message')
logger.info('ghi789', 'This is an info message')
logger.debug('jkl012', 'This is a debug message')
logger.trace('mno345', 'This is a trace message')

// Test different data types
logger.error('pqr678', 123)
logger.warn('stu901', true)
logger.info('vwx234', { key: 'value' })
logger.debug('yz5678', [1, 2, 3])
logger.trace('abc999', new Error('This is an error object'))
