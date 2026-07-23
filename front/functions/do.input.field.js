admin.Fn('do.input.field', function(scope)
{
    scope.open = false;
    scope.active = null;
    scope.revealed = false;

    elements.Fn('get.source', scope, () => scope.options);

    scope.Compute(() =>
    {
        scope.hasOptions = scope.sourced ? true : scope.options.length > 0;
        scope.isPassword = scope.type === 'password';
    });

    scope.classes = () =>
    {
        const list = ['box', 'bg-' + scope.background];

        if(scope.disabled)
        {
            list.push('disabled');
        }

        return list.join(' ');
    };

    scope.text = () => scope.value === undefined || scope.value === null ? '' : String(scope.value);

    scope.inputType = () => scope.isPassword && scope.revealed ? 'text' : scope.type;

    scope.filtered = () => admin.Fn('get.input.filtered', scope);

    scope.cast = (value) => admin.Fn('do.input.cast', scope.type, value);

    admin.Fn('do.input.handlers', scope);

    const commit = (value) =>
    {
        if(scope._change)
        {
            scope._change({ event: null, value });
        }
    };

    scope.move = (step) =>
    {
        const filtered = scope.filtered();

        if(!filtered.length)
        {
            return;
        }

        const index = filtered.indexOf(scope.active);

        scope.active = filtered[Math.min(Math.max(index + step, 0), filtered.length - 1)];
        scope.open = true;
    };

    scope.keydown = ({ event }) => admin.Fn('do.input.keydown', scope, event);

    scope.select = (option) =>
    {
        scope.value = option;
        scope.open = false;
        scope.active = null;

        commit(option);
    };

    scope.close = () =>
    {
        scope.open = false;
    };

    scope.clear = () =>
    {
        scope.value = '';
        scope.open = false;

        commit('');
    };

    scope.togglePassword = () =>
    {
        scope.revealed = !scope.revealed;
    };
});
