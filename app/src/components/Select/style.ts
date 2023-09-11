import create from '../../style/create';

export default create(({ palette, sizes }) => ({
  container: {
    // borderWidth: 1,
    // borderColor: palette.secondaryAccentColor,
    
    zIndex: 1
  },
  label: {
    color: palette.primaryColor,
    fontSize: sizes.inputs
  },
  picker: {
    backgroundColor: palette.backgroundColor,
    maxHeight: '400%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: '100%',
    overflow: 'scroll',
    scrollbarWidth: 'none'
  },
  pickerItem: {}
}));
