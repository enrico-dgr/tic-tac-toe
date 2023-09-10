import create from '../../style/create';

export default create(({ palette }) => ({
  container: {
    marginVertical: 8
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  picker: {
    backgroundColor: palette.backgroundColor,
    height: 50,
    width: '100%',
    position: 'absolute'
  }
}));
