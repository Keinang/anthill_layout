/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:26 PM
 */
define([], function defineDebuggerLayout() {

    /**
     * Define Debugger Layout
     * @constructor
     */
    var Layout = function Layout() {
    };

    return Layout.extend({

        /**
         * Toggle grid
         */
        bindToggleGrid: function bindToggleGrid() {
            var $label = $(this.debugger.info).find('.handler input:first+label');
            $label.on(
                'click.toggleGrid',
                function toggleGrid() {
                    var $placeholders = $(this.debugger.placeholders);

                    if ($placeholders.length > 0 &&
                        $placeholders.find('*').length > 0) {
                        $label.text($label.text().replace(/Hide/, 'Show'));
                        return this.debugger.grid.destroyGrid();
                    }
                    $label.text($label.text().replace(/Show/, 'Hide'));
                    this.debugger.grid.showGrid();
                }.bind(this)
            );
        },

        /**
         * Bind change overlapping mode
         */
        bindChangeOverlappingMode: function bindChangeOverlappingMode() {
            $('#overlapping-mode').on('change.overlapping', function onChange(e) {
                this.debugger.scopes.page.layout.controller.setOrganizeMode($(e.target).val());
            }.bind(this));
        },

        /**
         * Bind click to allow / disable overlapping
         */
        bindAllowOverlapping: function bindAllowOverlapping() {
            var $input = $('input[name="overlapping"]');
            $input.change(function change(e) {
                this.debugger.scopes.page.layout.controller.setOverlapping($input.prop('checked'));
            }.bind(this));
        },

        /**
         * Render page layout info
         * @param {*} layout
         * @returns {string}
         */
        renderPageLayout: function renderPageLayout(layout) {
            var c = this.debugger.component;
            return ['<li class="extend">', c.renderBlock('Layout', [
                c.renderInput('Snap to Grid', layout.controller.isSnap2Grid()),
                c.renderInput('Overlapping', layout.controller.getBehavior().overlapping),
                c.renderCombo(
                    'Overlapping mode',
                    layout.controller.getBehavior().organize,
                    ['row', 'column']
                ),
                c.renderInline('Empty spaces', layout.controller.getBehavior().emptySpaces),
                c.renderInline('Columns', layout.config.grid.columns),
                c.renderInline('Widgets per row', layout.config.grid.widgetsPerRow),
                c.renderInline('Cell size (px)', layout.config.grid.minCellWidth.toFixed(3)),
                c.renderInline('Margin (px)', layout.config.grid.margin),
                c.renderInline('Padding (px)', layout.config.grid.padding)
            ], false), '</li>'].join('');
        }

    });

});