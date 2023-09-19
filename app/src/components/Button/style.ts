import create from '../../style/create';

export default create(({ palette, version }) => ({
  pressable: {
    alignItems: 'center',
    borderColor: palette[`${version}Color`],
    borderWidth: 2,
    color: palette[`${version}Color`],
    borderTopLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 150
  },
  pressed: {
    backgroundColor: palette.backgroundColor
  },
  text: {
    color: palette[`${version}Color`]
  }
}));
