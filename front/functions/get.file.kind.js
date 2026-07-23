admin.Fn('get.file.kind', function(url)
{
    const groups = [
        ['picture_as_pdf', 'red', ['pdf']],
        ['folder_zip', 'orange', ['zip', 'rar']],
        ['description', 'blue', ['doc', 'docx']],
        ['article', 'blue', ['txt', 'md']],
        ['table', 'green', ['xls', 'xlsx', 'csv']],
        ['movie', 'brand', ['mp4', 'webm', 'mov']],
        ['music_note', 'brand', ['mp3', 'wav']],
        ['shapes', 'orange', ['svg']],
        ['data_object', 'green', ['json']]
    ];

    const images = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'avif', 'ico', 'bmp'];
    const clean = url ? url.split('#')[0].split('?')[0] : '';
    const hash = url ? url.split('#')[1] : '';
    const segment = url ? (hash || clean.split('/').pop()) : '';
    const dot = segment.lastIndexOf('.');
    const extension = dot !== -1 ? segment.substring(dot + 1).toLowerCase() : '';
    const match = groups.find((entry) => entry[2].includes(extension)) || ['draft', 'blue'];
    const file = {};

    file.name = segment;
    file.extension = extension;
    file.image = images.includes(extension);
    file.icon = match[0];
    file.color = match[1];

    return file;
});
