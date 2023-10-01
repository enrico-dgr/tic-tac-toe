export default <T extends Object>(
  res: T
): {
  type: 'success';
} & T => ({
  type: 'success',
  ...res
});
