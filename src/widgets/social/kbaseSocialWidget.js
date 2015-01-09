define(['nunjucks', 'jquery'], function (nunjucks, $) {
    "use strict";

    var SocialWidget = Object.create({}, {

        // The init function interfaces this object with the caller, and sets up any 
        // constants and constant state.
        SocialWidget_init: {
            value: function (cfg) {                
                this._generatedId = 0; 

                // The widget requires a container to attach content to
                if (!cfg.container) {
                  throw 'Widget container is required';
                }
                this.container = cfg.container;
                if (typeof this.container === 'string') {
                    this.container = $(this.container);
                }

                // The widget requires a name to use for various purposes.
                if (!cfg.name) {
                  throw 'Widget name is required';
                }
                this.widgetName = cfg.name;
                
                if (!cfg.title) {
                  throw 'Widget title is required';
                }
                this.widgetTitle = cfg.title;
                


                this.messages = [];


                // TODO: FIX THIS!!!

                // User state.
                // TODO: the user state should ideally be taken from an api call to the 
                // login widget or ... ?
                // ATM though it is provided by the calling environment.
                this.auth = {};
                this.auth.authToken = cfg.authToken;

                // And here it is done!
                if (this.auth.authToken) {
                    // TODO: is this the best way to call the kase login jquery plugin?
                    this.auth.userId = $('<div></div>').kbaseLogin().get_kbase_cookie('user_id');
                    this.auth.userName = $('<div></div>').kbaseLogin().get_kbase_cookie('name');
                }
                // this.loggedInUserid = cfg.loggedInUserId;

                // The params object is used to hold any parameterized input.
                // For the social widgets, userId, aka username, is always one
                // of them. 
                this.params = {};
                this.params.userId = cfg.userId;
                
                // The state object is used to hold any data generated by this 
                // widget.
                this.data = {};
                

                // Set up the templating system.
                // NB the templating requires a dedicated widget resources directory in 
                //   /src/widgets/WIDGETNAME/templates
                this.templates = {};
                this.templates.env = new nunjucks.Environment(new nunjucks.WebLoader('/src/widgets/social/'+this.widgetName+'/templates'), {
                    'autoescape': false
                });
                this.templates.env.addFilter('kbmarkup', function(s) {
                  if (s) {
                    s = s.replace(/\n/g, '<br>');
                  }
                  return s;
                });
                // This is the cache of templates.
                this.templates.cache = {};
                // The context object is what is given to templates.
                this.context = {};
                this.context.env = {
                    loggedIn: this.isLoggedIn(),
                    widgetTitle: this.widgetTitle,
                  widgetName: this.widgetName
                };
                this.context.data = this.data;
                this.context.params = this.params;


                // Set up listeners for any kbase events we are interested in:
                // NB: following tradition, the auth listeners are namespaced for kbase; the events
                // are not actually emitted in the kbase namespace.
                $(document).on('loggedIn.kbase', function(e, auth) {
                   this.onLoggedIn(e, auth);
                }.bind(this));

                $(document).on('loggedOut.kbase', function(e, auth) {
                    this.onLoggedOut(e, auth);
                }.bind(this));

                return this;
            }
        },
        
        // LIFECYCLE
        
        go: {
            value: function () {
              this.loadCSS();
                this.renderLayout();
                this.renderWaitingView();
                this.getCurrentState({
                	  success: function() {
                    	this.render()
                    }.bind(this),
                    error: function (err) {
                      console.log('ERROR');
                      console.log(err);
                      if (typeof err === 'string') {
                        err = {
                          title: 'Error',
                          message: err
                        }
                      }
                      this.renderErrorView(err);
                    }.bind(this)
                });
            }
        },

        stop: {
            value: function () {
              // ???
            }
        },
        
        destroy: {
          value: function () {
            // tear down any events, etc. that are not attached
            // to the local container.
          }
        },
        

        // STATE CHANGES

        /*
        getCurrentState
        This should do prepare the internal state to the point at
        which rendering can occur. It will typically fetch all data and stache it, 
        and perhaps perform some rudimentary analysis.
        */
        getCurrentState: {
            value: function (cfg) {
              // set the state here.
              cfg.success();
              return this;
            }
        },
        
        // EVENT HANDLERS

        onLoggedIn: {
            value: function (e, auth) {
                this.auth.authToken = auth.token;
                this.getCurrentState({
                    success: function () {
                        this.render()
                    }.bind(this)
                });
            }
        },
        
        onLoggedOut: {
            value: function (e, auth) {
                this.auth.authToken = null;
                this.getCurrentState({
                    success: function () {
                        this.render()
                    }.bind(this)
                });
            }
        },
        
        // STATE CALCULATIONS
        
        isLoggedIn: {
          value: function () {
            if (this.auth.authToken) {
              return true;
            } else {
              return false;
            }
          }
        },

        // TEMPLATES
        getTemplate: {
            value: function(name) {
                if (this.templates.cache[name] === undefined) {
                    this.templates.cache[name] = this.templates.env.getTemplate(name + '.html');
                }
                return this.templates.cache[name];
            }
        },
       
        // Generates a unique id for usage on synthesized dom elements.
        genId: {
            value: function() {
                return 'gen_' + this.widgetName + '_' + this._generatedId++;
            }
        },
        
        renderErrorView: {
        	value: function (error) {
            // Very simple error view.
            this.context.error = error;
				    this.places.content.html(this.getTemplate('error').render(this.context));
        	}
        },

        // DOM UPDATE

        // An example universal renderer, which inspects the state of the widget and
        // displays the appropriate content.
        render: {
            value: function () {
                // Generate initial view based on the current state of this widget.
                // Head off at the pass -- if not logged in, can't show profile.
                if (!this.isLoggedIn()) {
                    this.places.title.html('Unauthorized');
                    this.places.content.html(this.getTemplate('unauthorized').render(this.context));
                } else {
                    // no profile, no basic aaccount info
                    this.places.title.html('Authorized');
                    this.places.content.html(this.getTemplate('authorized').render(this.context));
                }
                return this;
            }
        },
        
        // These are some very basic renderers for common functions. 

        // This can provide an initial layout, such as a panel, and provide container nodes,
        // such as title and content.
        renderLayout: {
            value: function() {
                this.container.html(this.getTemplate('layout').render(this.context));
                this.places = {
                	title: this.container.find('[data-placeholder="title"]'),
                  alert: this.container.find('[data-placeholder="alert"]'),
                	content: this.container.find('[data-placeholder="content"]')
                };
            }
        },

        // Render a waiting icon while.
        // This is typically done before getCurrentState which might be doing a time consuming ajax call
        // to fetch data.
        // NB depends on assets.
        renderWaitingView: { 
            value: function () {
                this.places.content.html('<img src="assets/img/ajax-loader.gif"></img>');
            }
        },
        
        loadCSS: {
          value: function () {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = '/src/widgets/social/' + this.widgetName + '/style.css';
            document.getElementsByTagName("head")[0].appendChild(link);
          }
        },
        
        renderMessages: {
            value: function () {
                if (this.places.alert) {
                    this.places.alert.empty();
                    for (var i=0; i<this.messages.length; i++) {
                        var message = this.messages[i];
                        var alertClass = 'default';
                        switch (message.type) {
                            case 'success': alertClass = 'success';break;
                            case 'info': alertClass = 'info'; break;
                            case 'warning': alertClass = 'warning';break;
                            case 'danger':
                            case 'error': alertClass = 'danger'; break; 
                        }
                        this.places.alert.append(
                        '<div class="alert alert-dismissible alert-'+alertClass+'" role="alert">' +
                        '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                        '<strong>' + message.title + '</strong> ' + message.message + '</div>');
                    }
                }
            }
        },

        clearMessages: {
            value: function() {
                this.messages = [];
                this.renderMessages();
            }
        },

        addSuccessMessage: {
            value: function(title, message) {
              if (message === undefined) {
                message = title;
                title = '';
              }
                this.messages.push({
                    type: 'success', title: title, message: message
                });
                this.renderMessages();
            }
        }, 
        
        addWarningMessage: {
            value: function(title, message) {
              if (message === undefined) {
                message = title;
                title = '';
              }
                this.messages.push({
                    type: 'warning', title: title, message: message
                });
                this.renderMessages();
            }
        },

        addErrorMessage: {
            value: function(title, message) {
              if (message === undefined) {
                message = title;
                title = '';
              }
                this.messages.push({
                    type: 'error', title: title, message: message
                });
                this.renderMessages();
            }
        }

    });

    return SocialWidget;
});