admin.Fn('do.form.upload.many.field', function(scope)
{
    scope.uploading = false;
    scope.hovering = false;
    scope.dragging = null;
    scope.target = null;

    scope.Compute(() =>
    {
        scope.tiles = scope.value.map((url, index) => ({ url, index, key: index + ':' + url, ...admin.Fn('get.file.kind', url) }));
        scope.canAdd = !scope.max || scope.value.length < scope.max;
    });

    scope.classes = () => ['box', 'bg-' + scope.background, scope.hovering && 'hovering', scope.disabled && 'disabled'].filter(Boolean).join(' ');

    scope.tileClasses = (tile) =>
    {
        const dragging = scope.dragging === tile.index;
        const target = scope.target === tile.index && !dragging;

        return ['tile', tile.color, dragging && 'dragging', target && 'target'].filter(Boolean).join(' ');
    };

    scope.emit = () => scope._change && scope._change({ value: scope.value });

    scope.isRejected = (url) =>
    {
        if(!scope.accept)
        {
            return false;
        }

        const extension = admin.Fn('get.file.kind', url).extension;
        const patterns = scope.accept.split(',').map((pattern) => pattern.trim().toLowerCase().replace('.', ''));

        return extension && !patterns.some((pattern) => pattern.includes('/')) && !patterns.includes(extension);
    };

    scope.addUrls = (urls) =>
    {
        const errors = [];
        const accepted = [];

        for(const url of urls.filter((entry) => entry && typeof entry === 'string'))
        {
            if(scope.isRejected(url))
            {
                errors.push('File "' + admin.Fn('get.file.kind', url).name + '" type is not allowed.');
            }
            else if(scope.max && scope.value.length + accepted.length >= scope.max)
            {
                errors.push('Maximum of ' + scope.max + ' files reached.');
                break;
            }
            else
            {
                accepted.push(url);
            }
        }

        scope.value = [...scope.value, ...accepted];
        errors.length && scope._error && scope._error({ errors });
        scope.emit();
    };

    scope.uploadOne = async (file) =>
    {
        try
        {
            const url = await scope._upload({ file });

            url && typeof url === 'string' && scope.addUrls([url]);
        }
        catch(error)
        {
            scope._error && scope._error({ errors: [error.message || 'Upload failed.'] });
        }
    };

    scope.addFiles = async (files) =>
    {
        if(scope.disabled || !scope._upload)
        {
            return;
        }

        scope.uploading = true;
        await Promise.all(Array.from(files).map(scope.uploadOne));
        scope.uploading = false;
    };

    scope.set = (value) =>
    {
        if(!scope.disabled)
        {
            scope.value = value;
            scope.emit();
        }
    };

    scope.remove = (tile) => scope.set(scope.value.filter((url, index) => index !== tile.index));

    scope.clear = () => scope.set([]);

    scope.browse = () => !scope.disabled && scope.Element.querySelector('.picker').click();

    scope.pick = ({ event }) =>
    {
        const files = event.target.files;

        files && files.length && scope.addFiles(files);
        event.target.value = '';
    };

    scope.dragEnd = () =>
    {
        scope.dragging = null;
        scope.target = null;
    };

    scope.dragStart = (tile) => () => !scope.disabled && (scope.dragging = tile.index);

    scope.dragOver = (tile) => () => !scope.disabled && scope.dragging !== null && (scope.target = tile.index);

    scope.dragDrop = (tile) => () =>
    {
        const move = !scope.disabled && scope.dragging !== null && scope.dragging !== tile.index;
        const next = [...scope.value];

        move && next.splice(tile.index, 0, next.splice(scope.dragging, 1)[0]);
        scope.dragEnd();
        move && scope.set(next);
    };

    scope.enter = () => () => !scope.disabled && scope.dragging === null && (scope.hovering = true);

    scope.leave = () => () => scope.hovering = false;

    scope.drop = () => ({ event }) =>
    {
        scope.hovering = false;

        if(scope.disabled || scope.dragging !== null)
        {
            return;
        }

        const files = event.dataTransfer && event.dataTransfer.files;
        const text = event.dataTransfer && event.dataTransfer.getData('text/plain');

        if(files && files.length)
        {
            scope.addFiles(files);
        }
        else if(text)
        {
            scope.addUrls([text.trim()]);
        }
    };
});
