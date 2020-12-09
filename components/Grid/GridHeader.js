define(['../base/nom', '../base/component', '../table/table'],

    function (nom, Component, Table) {

        function GridHeader(props) {
            Component.call(this, props);
        }

        nom.defineComponent('grid-header', GridHeader, {

            defaults: {
                children: { component: Table }
            },

            _create: function () {
                this.grid = this.parent;
                this.grid.header = this;
            },

            _config: function () {
                this.setProps({
                    children: {
                        columns: this.grid.props.columns,
                        data: this.grid.data,
                        attrs: {
                            style: {
                                minWidth: this.grid.minWidth + 'px'
                            }
                        },
                        onlyHead: true
                    }
                })
            }

        })

        return GridHeader
    }
);