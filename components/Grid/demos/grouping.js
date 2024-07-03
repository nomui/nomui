define([], function () {
    return {
        title: '数据分组',
        file: 'grouping',
        demo: function () {
            const refs = {}
            return {
                component: 'Flex',
                rows: [
                    {
                        align: 'center',
                        cols: [
                            {
                                component: 'CheckboxList',
                                ref: (c) => {
                                    refs.checkboxlist = c
                                },
                                options: [
                                    {
                                        text: '位置',
                                        value: 'position',
                                    },
                                    {
                                        text: '球队',
                                        value: 'team',
                                    },
                                    {
                                        text: '学校',
                                        value: 'school'
                                    },
                                ]
                            },
                            {
                                component: 'Button',
                                text: '筛选',
                                type: 'primary',
                                size: 'small',
                                onClick: () => {
                                    const v = refs.checkboxlist.getValue()
                                    if (!v) {
                                        new nomui.Alert({
                                            title: '至少需要选择一个筛选项',
                                        })
                                        return
                                    }
                                    refs.grid.filterGroup({ fields: v })
                                }
                            }
                        ]
                    },
                    {
                        component: 'Grid',
                        showTitle: true,
                        ref: (c) => {
                            refs.grid = c
                            window.gggg = c
                        },

                        rowCheckable: {

                        },
                        columns: [
                            {
                                field: 'name',
                                title: '姓名',
                                width: 180,
                            },
                            {
                                field: 'age',
                                title: '年龄',
                                width: 100,
                            },
                            {
                                field: 'position',
                                title: '位置',
                                width: 200,
                            },
                            {
                                field: 'team',
                                title: '球队',
                                width: 200,
                            },
                            {
                                field: 'school',
                                title: '学校',
                            },
                        ],
                        data: [
                            { "id": "001", "name": "Klay Thompson", "position": "Shooting Guard", "team": "Warriors", "age": 29, "school": "UCLA" },
                            { "id": "002", "name": "Stephen Curry", "position": "Point Guard", "team": "Warriors", "age": 32, "school": "Davidson" },
                            { "id": "003", "name": "Draymond Green", "position": "Power Forward", "team": "Warriors", "age": 30, "school": "Michigan State" },
                            { "id": "004", "name": "Kevin Durant", "position": "Small Forward", "team": "Nets", "age": 31, "school": "Texas" },
                            { "id": "005", "name": "James Harden", "position": "Shooting Guard", "team": "Nets", "age": 30, "school": "Arizona State" },
                            { "id": "006", "name": "Kyrie Irving", "position": "Point Guard", "team": "Nets", "age": 28, "school": "Duke" },
                            { "id": "007", "name": "LeBron James", "position": "Small Forward", "team": "Lakers", "age": 35, "school": "St. Vincent-St. Mary" },
                            { "id": "008", "name": "Russell Westbrook", "position": "Point Guard", "team": "Lakers", "age": 32, "school": "UCLA" },
                            { "id": "009", "name": "Anthony Davis", "position": "Power Forward", "team": "Lakers", "age": 27, "school": "Kentucky" },
                            { "id": "010", "name": "Kawhi Leonard", "position": "Small Forward", "team": "Clippers", "age": 28, "school": "San Diego State" },
                            { "id": "011", "name": "Paul George", "position": "Small Forward", "team": "Clippers", "age": 29, "school": "California" },
                            { "id": "012", "name": "Luka Doncic", "position": "Point Guard", "team": "Mavericks", "age": 21, "school": "None" },
                            { "id": "013", "name": "Dirk Nowitzki", "position": "Power Forward", "team": "Mavericks", "age": 42, "school": "None" },
                            { "id": "014", "name": "Zion Williamson", "position": "Power Forward", "team": "Pelicans", "age": 20, "school": "Duke" },
                            { "id": "015", "name": "Jayson Tatum", "position": "Small Forward", "team": "Celtics", "age": 22, "school": "Duke" },
                            { "id": "016", "name": "Jimmy Butler", "position": "Small Forward", "team": "Heat", "age": 30, "school": "Marquette" },
                            { "id": "017", "name": "Giannis Antetokounmpo", "position": "Power Forward", "team": "Bucks", "age": 25, "school": "None" },
                            { "id": "018", "name": "Nikola Jokic", "position": "Center", "team": "Nuggets", "age": "25", "school": "None" },
                            { "id": "019", "name": "Joel Embiid", "position": "Center", "team": "76ers", "age": 26, "school": "Kansas" },
                            { "id": "020", "name": "Ben Simmons", "position": "Point Guard", "team": "76ers", "age": 23, "school": "Louisiana State" },
                            { "id": "021", "name": "Bradley Beal", "position": "Shooting Guard", "team": "Wizards", "age": 26, "school": "Florida" },
                            { "id": "022", "name": "Damian Lillard", "position": "Point Guard", "team": "Trail Blazers", "age": 30, "school": "Weber State" },
                            { "id": "023", "name": "CJ McCollum", "position": "Shooting Guard", "team": "Trail Blazers", "age": 28, "school": "Lehigh" }
                        ]
                    }
                ]
            }
        },
    }
})
