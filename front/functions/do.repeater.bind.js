admin.Fn('do.repeater.bind', function(scope)
{
    scope.bindToVariable = () =>
    {
        if(scope.disabled)
        {
            return;
        }

        const modalId = 'modal-var-builder-' + Date.now();
        const current = scope.value && typeof scope.value === 'object' && !Array.isArray(scope.value)
            ? (scope.value.each || '')
            : '';

        const initial = (() =>
        {
            const match = /^\{\{\s*([\s\S]*?)\s*\}\}$/.exec(String(current).trim());

            return match ? match[1] : '';
        })();

        const defaults = scope.defaults();
        const template = {};

        for(const key of Object.keys(defaults))
        {
            template[key] = '{{ item.' + key + ' }}';
        }

        const onSave = ({ expression }) =>
        {
            scope.value = {
                each: '{{ ' + expression + ' }}',
                as: 'item',
                template
            };

            $ot.float.close(modalId);
            scope.sync();
        };

        const onCancel = () =>
        {
            $ot.float.close(modalId);
        };

        const variables = scope.variables;

        $ot.float.modal(function()
        {
            this.variables = variables;
            this.initial = initial;
            this.onSave = onSave;
            this.onCancel = onCancel;

            return '<e-variable-builder :variables="variables" :value="initial" :_save="onSave" :_cancel="onCancel"></e-variable-builder>';
        }, { id: modalId });
    };

    scope.unbindVariable = () =>
    {
        if(scope.disabled)
        {
            return;
        }

        scope.value = [];
        scope.sync();
    };
});
