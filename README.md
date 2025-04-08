# Sanskrit Audio Visualizer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Interactive visualization tool for Sanskrit audio analysis and recitation.

## Features
- Real-time audio visualization
- Sanskrit text-to-speech
- Frequency and rhythm analysis
- Audio file processing and export

## Project Structure
```
/src
  /components    - React components
  /visualizations- Audio visualization components
  /controls     - UI control components
  /hooks        - Custom React hooks
  /utils        - Utility functions
  /services     - Core services
```

## Setup
```bash
npm install
npm run dev
```

## Development

### Prerequisites
- Node.js >= 18
- npm >= 9

### Running Tests
```bash
npm test
```

### Building for Production
```bash
npm run build
```

## Contributing
We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

## Code of Conduct
This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Usage Guide
See [USER_GUIDE.md](./docs/USER_GUIDE.md) for detailed usage instructions.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
