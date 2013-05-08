/**
 * Created with JetBrains RubyMine.
 * User: teamco
 * Date: 5/6/13
 * Time: 9:22 PM
 */
define([], function defineDebuggerGrid() {

    /**
     * Define Debugger Grid
     * @constructor
     */
    var Grid = function Grid() {
    };

    return Grid.extend({

        /**
         * Show grid
         */
        showGrid: function showGrid() {
            this.destroyGrid();
            this.checkAndPlaceGrid();
        },

        /**
         * Destroy grid
         */
        destroyGrid: function destroyGrid() {
            $(this.debugger.placeholders).empty();
        },

        /**
         * Create placeholder
         * @returns {*}
         */
        createPlaceHolder: function createPlaceHolder() {
            return $('<div />').attr({
                id: this.debugger.placeholders.replace(/#/, '')
            });
        },

        /**
         * Move grid placeholder to current page
         * @returns {*}
         */
        movePlaceHoldersToCurrentPage: function movePlaceHoldersToCurrentPage() {
            var $page = this.debugger.scopes.page.view.elements.$page.$,
                $placeholder = $(this.debugger.placeholders);
            if ($page.find(this.debugger.placeholders).length === 0) {
                if ($placeholder.length === 0) {
                    $placeholder = this.createPlaceHolder();
                }
                $page.append($placeholder);
            }
            return $page.find(this.debugger.placeholders);
        },

        /**
         * Render grid
         */
        checkAndPlaceGrid: function checkAndPlaceGrid() {
            var scope = this.debugger.scope;
            if ($(this.debugger.placeholders + ' > *').length > 0) {
                scope.logger.info('Grid already activated', scope);
                return false;
            }
            this.movePlaceHoldersToCurrentPage();

            var column = 0, row = 0,
                page = this.debugger.scopes.page,
                grid = page.layout.config.grid,
                cell = grid.minCellWidth,
                margin = grid.margin,

                opts = {
                    cell: cell,
                    margin: margin,
                    top: 0,
                    left: 0
                };

            $(this.debugger.placeholders).
                append($('<div />').addClass('column')).
                append($('<div />').addClass('row'));

            for (column; column < grid.columns; column += 1) {
                this.renderColumn(column, opts);
            }

            for (row; row < this.debugger.rows; row += 1) {
                this.renderRow(row, opts);
            }
        },

        /**
         * Render column
         * @param {number} column
         * @param {{left, cell, margin, top}} opts
         */
        renderColumn: function renderColumn(column, opts) {
            this.renderPlaceHolder(
                this.debugger.placeholders + ' .column', {
                    width: opts.cell,
                    top: opts.top,
                    left: this.debugger.scopes.widget.map.getNextPosition({
                        column: column,
                        row: 0
                    }).left,
                    text: column
                }
            );
        },

        /**
         * Render row
         * @param {number} row
         * @param {{left, cell, margin, top}} opts
         */
        renderRow: function renderRow(row, opts) {
            this.renderPlaceHolder(
                this.debugger.placeholders + ' .row', {
                    left: opts.left,
                    top: this.debugger.scopes.widget.map.getNextPosition({
                        column: 0,
                        row: row
                    }).top,
                    height: opts.cell,
                    text: row
                }
            );
        },

        /**
         * Append grid to placeholder
         * @param {string} selector
         * @param {{left, top, [width], [height], text}}opts
         */
        renderPlaceHolder: function renderPlaceHolder(selector, opts) {
            opts = this.debugger.base.define(opts, {}, true);
            $(selector).append(
                $('<div />').css({
                    left: opts.left,
                    top: opts.top,
                    width: opts.width || '100%',
                    height: opts.height || '100%'
                }).text(opts.text)
            ).show()
        }
    });

});