(function( $, undefined ) {

$.KBWidget("kbaseFBAView", 'kbaseWidget', {
    version: "1.0.0",
    options: {
    },
    init: function(options) {
        var wsIDs = options.ids;
        var workspaces = options.workspaces;

        this.$elem.append('<div id="kbase-fba-view"></div>');
        var container = $('#kbase-fba-view');

        var fba = new fbaModelServices('https://kbase.us/services/fba_model_services/');
        var kbws = new workspaceService('http://kbase.us/services/workspace_service/');

        var tables = ['Overview', 'Reaction Fluxes', 'Compound Fluxes', 'Compound Production']
        var tableIds = ['overview', 'rxn-fluxes', 'cpd-fluxes', 'cpd-prod']


        // build tabs
        var tabs = $('<ul id="table-tabs" class="nav nav-tabs"> \
                        <li class="active" > \
                        <a view="'+tableIds[0]+'" data-toggle="tab" >'+tables[0]+'</a> \
                      </li></ul>')
        for (var i=1; i<tableIds.length; i++) {
            tabs.append('<li><a view="'+tableIds[i]+'" data-toggle="tab">'+tables[i]+'</a></li>')
        }

        // add tabs
        container.append(tabs);

        // add table views (don't hide first one)
        container.append('<div class="'+tableIds[0]+'-view view"> \
                            <table id="'+tableIds[0]+'-table" \
                            class="table table-bordered table-striped"></table>\
                        </div>');

        for (var i=1; i<tableIds.length; i++) {
            container.append('<div class="'+tableIds[i]+'-view view hide"> \
                            <table id="'+tableIds[i]+'-table" \
                            class="table table-bordered table-striped"></table>\
                        </div>');
        }

        // tab events
        $('.nav-tabs li').click(function(){
            $('.view').hide(); // hide all views
            $('.nav-tabs li').removeClass('active'); //fixme: this is not neccessary
            $(this).addClass('active')

            var view = $(this).children('a').attr('view');
            $('.'+view+'-view').show();
        })
        
        var tableSettings = {"fnDrawCallback": events,        
            "sPaginationType": "full_numbers",
            "iDisplayLength": 20,
            "oLanguage": {
            "sSearch": "Search all:"
            }
        }

        var meta_AJAX = kbws.get_objectmeta({type: 'FBA', 
                workspace: workspaces[0], id: wsIDs[0]});
        $('.overview-view').append('<p class="muted loader-overview"> \
                                  <img src="../img/ajax-loader.gif"> loading...</p>')
        $.when(meta_AJAX).done(function(data){
            var labels = ['ID','Type','Moddate','Instance',
                          'Command','Last Modifier','Owner','Workspace','Ref',
                          'Check Sum']

            for (var i=0; i<data.length-1; i++){
                $('#overview-table').append('<tr><td>'+labels[i]+'</td> \
                                                 <td>'+data[i]+'</td></tr>')
            }
            $('.loader-overview').remove();
        })

        var models_AJAX = fba.get_fbas({fbas: wsIDs, workspaces: workspaces});
        $('.view').not('.overview-view').append('<p class="muted loader-tables"> \
                                  <img src="../img/ajax-loader.gif"> loading...</p>')
        $.when(models_AJAX).done(function(data){
            var fba = data[0];
            console.log(fba)

            // compartment table
            var dataArray = fba.reactionFluxes;
            var labels = ["rxn id", "flux", "max bound", "min bound", "upper bound", "lower bound", "type", "eq"];
            tableSettings.aoColumns = getColArraySettings(labels);
            var table = $('#rxn-fluxes-table').dataTable(tableSettings);
            table.fnAddData(dataArray);

            // compartment table
            var dataArray = fba.compoundFluxes;
            var labels = ["cpd id", "flux", "max bound", "min bound", "upper bound", "lower bound", "type", "eq"];
            tableSettings.aoColumns = getColArraySettings(labels);
            var table = $('#cpd-fluxes-table').dataTable(tableSettings);
            table.fnAddData(dataArray);

            $('.loader-tables').remove();
        })


        function getColArraySettings(labels) {
            var cols = [];

            for (var i in labels) {
                cols.push({sTitle: labels[i]})
            }
            return cols;
        }

        function getColObjSettings(keys, labels) {
            var cols = [];

            for (var i=0; i<keys.length; i++) {
                cols.push({sTitle: labels[i], mData: keys[i]})
            }
            return cols;
        }


        function events() {}

        this.hideView = function(){
            container.hide()
        }

        this.showView = function(){
            container.show()
        }

        this.destroyView = function(){
            container.remove();
        }

        return this;

    }  //end init

})
}( jQuery ) );