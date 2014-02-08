
/*
 *  Landing Page App 
 *
 *  Right now, this file is responsible for landing page URLs
 *  and which controllers and templates are used.
 *
 *  The app uses angular.js, a MVC front-end framework.
 *
 *  -- Some of the critical files --
 *  App:               landing-pages/js/app.js
 *  Controllers:       landing-pages/js/controllers.js
 *  Directives:        landing-pages/js/directives.js 
 *                                     /card-directives.js 
 *                                     /iris-directives.js
 *                                     /mv-directives.js 
 *  Views (templates): landing-pages/views/* 
 *
*/


var app = angular.module('landing-pages', 
    ['lp-directives', 'card-directives',
     'mv-directives', 'trees-directives', 
     'ws-directives', 'narrative-directives', 'ui.router', 'kbaseLogin', 'FeedLoad', 'ui.bootstrap'])
    .config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', 
    function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {

    // with some configuration, we can change this in the future.
    $locationProvider.html5Mode(false);  

    $stateProvider
        .state('narrative', {
          url: "/narrative/",
          templateUrl: 'views/narrative/login.html',
          controller: 'Narrative'
        })

    $stateProvider
        .state('home', {
          url: "/narrative/home/",
          templateUrl: 'views/narrative/home.html',
          controller: 'Narrative'
        }).state('home.projects', {
          url: "projects/",
          templateUrl: 'views/narrative/projects.html',
          controller: 'NarrativeProjects'
        }) 


    $stateProvider
        .state('ws', {
          url: "/ws/",
          templateUrl: 'views/ws/ws.html',
          controller: 'WorkspaceBrowser'
        }).state('ws.id', {
          url: "objtable/:ws",
          templateUrl: 'views/ws/objtable.html',
          controller: 'WorkspaceBrowser'
        })


    $stateProvider
        .state('mv', {
          url: "/mv/",
          templateUrl: 'views/mv/mv.html',
          controller: 'ModelViewer'
        })   
        
        .state('mv.objtable', {
          url: "objtable/?selected_ws&ws&ids",
          templateUrl: 'views/mv/objtable.html',
          controller: 'ModelViewer'
        })
        /*
        .state('mv.objtable.selectedobjs', {
          url: "?selected_ws&ws&ids",
          templateUrl: 'views/mv/objtable.html',
          controller: 'ModelViewer'
        })*/       
        .state('mv.core', {
            url: "core/?ws&ids",
            templateUrl: 'views/mv/core.html',
            controller: 'ModelViewer'
        })
        .state('mv.heatmap', {
            url: "heatmap/?ws&ids",
            templateUrl: 'views/mv/heatmap.html',
            controller: 'ModelViewer'
        })
        .state('mv.tree', {
            url: "tree/?ws&ids",
            templateUrl: 'views/mv/tree.html',
            controller: 'ModelViewer'
        })        

    $stateProvider
        .state('trees', {
          url: "/trees/",
          templateUrl: 'views/trees/trees.html',
          controller: 'Trees'
        })

    $stateProvider
        .state('rxns',
            {url:'/rxns', 
             templateUrl: 'views/object-list.html',
             controller: 'WSObjects'}) 
        .state('rxnsids', {
            url: "/rxns/:ids",
            templateUrl: 'views/objects/rxn.html',
            controller: 'RxnDetail'
        })



    $stateProvider
        .state('cpds',
            {url:'/cpds', 
             templateUrl: 'views/object-list.html',
             controller: 'WSObjects'})   
        .state('cpdsids',
            {url:'/cpds/:ids', 
             templateUrl: 'views/objects/cpd.html',
             controller: 'CpdDetail'
         })       

    $stateProvider
        .state('models', {
             url: '/models',
             templateUrl: 'views/object-list.html',
             controller: 'WSObjects'})  
        .state('modelsbyws', {
             url: '/models/:ws',
             templateUrl: 'views/object-list.html',
             controller: 'WSObjects'})
        .state('modelbyid', {
             url: '/models/:ws/:id',
             templateUrl: 'views/objects/model.html',
             controller: 'ModelDetail'})

    $stateProvider
        .state('modelcards', {
             url: '/cards/models/:ws/:id',
             templateUrl: 'views/objects/modelcards.html',
             controller: 'ModelDetailCards'})

    $stateProvider
        .state('fbasbyws', {
                url:'/fbas/:ws', 
                templateUrl: 'views/object-list.html',
                controller: 'WSObjects'})
        .state('fbabyid', {
                url: '/fbas/:ws/:id',
                templateUrl: 'views/objects/fba.html',
                controller: 'FBADetail'})
        .state('fbacards', {
                url: '/cards/fbas/:ws/:id',
                templateUrl: 'views/objects/fbacards.html',
                controller: 'FBADetailCards'})

    $stateProvider
        .state('media',
            {url:'/media',
            templateUrl: 'views/object-list.html',
             controller: 'WSObjects'})
        .state('mediabyws',
            {url:'/media/:ws',
             templateUrl: 'views/object-list.html',
             controller: 'WSObjects'})
        .state('mediabyid',
            {url:'/media/:ws/:id',
             templateUrl: 'views/objects/media.html',
             controller: 'MediaDetail'})

    $stateProvider
        .state('mvhelp',
            {url: '/mv-help',
             templateUrl: 'views/mv/mv-help.html',
             controller: 'MVHelp'})


    $stateProvider
        .state('genomes',
            {url: '/genomes/CDS/:id',
             templateUrl: 'views/objects/genome.html',
             controller: 'GenomeDetail'})

    $stateProvider
        .state('genomesbyws',
            {url: '/genomes/:ws',
             templateUrl: 'views/objects/genome.html',
             controller: 'GenomeDetail'})

    $stateProvider
        .state('genomesbyid',
            {url: '/genomes/:ws/:id',
             templateUrl: 'views/objects/genome.html',
             controller: 'GenomeDetail'})

    $stateProvider
        .state('kbgenomes',
            {url: '/KBaseGenomes.Genome/CDS/:id',
             templateUrl: 'views/objects/genome.html',
             controller: 'GenomeDetail'})

    $stateProvider
        .state('kbgenomesbyws',
            {url: '/KBaseGenomes.Genome/:ws',
             templateUrl: 'views/objects/genome.html',
             controller: 'GenomeDetail'})

    $stateProvider
        .state('kbgenomesbyid',
            {url: '/KBaseGenomes.Genome/:ws/:id',
             templateUrl: 'views/objects/genome.html',
             controller: 'GenomeDetail'})


    $stateProvider
        .state('genes',
            {url: '/genes/CDS/:fid',
             templateUrl: 'views/objects/gene.html',
             controller: 'GeneDetail'})

    $stateProvider
        .state('genesbycdsgenome',
            {url: '/genes/CDS/:gid/:fid',
             templateUrl: 'views/objects/gene.html',
             controller: 'GeneDetail'})

    $stateProvider
        .state('genesbyws',
            {url: '/genes/:ws/:fid',
             templateUrl: 'views/objects/gene.html',
             controller: 'GeneDetail'})

    $stateProvider
        .state('genesbywsgenome',
            {url: '/genes/:ws/:gid/:fid',
             templateUrl: 'views/objects/gene.html',
             controller: 'GeneDetail'})

    $stateProvider
        .state('meme',
            {url:'/meme',
             templateUrl: 'views/meme-list.html',
             controller: 'WSObjects'})
        .state('memebyws',
            {url: '/meme/:ws',
             templateUrl: 'views/meme-list.html',
             controller: 'WSObjects'})
        .state('memebyname',
            {url: '/meme/:ws/:id',
             templateUrl: 'views/objects/meme.html',
             controller: 'MemeDetail'})

    $stateProvider
        .state('cmonkeybyname',
            {url: '/cmonkey/:ws/:id',
             templateUrl: 'views/objects/cmonkey.html',
             controller: 'CmonkeyDetail'})

    $stateProvider
        .state('inferelator',
            {url: '/inferelator/:ws/:id',
             templateUrl: 'views/objects/inferelator.html',
             controller: 'InferelatorDetail'})

    $stateProvider
        .state('regprecise',
            {url: '/regprecise/:ws/:id',
             templateUrl: 'views/objects/regprecise.html',
             controller: 'RegpreciseDetail'})

    $stateProvider
        .state('mak',
            {url: '/mak/:ws/:id',
             templateUrl: 'views/objects/mak.html',
             controller: 'MAKDetail'})

    $stateProvider
        .state('spec',
            {url: '/spec/:kind/:id',
             templateUrl: 'views/objects/spec.html',
             controller: 'SpecDetail'})

    $stateProvider
        .state('bambibyid',
            {url: '/bambi/:ws/:id',
            templateUrl: 'views/objects/bambi.html',
             controller: 'BambiDetail'})

    $stateProvider
	.state('ppid',
	   {url: '/ppid/:ws/:id',
	    templateUrl: 'views/objects/ppid.html',
	    controller: 'PPIDetail'})

    $stateProvider
        .state('landing-pages-help',
            {url: '/landing-pages-help',
             templateUrl: 'views/landing-pages-help.html',
             controller: LPHelp})

    $urlRouterProvider.when('', '/narrative/');

    $stateProvider
        .state('otherwise', 
            {url: '*path', 
             templateUrl : 'views/404.html'})

}])

