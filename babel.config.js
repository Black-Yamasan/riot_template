module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        useBuiltIns: 'entry',
        modules: false,
      },
    ],
  ],
};