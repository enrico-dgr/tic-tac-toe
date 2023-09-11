import create from '../../style/create';

export default create(({ palette }) => ({
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
  inputContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: palette.primaryAccentColor,
    padding: 10
  },
  inputText: {
    color: palette.primaryColor,
    textAlign: 'center',
    fontSize: 16
  }
}));
