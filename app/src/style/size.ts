export type Device = 'Desktop';

export type DeviceSizes = {
  inputs: number;
};

const desktop: DeviceSizes = {
  inputs: 16
};

export const getDeviceSizes = (device: Device): DeviceSizes => {
  if (device === 'Desktop') {
  }
  return desktop;
};
