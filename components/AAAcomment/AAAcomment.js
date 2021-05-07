import Component from '../Component/index'

class AAAcomment extends Component {
  constructor(props, ...mixins) {
    const defaults = {
        CommentActions: {},	/* 在评论内容下面呈现的操作项列表 */		
        CommentAuthor: '谢朝清',	/* 要显示为注释作者的元素 */	
        CommentAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',	/* 要显示为评论头像的元素 */ 	
        CommentChildren: '',	/* 嵌套注释应作为注释的子项提供 */	
        CommentContent: '',	/* 评论的主要内容 */
        CommentDatetime: '/Date(1489368353683)/',	/* 展示时间描述 */	
        CommentItems:[],	/* 在评论内容下面呈现的操作项列表 */	
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { CommentAuthor, CommentAvatar, CommentDatetime } = this.props
    const reg_number = new RegExp('\\d+', 'g')
    const created_time = new Date(Number(CommentDatetime.match(reg_number))).format('yyyy-MM-dd hh:mm')

    this.setProps({
        classes: {
            "nom-comment-reply": false,
        },
        children: [
            {
                component: 'Cols',
                items: [
                    {
                        component: 'Avatar',
                        gap: '4',
                        alt: CommentAuthor,
                        icon: 'user',
                        shape: 'circle',
                        text: CommentAuthor,
                        src: CommentAvatar,
                        size: 'default',
                    },
                    {
                        children: [
                            {
                                children: [
                                    {
                                        tag: 'a',
                                        children: CommentAuthor,

                                        classes: {
                                            "nom-comment-author": true,
                                        },

                                    },
                                    {
                                        tag: 'span',
                                        children: created_time,
                                        classes: {
                                            "nom-comment-author": true,
                                        },
                                    },

                                ],
                            },
                            {
                                children: [
                                    {
                                        
                                        children: '我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
                                    },
                                ],
                            },
                            {
                                children: [
                                    {
                                        tag: 'a',
                                        children: '回复',
                                        classes: {
                                            "nom-comment-action-btn": true,
                                        },
                                    },
                                    {
                                        tag: 'a',
                                        children: '删除',
                                        classes: {
                                            "nom-comment-action-btn": true,
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },{
                classes: {
                    "nom-comment-reply": true,
                },
                children:[{
                    component: 'Cols',
                    items: [
                        {
                            component: 'Avatar',
                            gap: '4',
                            alt: CommentAuthor,
                            icon: 'user',
                            shape: 'circle',
                            text: CommentAuthor,
                            src: CommentAvatar,
                            size: 'default',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            tag: 'a',
                                            children: CommentAuthor,
    
                                            classes: {
                                                "nom-comment-author": true,
                                            },
    
                                        },
                                        {
                                            tag: 'span',
                                            children: created_time,
                                            classes: {
                                                "nom-comment-author": true,
                                            },
                                        },
    
                                    ],
                                },
                                {
                                    children: [
                                        {
                                            
                                            children: '我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
                                        },
                                    ],
                                },
                                {
                                    children: [
                                        {
                                            tag: 'a',
                                            children: '回复',
                                            classes: {
                                                "nom-comment-action-btn": true,
                                            },
                                        },
                                        {
                                            tag: 'a',
                                            children: '删除',
                                            classes: {
                                                "nom-comment-action-btn": true,
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    classes: {
                        "nom-comment-reply": true,
                    },
                    children:{
                        component: 'Cols',
                        items: [
                            {
                                component: 'Avatar',
                                gap: '4',
                                alt: CommentAuthor,
                                icon: 'user',
                                shape: 'circle',
                                text: CommentAuthor,
                                src: CommentAvatar,
                                size: 'default',
                            },
                            {
                                children: [
                                    {
                                        children: [
                                            {
                                                tag: 'a',
                                                children: CommentAuthor,
        
                                                classes: {
                                                    "nom-comment-author": true,
                                                },
        
                                            },
                                            {
                                                tag: 'span',
                                                children: created_time,
                                                classes: {
                                                    "nom-comment-author": true,
                                                },
                                            },
        
                                        ],
                                    },
                                    {
                                        children: [
                                            {
                                                
                                                children: '我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
                                            },
                                        ],
                                    },
                                    {
                                        children: [
                                            {
                                                tag: 'a',
                                                children: '回复',
                                                classes: {
                                                    "nom-comment-action-btn": true,
                                                },
                                            },
                                            {
                                                tag: 'a',
                                                children: '删除',
                                                classes: {
                                                    "nom-comment-action-btn": true,
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                },
            ],
                
            },
            {
                classes: {
                    "nom-comment-reply": true,
                },
                children:{
                    component: 'Cols',
                    items: [
                        {
                            component: 'Avatar',
                            gap: '4',
                            alt: CommentAuthor,
                            icon: 'user',
                            shape: 'circle',
                            text: CommentAuthor,
                            src: CommentAvatar,
                            size: 'default',
                        },
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            tag: 'a',
                                            children: CommentAuthor,
    
                                            classes: {
                                                "nom-comment-author": true,
                                            },
    
                                        },
                                        {
                                            tag: 'span',
                                            children: created_time,
                                            classes: {
                                                "nom-comment-author": true,
                                            },
                                        },
    
                                    ],
                                },
                                {
                                    children: [
                                        {
                                            
                                            children: '我是评论内容我是评论内容我是评论内容我是评论内容我是评论内容',
                                        },
                                    ],
                                },
                                {
                                    children: [
                                        {
                                            tag: 'a',
                                            children: '回复',
                                            classes: {
                                                "nom-comment-action-btn": true,
                                            },
                                        },
                                        {
                                            tag: 'a',
                                            children: '删除',
                                            classes: {
                                                "nom-comment-action-btn": true,
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    })

  }
/*   commentReply() {}
  commentDelete() {} */
}

Component.register(AAAcomment)

export default AAAcomment



