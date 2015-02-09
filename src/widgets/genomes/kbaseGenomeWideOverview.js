(function( $, undefined ) { 
    $.KBWidget({ 
        name: "KBaseGenomeWideOverview", 
        parent: "kbaseWidget", 
        version: "1.0.0",

        options: {
            genomeID: null,
            workspaceID: null,
            loadingImage: "assets/img/ajax-loader.gif",
            kbCache: null,
            genomeInfo: null
        },

        init: function(options) {
            this._super(options);
            this.render();
            return this;
        },

        render: function() {
            var self = this;
            var row = $('<div class="row">');
            self.$elem.append(row);
            var overview = $('<div class="col-md-4">');
            row.append(overview);
            var wikidescription = $('<div class="col-md-8">');
            row.append(wikidescription);
            overview.KBaseGenomeOverview({genomeID: self.options.genomeID, 
            	workspaceID: self.options.workspaceID, kbCache: self.options.kbCache,
                loadingImage: self.options.loadingImage, genomeInfo: self.options.genomeInfo});
            wikidescription.KBaseWikiDescription({genomeID: self.options.genomeID, 
            	workspaceID: self.options.workspaceID, kbCache: self.options.kbCache,
                loadingImage: self.options.loadingImage, genomeInfo: self.options.genomeInfo});
        },

        getData: function() {
            return {
                type: "Genome Overview",
                id: this.options.genomeID,
                workspace: this.options.workspaceID,
                title: "Overview"
            };
        }

    });
})( jQuery );