//add the login widget as a module
var kbaseLogin = angular.module('kbaseLogin', []);
kbaseLogin.factory('kbaseLogin', function() {
  return $('#signin-button').kbaseLogin(); // assumes underscore has already been loaded on the page
});

//add the Google Feeds API as a module
var Feed = angular.module('FeedLoad', ['ngResource'])
    .factory('FeedLoad', function ($resource) {
        return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
            fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
        });
    });

configJSON = $.parseJSON( $.ajax({url: "config.json", 
                             async: false, 
                             dataType: 'json'}).responseText )


app.run(function ($rootScope, $state, $stateParams, $location) {

    var HELP_DROPDOWN = '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Help <b class="caret"></b></a> \
                 <ul class="dropdown-menu"> \
                 <li><a href="http://kbase.us/for-users/narrative-quick-start/">Narrative Quick Start Guide</a></li> \
                 <li><a href="#/landing-pages-help">Landing Page Documentation</a></li> \
                 <li><a href="mailto:help@kbase.us">Email help@kbase.us</a></li> \
              </ul>';
    $('.help-dropdown').html(HELP_DROPDOWN);              

    //  Things that need to happen when a view changes.
    $rootScope.$on('$stateChangeSuccess', function() {
        $('.fixedHeader').remove(); // fixme
        removeCards();
    })

    // sign in button
    $('#signin-button').kbaseLogin({login_callback: login_change,
                                    logout_callback: login_change});
    $('#signin-button').css('padding', '0');  // Jim!

    USER_ID = $("#signin-button").kbaseLogin('session').user_id;
    USER_TOKEN = $("#signin-button").kbaseLogin('session').token;
    kb = new KBCacheClient(USER_TOKEN);

    // Fixme, check before load
    if (typeof USER_ID == 'undefined') $rootScope.$apply($location.path( '/narrative/' ) );

    // global state object to store state
    state = new State();

    // Critical: used for navigation urls and highlighting
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});


