/* eslint-env node */
const { getDefaultConfig } = require("expo/metro-config")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

// 1. SVG Transformer Configuration
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  getTransformOptions: async () => ({
    transform: {
      inlineRequires: true,
    },
  }),
}

// 2. SVG Resolver Configuration
config.resolver = {
  ...config.resolver,
  // Filter out svg from assetExts and add it to sourceExts
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg", "cjs"],
  
  // Fix for axios/apisauce - use react-native instead of browser condition
  unstable_conditionNames: ["require", "default", "react-native"],
  
  // Force react-native field resolution priority
  resolverMainFields: ["react-native", "browser", "main"],
}

module.exports = config