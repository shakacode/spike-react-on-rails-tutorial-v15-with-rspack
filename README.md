# React on Rails Demo: SSR, Auto-Registration & Bundle Splitting with v15 and Rails 8

A fully working demo of React on Rails v15 on Rails 8, showcasing server-side rendering, auto-registration, and bundle splitting capabilities.

✅ **Includes:**
- **Server-Side Rendering (SSR)** - React components render on the server for faster initial page loads
- **Auto-Registration** - Components in `app/javascript/packs/ror_components/` are automatically discovered and registered
- **Bundle Splitting** - Automatic code splitting for optimized loading performance
- **CSS Modules** - Scoped CSS with automatic class name generation
- **Multiple Dev Modes** - HMR, static, and production-like development servers
- **Rails 8 Integration** - Latest Rails version with modern asset pipeline

📂 **Repo name:** `react_on_rails-demo-v15-ssr-auto-registration-bundle-splitting`

📚 **Part of the** [React on Rails Demo Series](https://github.com/shakacode?tab=repositories&q=react_on_rails-demo)

## 🚀 Quick Start

```bash
# Install dependencies
bundle && yarn

# Generate auto-registration files
bundle exec rake react_on_rails:generate_packs

# Start development server
./bin/dev
```

Visit http://localhost:3000 to see the demo in action.

## ⚠️ Important: Known Issue with Packs Generation

There's a bug in the `react_on_rails:generate_packs` task with CSS modules (see [#1768](https://github.com/shakacode/react_on_rails/issues/1768)).

**Problem**: The generator creates invalid JavaScript syntax when handling CSS modules:
```javascript
// ❌ Invalid (generated)
import HelloWorld.module from '../ror_components/HelloWorld.module.css';
ReactOnRails.register({HelloWorld, HelloWorld.module});
```

**Workaround**: After running the generator, manually fix the generated files by removing CSS module imports from the server bundle:

```javascript
// ✅ Fixed (manual)
import ReactOnRails from 'react-on-rails';
import HelloWorld from '../packs/ror_components/HelloWorld.jsx';

ReactOnRails.register({HelloWorld});
```

This demo has been manually fixed to work correctly with SSR.

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