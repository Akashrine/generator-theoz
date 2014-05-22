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
  // Layout
  this.mkdir(designPath + '/default/template');
  this.mkdir(designPath + '/default/template/page');
  this.mkdir(designPath + '/default/template/page/html');
  // Category
  this.mkdir(designPath + '/default/template/catalog');
  this.mkdir(designPath + '/default/template/catalog/category');
  this.mkdir(designPath + '/default/template/catalog/category/navigation');
  this.mkdir(designPath + '/default/template/catalog/solr');
  this.mkdir(designPath + '/default/template/catalog/product');
  this.mkdir(designPath + '/default/template/catalog/product/list');
  this.mkdir(designPath + '/default/template/catalog/product/list/item');
  // Product View
  this.mkdir(designPath + '/default/template/catalog/product/view');
  this.mkdir(designPath + '/default/template/targetrule');
  this.mkdir(designPath + '/default/template/targetrule/catalog');
  this.mkdir(designPath + '/default/template/targetrule/catalog/product');
  this.mkdir(designPath + '/default/template/targetrule/catalog/product/list');
  this.mkdir(designPath + '/default/template/productalert');
  // Checkout
  this.mkdir(designPath + '/default/template/checkout');
  this.mkdir(designPath + '/default/template/checkout/cart');
  this.mkdir(designPath + '/default/template/checkout/cart/item');
  this.mkdir(designPath + '/default/template/checkout/threestep');
  this.mkdir(designPath + '/default/template/checkout/threestep/payment');
  // Customer
  this.mkdir(designPath + '/default/template/persistent');
  this.mkdir(designPath + '/default/template/persistent/customer');
  this.mkdir(designPath + '/default/template/persistent/customer/form');
  this.mkdir(designPath + '/default/template/customer');
  this.mkdir(designPath + '/default/template/customer/account');
  this.mkdir(designPath + '/default/template/customer/account/dashboard');
  this.mkdir(designPath + '/default/template/customer/form');
  this.mkdir(designPath + '/default/template/customer/address');
  this.mkdir(designPath + '/default/template/sales');
  this.mkdir(designPath + '/default/template/sales/order');
  this.mkdir(designPath + '/default/template/wishlist');
  // Search Results
  this.mkdir(designPath + '/default/template/catalogsearch');


  this.mkdir(skinPath);
  this.mkdir(skinPath + '/default');
  this.mkdir(skinPath + '/default/scss');
  this.mkdir(skinPath + '/default/images');
  this.mkdir(skinPath + '/default/css');
  this.mkdir(skinPath + '/default/fonts');

  /*Insert all xml
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
  */


  /*Generate all the app template files*/
  // Layout
  this.copy('1column.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default//template/page/1column.hbs');
  this.copy('header.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/page/html/header.hbs');
  this.copy('footer.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/page/html/footer.hbs');
  // Category
  this.copy('categoryview.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/category/view.hbs');
  this.copy('toolbar.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/list/toolbar.hbs');
  this.copy('list.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/list.hbs');
  this.copy('default.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/list/item/default.hbs');
  this.copy('static.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/list/item/static.hbs');
  this.copy('leftmenu.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/category/navigation/leftmenu.hbs');
  this.copy('solrnavigation.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/solr/navigation.hbs');
  // Product View
  this.copy('productview.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/view.hbs');
  this.copy('media.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/view/media.hbs');
  this.copy('mediafullscreen.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalog/product/view/mediafullscreen.hbs');
  this.copy('additional.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/targetrule/catalog/product/list/additional.hbs');
  this.copy('marketing.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/targetrule/catalog/product/list/marketing.hbs');
  this.copy('related.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/targetrule/catalog/product/list/related.hbs');
  this.copy('upsell.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/targetrule/catalog/product/list/upsell.hbs');
  // Add To Cart
  this.copy('confirmation.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/cart/item/confirmation.hbs');
  // Stock Alert
  this.copy('stockalert.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/productalert/stockalert.hbs');
   //Checkout
  this.copy('cart.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/cart.hbs');
  this.copy('threestep.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/threestep.hbs');
  this.copy('success.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/success.hbs');
  this.copy('failure.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/threestep/failure.hbs');
  this.copy('expire.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/threestep/expire.hbs');
  this.copy('methods.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/checkout/threestep/payment/mehtods.hbs');
  //Customer
  this.copy('login.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/persistent/customer/form/login.hbs');
  this.copy('register.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/persistent/customer/form/register.hbs');
  this.copy('customernavigation.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/account/navigation.hbs');
  this.copy('dashboard.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/account/dashboard.hbs');
  this.copy('address.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/account/dashboard/address.hbs');
  this.copy('customerinfo.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/account/dashboard/info.hbs');
  this.copy('customeredit.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/form/edit.hbs');
  this.copy('forgotpassword.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/form/forgotpassword.hbs');
  this.copy('newsletter.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/form/newsletter.hbs');
  this.copy('resetforgottenpassword.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/form/resetforgottenpassword.hbs');
  this.copy('book.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/address/book.hbs');
  this.copy('addressedit.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/customer/address/edit.hbs');
  this.copy('history.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/sales/order/history.hbs');
  this.copy('orderinfo.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/sales/order/info.hbs');
  this.copy('recent.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/sales/order/recent.hbs');
  this.copy('shipment.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/sales/order/shipment.hbs');
  this.copy('wishlistview.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/wishlist/view.hbs');
  // Search Results
  this.copy('result.hbs', 'theme/app/design/frontend/'+ this.designPackage + '/default/template/catalogsearch/result.hbs');

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