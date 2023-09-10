import create from '../../style/create';

export default create(({
  palette
}) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  label: {
    color: palette.primaryColor,
    fontSize: 16,
    marginRight: 10,
    flex: 1
  },
  input: {
    color: palette.primaryColor,
    textAlign: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16
  }
}));
