admin.Fn('do.form.editor.lifecycle', function(scope)
{
    const handlePaste = (event) =>
    {
        event.preventDefault();

        const html = event.clipboardData.getData('text/html');
        const text = event.clipboardData.getData('text/plain');

        if(html)
        {
            document.execCommand('insertHTML', false, scope.clean(html));
        }
        else if(text)
        {
            const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

            document.execCommand('insertHTML', false, safe.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>'));
        }
    };

    const runShortcut = (event, key, cmd) =>
    {
        if(event.key !== key)
        {
            return false;
        }

        event.preventDefault();
        scope.exec(cmd);
        return true;
    };

    const handleKeydown = (event) =>
    {
        if(event.isComposing)
        {
            return;
        }

        const meta = event.metaKey || event.ctrlKey;

        if(meta && (runShortcut(event, 'b', 'bold') || runShortcut(event, 'u', 'underline') || runShortcut(event, 'k', 'link')))
        {
            return;
        }

        if(event.key === 'Enter' && !event.shiftKey && document.queryCommandValue('formatBlock') === 'blockquote')
        {
            const anchor = window.getSelection() && window.getSelection().anchorNode;
            const text = anchor ? anchor.textContent : '';

            if(!text.trim())
            {
                event.preventDefault();
                document.execCommand('formatBlock', false, 'p');
            }
        }
    };

    const handleSelection = () =>
    {
        if(!scope.body)
        {
            return;
        }

        const selection = window.getSelection();

        if(selection && selection.anchorNode && scope.body.contains(selection.anchorNode))
        {
            scope.sync();
        }
    };

    scope.OnReady(() =>
    {
        scope.body = scope.Element.querySelector('.body');

        if(!scope.body)
        {
            return;
        }

        document.execCommand('defaultParagraphSeparator', false, 'p');
        scope.body.innerHTML = scope.value || '<p><br></p>';

        scope.listen(scope.body, 'input', () =>
        {
            scope.ensure();
            scope.sync();
            scope.emit();
        });

        scope.listen(scope.body, 'paste', handlePaste);
        scope.listen(scope.body, 'keydown', handleKeydown);
        scope.listen(document, 'selectionchange', handleSelection);
    });

    scope.OnDestroy(() =>
    {
        scope.listeners.forEach((entry) => entry.target.removeEventListener(entry.event, entry.handler, entry.options));
        scope.listeners = [];

        if(scope.syncFrame)
        {
            cancelAnimationFrame(scope.syncFrame);
            scope.syncFrame = null;
        }
    });
});
