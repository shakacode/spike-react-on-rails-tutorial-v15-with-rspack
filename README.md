# React on Rails v15 Tutorial

A comprehensive tutorial application demonstrating React on Rails v15 features including auto-registration, server-side rendering, and bundle splitting.

## 🚀 Quick Start

```bash
# Install dependencies
bundle && npm install

# Run development server (HMR mode)
./bin/dev

# Alternative development modes:
./bin/dev static    # Static development (no HMR, no FOUC)
./bin/dev prod      # Production-like assets
./bin/dev help      # Show all options
```

Visit [http://localhost:3000](http://localhost:3000) to see the app!

## 📖 What This Tutorial Demonstrates

This application showcases the following React on Rails v15 features:

### 🔧 Auto-Registration
- **Automatic component discovery** from `app/javascript/packs/ror_components/`
- **No manual bundle registration** required
- **Zero-config code splitting** with Shakapacker nested_entries

### 🖥️ Server-Side Rendering (SSR)
- **React components render on the server** for better SEO and performance
- **Isomorphic JavaScript** - same code runs on client and server
- **Node.js execution pools** for efficient server rendering

### 📦 Bundle Splitting
- **HelloWorld**: Lightweight component (~5KB) 
- **HeavyMarkdownEditor**: Heavy component (~300KB+) with markdown editing
- **Automatic code splitting** - users only download what they need

### 🛠️ Enhanced Development Experience
- **Multiple dev modes**: HMR, static, and production-like
- **Hot Module Replacement** for instant feedback
- **Source maps** for debugging
- **CSS Modules** support

## 🏗️ Architecture

### Technology Stack
- **Rails 8.0.2** - Web framework (minimal setup, no asset pipeline)
- **React 19.1.1** - UI library with modern features
- **React on Rails 15.0.0** - Integration layer
- **Shakapacker 8.3.0** - Webpack integration with auto-registration support

### Project Structure
```
app/
  controllers/
    hello_world_controller.rb     # Rails controller
  views/
    hello_world/
      index.html.erb              # HelloWorld page
      markdown_editor.html.erb    # Markdown editor page
    layouts/
      hello_world.html.erb        # Layout (auto-bundle loading)
  javascript/
    packs/
      ror_components/             # Auto-registration directory
        HelloWorld.jsx            # Simple React component
        HelloWorld.module.css     # CSS modules
        HeavyMarkdownEditor.jsx   # Complex component
        HeavyMarkdownEditor.module.css
config/
  initializers/
    react_on_rails.rb            # Auto-registration config
  webpack/                       # Webpack configurations
bin/
  dev                            # Enhanced development script
```

### Key Configuration Files

**`config/initializers/react_on_rails.rb`**
```ruby
ReactOnRails.configure do |config|
  config.components_subdirectory = "ror_components"  # Auto-discovery
  config.auto_load_bundle = true                     # Auto-loading
  config.server_bundle_js_file = "server-bundle.js"  # SSR bundle
end
```

**`config/shakapacker.yml`**
```yaml
default: &default
  nested_entries: true  # Required for auto-registration
  source_entry_path: packs
```

## 🎯 Tutorial Steps (Commit History)

This repository was built step-by-step with educational commits:

1. **Rails 8 Base Setup** - Minimal Rails app without JS frameworks
2. **Shakapacker Installation** - Webpack integration with nested_entries
3. **React on Rails Setup** - Install gem and generate initial files
4. **Enhanced Dev Script** - Multi-mode development support
5. **Auto-Registration** - Enable automatic component discovery
6. **SSR Enablement** - Server-side rendering for better performance
7. **Navigation & Routing** - Basic app navigation structure
8. **Bundle Splitting Demo** - Heavy component with automatic splitting

Each commit includes detailed explanations of what was added and why.

## 🔄 Development Modes

### HMR Mode (Default)
```bash
./bin/dev
```
- **Hot Module Replacement** for instant updates
- **Fast recompilation** on file changes
- **May have FOUC** (Flash of Unstyled Content)
- Best for: **Active development**

### Static Mode
```bash
./bin/dev static
```
- **No HMR** but with auto-recompilation
- **CSS extracted** to separate files (no FOUC)
- **Development environment** with source maps
- Best for: **Testing without HMR side effects**

### Production Mode
```bash
./bin/dev prod
```
- **Optimized bundles** with minification
- **Production-like environment**
- **Runs on port 3001**
- Best for: **Testing production builds**

## 📊 Bundle Analysis

You can analyze bundle sizes with:

```bash
# Generate production bundles
RAILS_ENV=production NODE_ENV=production bin/shakapacker

# Check bundle sizes
ls -la public/packs/js/
```

Expected results:
- `HelloWorld-*.js` - Small bundle (~5-10KB)
- `HeavyMarkdownEditor-*.js` - Large bundle (~300KB+)
- `server-bundle.js` - Server rendering bundle

## 🧪 Testing the Features

### Test Auto-Registration
1. Visit `/hello_world` - should load HelloWorld component
2. Check network tab - only HelloWorld bundle loads
3. Visit `/markdown_editor` - should load markdown editor
4. Check network tab - HeavyMarkdownEditor bundle loads separately

### Test Server-Side Rendering
1. Disable JavaScript in browser
2. Visit pages - content should still be visible
3. View page source - React HTML should be pre-rendered

### Test Bundle Splitting
1. Open browser DevTools → Network tab
2. Visit HelloWorld page - note small bundle size
3. Navigate to Markdown Editor - note additional bundle loads
4. Go back to HelloWorld - no additional downloads needed

## 🚀 Deployment

For production deployment:

1. **Precompile assets**: `RAILS_ENV=production bundle exec rails assets:precompile`
2. **Set environment variables** for your deployment platform
3. **Configure database** for production
4. **Set up Node.js** for server-side rendering

## 🤝 Contributing

This is a tutorial application, but improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Submit a pull request

## 📚 Learn More

- [React on Rails Documentation](https://github.com/shakacode/react_on_rails)
- [Shakapacker Guide](https://github.com/shakacode/shakapacker)
- [Rails 8 Release Notes](https://guides.rubyonrails.org/8_0_release_notes.html)
- [React 19 Documentation](https://react.dev)

---

**Built with ❤️ using React on Rails v15**