/*
 *   landing page app helper functions
 */


function login_change() {
    window.location.reload();
    set_cookie();
}

function get_selected_ws() {
    if (state.get('selected')) {
        return state.get('selected')[0];
    }
}


function removeCards() {
    $(".ui-dialog").remove();    
    //$("#genomes").KBaseCardLayoutManager("destroy");
}


function set_cookie() {
   var c = $("#signin-button").kbaseLogin('get_kbase_cookie');
   console.log( 'Setting kbase_session cookie');
   $.cookie('kbase_session',
    'un=' + c.user_id
    + '|'
    + 'kbase_sessionid=' + c.kbase_sessionid
    + '|'
    + 'user_id=' + c.user_id
    + '|'
    + 'token=' + c.token.replace(/=/g, 'EQUALSSIGN').replace(/\|/g,'PIPESIGN'),
    { path: '/'});
   $.cookie('kbase_session',
    'un=' + c.user_id
    + '|'
    + 'kbase_sessionid=' + c.kbase_sessionid
    + '|'
    + 'user_id=' + c.user_id
    + '|'
    + 'token=' + c.token.replace(/=/g, 'EQUALSSIGN').replace(/\|/g,'PIPESIGN'),
    { path: '/',
      domain: 'kbase.us' });
};



// These are some jquery plugs that you can use to add and remove a 
// loading giff to a dom element.  This is easier to maintain, and likely less 
// code that using CSS classes.
$.fn.loading = function(text) {
    $(this).rmLoading()

    if (text) {
        $(this).append('<p class="text-muted loader"> \
             <img src="assets/img/ajax-loader.gif"> '+text+'</p>');
    } else {
        $(this).append('<p class="text-muted loader"> \
             <img src="assets/img/ajax-loader.gif"> loading...</p>')        
    }
    return this;
}

