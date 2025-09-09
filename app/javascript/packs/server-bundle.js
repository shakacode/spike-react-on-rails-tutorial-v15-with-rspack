// import statement added by react_on_rails:generate_packs rake task
import "./../generated/server-bundle-generated.js"
import ReactOnRails from 'react-on-rails';

import HelloWorld from '../bundles/HelloWorld/components/HelloWorldServer';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
});
