export default {
    transform: {
      "^.+\\.jsx?$": "babel-jest"  // Use babel-jest to transpile JavaScript/JSX files
    },
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy"
    }
  };
  