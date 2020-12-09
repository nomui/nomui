define(['../base/nom', '../base/component', './grid-header', './grid-body'],

    function (nom, Component, GridHeader, GridBody) {

        function Grid(props) {
            Component.call(this, props);
        }

        nom.defineComponent('grid', Grid, {
            defaults: {
                columns: [],
                data: [],
                frozenHeader: false
            },

            _create: function () {
                this.minWidth = 0;
            },

            _config: function () {
                this._calcMinWidth();

                this.setProps({
                    classes: {
                        'm-frozen-header': this.props.frozenHeader
                    },
                    children: [
                        { component: GridHeader },
                        { component: GridBody }
                    ]
                });
            },

            _calcMinWidth: function () {
                var props = this.props;
                for (var i = 0; i < props.columns.length; i++) {
                    var column = props.columns[i];
                    if (column.width) {
                        this.minWidth += column.width;
                    }
                    else {
                        this.minWidth += 120;
                    }
                }
            },
        });

        return Grid;
    }
);