var initHash = location.hash;
require([
    'jquery',
    'underscore',
    'splunkjs/mvc/simplexml/controller',
    'splunk.util',
    'backbone',
    'collections/services/data/ui/Views',
    'models/services/data/ui/View',
    'splunkjs/mvc',
    'bootstrap.affix',
    'bootstrap.scrollspy'
    
], function($, _, DashboardController, SplunkUtil, Backbone, ViewsCollection, ViewModel, mvc) {
    var TAGS = {
        'extension': {
            label: _('Extension').t(),
            tooltip: _('Uses external JS/CSS').t()
        },
        'new': {
            label: _('New Example').t(),
            tooltip: ''
        },
        'updated': {
            label: _('Updated Example').t(),
            tooltip: ''
        },
        'app_deps': {
            label: _('App Dependency').t(),
            tooltip: _('Requires installing other apps').t()
        }
    };
    debugger;
    var HIDE_MISSING_VIEWS = false;
    
    var DashboardsCollection = ViewsCollection.extend({
            model: ViewModel,
            initialize: function() {
                ViewsCollection.prototype.initialize.apply(this, arguments);
            },
            sync: function(method, collection, options) {
                options = options || {};
                options.data = options.data || {};
                var baseSearch = '(isDashboard=1 AND isVisible=1)';
                if(!options.data.search){
                    options.data.search = baseSearch;
                } else {
                    options.data.search = ['(',baseSearch,' AND ', options.data.search,')'].join('');
                }
                return ViewsCollection.prototype.sync.call(this, method, collection, options);
            }
        });

    DashboardController.onReady(function() {
        DashboardController.onViewModelLoad(function() {
            var url = new URL(window.location.href);
            var c = url.searchParams.get("labname");
            var app = DashboardController.model.app.get('app');
            var view = DashboardController.model.view;
            var dashboards = new DashboardsCollection();
            var dashboardsLoaded = dashboards.fetch({ data : { app: app, owner: '-', count: 0 } });
            var exampleInfoCollection = new Backbone.Collection();
            var exampleInfoLoaded = exampleInfoCollection.fetch({
                url: SplunkUtil.make_url('/static/app/' + app +'/'+ c +'.json'),
                cache: true
            });
            $.when(exampleInfoLoaded, dashboardsLoaded).then(function(){
                var references = _.uniq(_.flatten(exampleInfoCollection.pluck('references')));
                var labs = _.uniq(_.flatten(exampleInfoCollection.pluck('id')));
                var $contents = $('<div id="infobar" class="example-nav" height="100%" width="100%"></div>');
                var $nav = $('<ul class="link-list"></ul>');
                _.each(labs, function(labname){
                    var categoryFiltered = exampleInfoCollection.filter(function(exampleInfo) {
                        return _.flatten([exampleInfo.get("lab")]).indexOf(labname) > -1;
                    });
                    var categoryInfoCollection = new Backbone.Collection(categoryFiltered);
                    var $category= $('<div class="content-collection"></div>').attr('id', labname.replace(/ /g,"_"));
                    var title = exampleInfoCollection.get(labname).get("title");
                    //$category.append($("<h2></h2>").text(title));
                    var $frame = $('<iframe class="info-content-frame" id="frame_'+labname+'" src="/app/'+app+'/'+labname+'?hideChrome=true&amp;hideEdit=true" width="100%" border="0" frameborder="0"/>');
                    $category.append($frame)
                    $contents.append($category);

                    var $nav_content =  $('<li></li>').attr('id', "li_"+labname.replace(/ /g,"_"));
                    $nav_content.append($('<button class="btn" data-dashboardid="'+labname+'">'+title+'</button>'));
                    $nav.append($nav_content);
            
                });
                var $reference = $('<div class="references"><h4>Useful links</h4></div>');
                var $referencelist = $('<ul></ul>');
                _.each(references, function(reference){
                    if (reference != undefined){
                        var $item = $('<li></li>').text(reference['title']);
                        $item.append($('<p><a target="_blank" href="'+reference['link']+'">'+reference['link']+'</a></p>'));
                        $referencelist.append($item);
                    }

                });
                $reference.append($referencelist);
                $('.dashboard-body').append($('<div class="row contents-body"></div>').append($('<div></div>').append($nav)).append($contents));
                $('body').append($reference);
                $('.content-collection').hide();
                $('.content-collection').first().show();
                $nav.affix({
                    offset: { top: $nav.offset().top }
                })
                
                $('body').scrollspy();
                $('.dashboard-body').on('click', '[data-dashboardid]', function(e) {
                        e.preventDefault();
                        var target = $(e.currentTarget);
                        $('.content-collection').hide();
                        $('#'+target.data('dashboardid')).show();
                        $("#frame_"+target.data('dashboardid')).height($("#frame_"+target.data('dashboardid'))[0].contentWindow.document.documentElement.scrollHeight + 50);
                        if ($('.activeBtn')[0]){
                            ($('.activeBtn')[0]).classList.remove("activeBtn");
                        }
                        target.context.classList.add("activeBtn");
                    });
                if (initHash) {
                    setTimeout(function() {
                        document.body.scrollTop = $(initHash).offset().top;
                    }, 1000);
                }
            });

        });

    });

});
