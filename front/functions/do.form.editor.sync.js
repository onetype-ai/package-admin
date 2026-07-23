admin.Fn('do.form.editor.sync', function(scope)
{
    scope.sync = () =>
    {
        if(scope.syncFrame)
        {
            return;
        }

        scope.syncFrame = requestAnimationFrame(() =>
        {
            scope.syncFrame = null;

            if(!scope.Element || !scope.body)
            {
                return;
            }

            const block = document.queryCommandValue('formatBlock');

            const state = {
                bold: document.queryCommandState('bold'),
                underline: document.queryCommandState('underline'),
                strikeThrough: document.queryCommandState('strikeThrough'),
                insertUnorderedList: document.queryCommandState('insertUnorderedList'),
                insertOrderedList: document.queryCommandState('insertOrderedList'),
                heading2: block === 'h2',
                heading3: block === 'h3',
                blockquote: block === 'blockquote'
            };

            scope.Element.querySelectorAll('[data-cmd]').forEach((button) =>
            {
                const cmd = button.getAttribute('data-cmd');

                button.classList.toggle('active', !!(cmd && state[cmd]));
            });
        });
    };

    scope.emit = () =>
    {
        if(!scope.body)
        {
            return;
        }

        const value = scope.clean(scope.body.innerHTML);
        const hidden = scope.Element && scope.Element.querySelector('input.hidden');

        if(hidden)
        {
            hidden.value = value;
        }

        if(scope._change)
        {
            scope._change({ value });
        }
    };

    scope.ensure = () =>
    {
        if(!scope.body)
        {
            return;
        }

        if(!scope.body.innerHTML || scope.body.innerHTML === '<br>')
        {
            scope.body.innerHTML = '<p><br></p>';

            const range = document.createRange();

            range.setStart(scope.body.firstChild, 0);
            range.collapse(true);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }

        for(let index = scope.body.childNodes.length - 1; index >= 0; index--)
        {
            const child = scope.body.childNodes[index];

            if(child.nodeType === 3 && child.textContent.trim())
            {
                const paragraph = document.createElement('p');

                child.replaceWith(paragraph);
                paragraph.appendChild(child);
            }
        }
    };
});
