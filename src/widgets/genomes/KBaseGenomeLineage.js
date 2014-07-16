/**
 * Shows taxonomic lineage.
 *
 */
(function ($, undefined) {
    $.KBWidget({
        name: "KBaseGenomeLineage",
        parent: "kbaseWidget",
        version: "1.0.0",

        options: {
            genomeID: null,
            workspaceID: null,
            loadingImage: "../../widgets/images/ajax-loader.gif",
            kbCache: null,
            width:500
            //isInCard: false,
        },

        token: null,
        cdmiURL: "https://kbase.us/services/cdmi_api",
        $infoTable: null,


        init: function (options) {

            this._super(options);

            if (this.options.genomeID === null) {
                //throw an error
                return;
            }


            this.$messagePane = $("<div/>").addClass("kbwidget-message-pane").hide();
            this.$elem.append(this.$messagePane);

            this.render();
            if (this.options.workspaceID === null) {
                this.renderCentralStore();
            } else {
                this.renderWorkspace();
            }

            return this;
        },


        render: function () {
            var self = this;

            this.$infoPanel = $("<div>");


            this.$infoTable = $("<table>").addClass("table table-striped table-bordered");
            this.$infoPanel.append($("<div>").append(this.$infoTable));

            var self = this;

            this.$infoPanel.hide();
            this.$elem.append(this.$infoPanel);
        },

        renderCentralStore: function () {
            var self = this;
            this.cdmiClient = new CDMI_API(this.cdmiURL);
            this.entityClient = new CDMI_EntityAPI(this.cdmiURL);

            this.$infoPanel.hide();
            this.showMessage("<img src='" + this.options.loadingImage + "'>");

            // Fields to show:
            // ID
            // Workspace (if from a workspace)
            // Owner (KBase Central Store vs. username)
            // Scientific Name
            // Taxonomy
            // Taxonomy
            this.entityClient.get_entity_Genome([this.options.genomeID], ['id', 'scientific_name', 'domain', 'taxonomy'],

            $.proxy(function (genome) {
                //genome = genome[this.options.genomeID];
                genome = genome[self.options.genomeID];
                this.genome = genome; // store it for now.
                if (!genome) {
                    this.renderError("Genome '" + this.options.genomeID + "' not found in the KBase Central Store.");
                    return;
                }

                this.$infoTable.empty().append(this.addInfoRow("ID", genome.id)).append(this.addInfoRow("Name", genome.scientific_name)).append(this.addInfoRow("Domain", genome.domain)).append(this.addInfoRow("Taxonomic lineage", genome.taxonomy));


                self.hideMessage();
                this.$infoPanel.show();

            }, this),

            this.renderError);

        },

        renderWorkspace: function () {
            var self = this;
            //console.log( this.options.loadingImage);
            this.showMessage("<img src='" + this.options.loadingImage + "'>");
            this.$infoPanel.hide();
            console.log("rendering");
            //console.log(this.options.kbCache);
            var isInt = function (n) {
                    return typeof n === 'number' && n % 1 == 0;
                };
            console.log("renderWorkspace " + this.options.workspaceID + " " + this.options.genomeID);

            var obj = this.getObjectIdentity(this.options.workspaceID, this.options.genomeID);

            console.log("obj " + obj);

            var prom = this.options.kbCache.req('ws', 'get_objects', [obj]);
            $.when(prom).done($.proxy(function (genome) {

                genome = genome[0].data;
                console.log(genome);
                
                var splittax = genome.taxonomy.split(";");
                var finaltax = "<pre>";
                for(a=0;a<splittax.length;a++) {
                    var pad ="";
                    for(b=0;b<a;b++){
                        pad+=" ";
                    }
                   finaltax+=pad+splittax[a]+"<br>"; 
                }
                finaltax += "</pre>";
                this.$infoTable.empty().append(this.addInfoRow("ID", genome.id)).append(this.addInfoRow("Name", genome.scientific_name)).append(this.addInfoRow("Domain", genome.domain)).append(this.addInfoRow("Taxonomic lineage", finaltax));

                self.hideMessage();
                this.$infoPanel.show();

            }, this));
            $.when(prom).fail($.proxy(function (error) {
                this.renderError(error);
            }, this));
        },


        getData: function () {
            return {
                title: "Taxonomic lineage for :",
                id: this.options.genomeID,
                workspace: this.options.workspaceID
            };
        },

        /**
         *Returns the full workspace identifier, optionally with the version.
         */
        getObjectIdentity: function (wsNameOrId, objNameOrId, objVer) {
            console.log(wsNameOrId + " " + objNameOrId + " " + objVer);
            if (objVer) {
                return {
                    ref: wsNameOrId + "/" + objNameOrId + "/" + objVer
                };
            }
            return {
                ref: wsNameOrId + "/" + objNameOrId
            };
        },

        showMessage: function(message) {
            var span = $("<span/>").append(message);

            this.$messagePane.empty()
                             .append(span)
                             .show();
        },

        hideMessage: function() {
            this.$messagePane.hide();
        },
        
        renderError: function (error) {
            var errString = "Sorry, an unknown error occurred";
            if (typeof error === "string") {
                errString = error;
            } else if (error.error && error.error.message) {
                errString = error.error.message;
            }


            var $errorDiv = $("<div>").addClass("alert alert-danger").append("<b>Error:</b>").append("<br>" + errString);
            this.$elem.empty();
            this.$elem.append($errorDiv);
        },

        addInfoRow: function (a, b) {
            return "<tr><td>" + a + "</td><td>" + b + "</td></tr>";
        },

    });
})(jQuery);