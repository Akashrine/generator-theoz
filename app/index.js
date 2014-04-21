'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var wrench = require('wrench');

var TheozGenerator = module.exports = function TheozGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  //this.testFramework = 'mocha';
  // resolved to mocha by default
  //this.hookFor('mocha', { as: 'app' });

  // this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TheozGenerator, yeoman.generators.Base);

TheozGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);
  console.log('The Oz Generator');

  var prompts = [{
    name: 'projectName',
    message: 'Nom du projet'
  },{
    name: 'magentoVersion',
    message: 'Quelle version de magento',
    default: '1.8.1.0'
  },{
    name: 'designPackage',
    message: 'Name of design package to create',
    default: 'custom'
  },{
    type: 'checkbox',
    name: 'features',
    message: 'What would you like to include?',
    choices: [{
      name: 'Sass with Compass',
      value: 'includeCompass',
      default: true
    }]
  }];

  this.prompt(prompts, function (props) {
    var features = props.features;
    this.projectName = props.projectName;
    this.magentoVersion = props.magentoVersion;
    this.designPackage = props.designPackage;

    function hasFeature(feat) {
      return features.indexOf(feat) !== -1;
    }

    this.includeCompass = hasFeature('includeCompass');
    cb();
  }.bind(this));
};

TheozGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

TheozGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

TheozGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

TheozGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

TheozGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

TheozGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

TheozGenerator.prototype.router = function router() {
  this.copy('router.php', 'router.php');
}

TheozGenerator.prototype.download = function download() {
  var cb = this.async(),
    url = 'http://www.magentocommerce.com/downloads/assets/' + this.magentoVersion + '/magento-' + this.magentoVersion + '.tar.gz';

  this.tarball(url, './', function(err) {
    if (err) return done(err);
    cb();
  });
};




// TheozGenerator.prototype.writeIndex = function writeIndex() {};

TheozGenerator.prototype.scaffolding = function scaffolding() {


this.mkdir('theme');
  wrench.chmodSyncRecursive('theme', '777');
  var ignores = [
    '.git',
    'CHANGELOG.md',
    'CONTRIBUTING.md',
    'LICENSE.md',
    'README.md'
  ];
  var designPath = 'theme/app/design/frontend/' + this.designPackage,
    skinPath = 'theme/skin/frontend/' + this.designPackage;

  this.mkdir(designPath);
  this.mkdir(designPath + '/default');
  this.mkdir(designPath + '/default/layout');
  this.mkdir(designPath + '/default/template');
  this.mkdir(designPath + '/default/template/catalog');
  this.mkdir(designPath + '/default/template/catalog/product');
  this.mkdir(designPath + '/default/template/catalog/product/list');
  this.mkdir(designPath + '/default/template/catalog/product/view');
  this.mkdir(designPath + '/default/template/catalogsearch');
  this.mkdir(designPath + '/default/template/checkout');
  this.mkdir(designPath + '/default/template/newsletter');
  this.mkdir(designPath + '/default/template/page');
  this.mkdir(designPath + '/default/template/page/html');
  this.mkdir(designPath + '/default/template/sample');

  this.mkdir(skinPath);
  this.mkdir(skinPath + '/default');
  this.mkdir(skinPath + '/default/scss');
  this.mkdir(skinPath + '/default/images');
  this.mkdir(skinPath + '/default/css');
  this.mkdir(skinPath + '/default/fonts');

  this.mkdir('js/vendor');

  /*Insert all xml*/
    this.copy('widget.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/etc/widget.xml');

    this.copy('catalog.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/catalog.xml');
    this.copy('catalogsearch.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/catalogsearch.xml');
    this.copy('checkout.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/checkout.xml');
    this.copy('contacts.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/contacts.xml');
    this.copy('customer.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/customer.xml');
    this.copy('local.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/local.xml');
    this.copy('newsletter.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/newsletter.xml');
    this.copy('page.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/page.xml');
    this.copy('payment.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/payment.xml');
    this.copy('persistent.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/persistent.xml');
    this.copy('review.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/review.xml');
    this.copy('rss.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/rss.xml');
    this.copy('sales.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/sales.xml');
    this.copy('sendfriend.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/sendfriend.xml');
    this.copy('tag.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/tag.xml');
    this.copy('wishlist.xml', 'theme/app/design/frontend/'+ this.designPackage + '/default/layout/wishlist.xml');



  /*Generate all the app template files*/
  this.copy('upsell.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/list/upsell.phtml');
  this.copy('media.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/view/media.phtml');
  this.copy('tabs.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/view/tabs.phtml');
  this.copy('list.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/list.phtml');
  this.copy('view.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/view.phtml');
  this.copy('form.mini.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalogsearch/form.mini.phtml');
  this.copy('cart.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/cart.phtml');
  this.copy('subscribe.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/newsletter/subscribe.phtml');
  this.copy('3columns.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/page/3columns.phtml');
  this.copy('footer.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/page/html/footer.phtml');
  this.copy('header.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/page/html/header.phtml');
  this.copy('home.phtml', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/sample/home.phtml');

  this.directory('scss', 'theme/skin/frontend/' + this.designPackage + '/default/scss/');
  this.expandFiles('*.scss').forEach(function (el) {
      if (ignores.indexOf(el) === -1) {
        this.copy(el,el);
      }
    }, this);

};

TheozGenerator.prototype.permissions = function permissions() {

  wrench.chmodSyncRecursive('app/etc', '777');
  wrench.chmodSyncRecursive('media', '777');
  wrench.chmodSyncRecursive('var', '777');
};