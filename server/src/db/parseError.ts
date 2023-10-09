import { ErrorPacketParams } from 'mysql2/promise';

export default (
  err: ErrorPacketParams
): {
  type: 'error';
  message: string;
} => {
  let statusMessage = 'Unknown error';

  if (err.code === 'ER_CHECK_CONSTRAINT_VIOLATED') {
    statusMessage = `Values are not valid.`;
  } else {
    console.log('Unhandled mysql error code', {
      ...err // Spread avoids logging of error's `stack`.
    });

    if (typeof err.code === 'string') {
      statusMessage = err.code;
    }
  }

  return {
    type: 'error',
    message: statusMessage
  };
};
