admin.Fn('do.form.upload.one', function(scope)
{
    scope.uploading = false;
    scope.hovering = false;

    scope.Compute(() =>
    {
        scope.file = admin.Fn('get.file.kind', scope.value);
        scope.hasFile = !!scope.value;
    });

    scope.classes = () =>
    {
        const list = ['box', 'bg-' + scope.background];

        if(scope.hovering)
        {
            list.push('hovering');
        }

        if(scope.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };

    scope.set = (url) =>
    {
        scope.value = url;

        if(scope._change)
        {
            scope._change({ value: url });
        }
    };

    scope.browse = () =>
    {
        if(scope.disabled)
        {
            return;
        }

        const input = scope.Element.querySelector('.picker');

        if(input)
        {
            input.click();
        }
    };

    scope.upload = async (file) =>
    {
        if(!file || !scope._upload)
        {
            return;
        }

        scope.uploading = true;

        try
        {
            const url = await scope._upload({ file });

            if(url && typeof url === 'string')
            {
                scope.set(url);
            }
        }
        catch(error)
        {
            if(scope._error)
            {
                scope._error({ error: error.message ? error.message : 'Upload failed.' });
            }
        }

        scope.uploading = false;
    };

    scope.pick = ({ event }) =>
    {
        const file = event.target.files ? event.target.files[0] : null;

        event.target.value = '';
        scope.upload(file);
    };

    scope.enter = () => () =>
    {
        if(!scope.disabled)
        {
            scope.hovering = true;
        }
    };

    scope.leave = () => () =>
    {
        scope.hovering = false;
    };

    scope.drop = () => ({ event }) =>
    {
        scope.hovering = false;

        if(scope.disabled)
        {
            return;
        }

        const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;

        if(file)
        {
            scope.upload(file);
            return;
        }

        const text = event.dataTransfer ? event.dataTransfer.getData('text/plain') : '';

        if(text)
        {
            scope.set(text.trim());
        }
    };

    scope.paste = ({ event, value }) =>
    {
        scope.set(value ? value.trim() : '');
    };

    scope.clear = () =>
    {
        if(scope.disabled)
        {
            return;
        }

        scope.set('');
    };
});
