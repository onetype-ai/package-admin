admin.Fn('do.form.editor.commands', function(scope)
{
    const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const execCode = () =>
    {
        const code = scope.ancestor('CODE');

        if(code)
        {
            const text = code.textContent;
            const range = document.createRange();

            range.selectNode(code);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('insertHTML', false, text);
            return;
        }

        const text = window.getSelection() && window.getSelection().toString();

        if(text)
        {
            document.execCommand('insertHTML', false, '<code>' + escape(text) + '</code>');
        }
    };

    const insertLink = (url, selection) =>
    {
        scope.body.focus();

        if(scope.range)
        {
            selection.removeAllRanges();
            selection.addRange(scope.range);
        }

        const text = selection && selection.toString();

        if(text)
        {
            document.execCommand('createLink', false, url);
            return;
        }

        const safe = url.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        document.execCommand('insertHTML', false, '<a href="' + safe + '">' + safe + '</a>');
    };

    const execLink = async () =>
    {
        const selection = window.getSelection();

        if(selection && selection.rangeCount)
        {
            scope.range = selection.getRangeAt(0).cloneRange();
        }

        const url = await $ot.float.confirm('Insert link', {
            icon: 'link',
            input: true,
            placeholder: 'https://',
            confirm: 'Insert'
        });

        if(url)
        {
            insertLink(url, selection);
        }
    };

    scope.exec = async (cmd) =>
    {
        if(!scope.body || scope.disabled)
        {
            return;
        }

        scope.body.focus();

        const block = document.queryCommandValue('formatBlock');
        const toggle = {
            heading2: 'h2',
            heading3: 'h3',
            blockquote: 'blockquote'
        };

        if(toggle[cmd])
        {
            document.execCommand('formatBlock', false, block === toggle[cmd] ? 'p' : toggle[cmd]);
        }
        else if(cmd === 'code')
        {
            execCode();
        }
        else if(cmd === 'divider')
        {
            document.execCommand('insertHTML', false, '<hr>');
        }
        else if(cmd === 'clear')
        {
            document.execCommand('removeFormat');
            document.execCommand('formatBlock', false, 'p');
        }
        else if(cmd === 'link')
        {
            await execLink();
        }
        else
        {
            document.execCommand(cmd, false, null);
        }

        scope.sync();
        scope.emit();
    };
});
