admin.screens.FnExpose('match', function(path)
{
    for(const item of Object.values(this.Items()))
    {
        const result = admin.screens.Fn('do.match', item, path);

        if(result)
        {
            return result;
        }
    }

    return null;
});
