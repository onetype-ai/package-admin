admin.Fn('do.form.editor.field', function(scope)
{
    scope.body = null;
    scope.range = null;
    scope.syncFrame = null;
    scope.listeners = [];

    scope.tools = [{
            cmd: 'bold',
            icon: 'format_bold',
            label: 'Bold'
        }, {
            cmd: 'underline',
            icon: 'format_underlined',
            label: 'Underline'
        }, {
            cmd: 'strikeThrough',
            icon: 'strikethrough_s',
            label: 'Strikethrough'
        }, {
            sep: true
        }, {
            cmd: 'heading2',
            icon: 'title',
            label: 'Heading 2'
        }, {
            cmd: 'heading3',
            icon: 'text_fields',
            label: 'Heading 3'
        }, {
            cmd: 'blockquote',
            icon: 'format_quote',
            label: 'Quote'
        }, {
            sep: true
        }, {
            cmd: 'insertUnorderedList',
            icon: 'format_list_bulleted',
            label: 'Bullet list'
        }, {
            cmd: 'insertOrderedList',
            icon: 'format_list_numbered',
            label: 'Numbered list'
        }, {
            sep: true
        }, {
            cmd: 'link',
            icon: 'link',
            label: 'Link'
        }, {
            cmd: 'code',
            icon: 'code',
            label: 'Code'
        }, {
            cmd: 'divider',
            icon: 'horizontal_rule',
            label: 'Divider'
        }, {
            sep: true
        }, {
            cmd: 'clear',
            icon: 'format_clear',
            label: 'Clear'
        }, {
            cmd: 'undo',
            icon: 'undo',
            label: 'Undo'
        }, {
            cmd: 'redo',
            icon: 'redo',
            label: 'Redo'
        }];

    scope.classes = () =>
    {
        const list = ['box', 'bg-' + scope.background];

        if(scope.compact)
        {
            list.push('compact');
        }

        if(scope.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };

    scope.ancestor = (tag) =>
    {
        const selection = window.getSelection();
        let node = selection && selection.anchorNode;

        while(node && node !== scope.body)
        {
            if(node.nodeName === tag || (Array.isArray(tag) && tag.includes(node.nodeName)))
            {
                return node;
            }

            node = node.parentNode;
        }

        return null;
    };

    scope.listen = (target, event, handler, options) =>
    {
        target.addEventListener(event, handler, options);
        scope.listeners.push({ target, event, handler, options });
    };

    admin.Fn('do.form.editor.clean', scope);
    admin.Fn('do.form.editor.sync', scope);
    admin.Fn('do.form.editor.commands', scope);
    admin.Fn('do.form.editor.lifecycle', scope);
});