$.fn.rmLoading = function() {
    $(this).find('.loader').remove();
}



/*
 *  Object to store state in local storage.  We should use this.
 */
function State() {
    // Adapted from here: http://diveintohtml5.info/storage.html
    var ls;
    try {
        ls = 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        ls = false;
    }

    //var user = (auth.isLoggedIn() ? auth.getUserData().user_id : 'public');

    this.get = function(key) {
        if (!ls) {
            return null;
        }

        //key = user + '.' + key;

        var val = localStorage.getItem(key);

        try {
            val = JSON.parse(val);
        } catch(e) {
            return null;
        };

        return val;
    };

    this.set = function(key, val) {
        if (!ls) {
            return null;
        }

        //key = user + '.' + key;
        
        try {
            val = JSON.stringify(val);
        } catch(e) {
            return null;
        }

        return localStorage.setItem(key, val);
    };
}




/*!
 * jQuery Browser Plugin v0.0.5
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2013 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 2013-07-29T17:23:27-07:00
 */
(function( jQuery, window, undefined ) {
"use strict";

var matched, browser;

jQuery.uaMatch = function( ua ) {
  ua = ua.toLowerCase();

        var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
                /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [];

        var platform_match = /(ipad)/.exec( ua ) ||
                /(iphone)/.exec( ua ) ||
                /(android)/.exec( ua ) ||
                /(windows phone)/.exec(ua) ||
                /(win)/.exec( ua ) ||
                /(mac)/.exec( ua ) ||
                /(linux)/.exec( ua ) ||
                [];

        return {
                browser: match[ 3 ] || match[ 1 ] || "",
                version: match[ 2 ] || "0",
                platform: platform_match[0] || ""
        };
};

matched = jQuery.uaMatch( window.navigator.userAgent );
browser = {};

if ( matched.browser ) {
        browser[ matched.browser ] = true;
        browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
}

if ( matched.platform ) {
        browser[ matched.platform ] = true;
}

// Chrome, Opera 15+ and Safari are webkit based browsers
if ( browser.chrome || browser.opr || browser.safari ) {
        browser.webkit = true;
}

// IE11 has a new token so we will assign it msie to avoid breaking changes
if ( browser.rv )
{
        var ie = 'msie';

        matched.browser = ie;
        browser[ie] = true;
}

// Opera 15+ are identified as opr
if ( browser.opr )
{
        var opera = 'opera';

        matched.browser = opera;
        browser[opera] = true;
}

// Stock Android browsers are marked as safari on Android.
if ( browser.safari && browser.android )
{
        var android = 'android';

        matched.browser = android;
        browser[android] = true;
}

// Assign the name and platform variable
browser.name = matched.browser;
browser.platform = matched.platform;


jQuery.browser = browser;

})( jQuery, window );
