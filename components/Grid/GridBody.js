define(['../base/nom', '../base/component', '../table/table'],

    function (nom, Component, Table) {

        function GridBody(props) {
            Component.call(this, props);
        }

        nom.defineComponent('grid-body', GridBody, {
            defaults: {
                children: { component: Table }
            },

            _create: function () {
                this.grid = this.parent;
                this.grid.body = this;
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
                        onlyBody: true
                    },
                    events: {
                        onscroll: function () {
                            var scrollLeft = this.element.scrollLeft;
                            this.grid.header.element.scrollLeft = scrollLeft;
                        }
                    }
                });
            }
        });

        return GridBody;
    }
);