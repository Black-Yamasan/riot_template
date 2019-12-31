module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
          ie: 11
        },
        useBuiltIns: 'entry',
        corejs: 3.6,
        modules: false,
      },
    ],
  ],
};