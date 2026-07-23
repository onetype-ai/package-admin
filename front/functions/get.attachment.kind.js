admin.Fn('get.attachment.kind', function(name)
{
    const images = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif'];

    const kinds = {
        pdf: 'picture_as_pdf,red',
        zip: 'folder_zip,orange',
        rar: 'folder_zip,orange',
        doc: 'description,blue',
        docx: 'description,blue',
        txt: 'article,blue',
        md: 'article,blue',
        xls: 'table,green',
        xlsx: 'table,green',
        csv: 'table,green',
        jpg: 'image,green',
        jpeg: 'image,green',
        png: 'image,green',
        webp: 'image,green',
        svg: 'shapes,orange',
        mp4: 'movie,brand',
        webm: 'movie,brand',
        mp3: 'music_note,brand',
        wav: 'music_note,brand',
        js: 'code,orange',
        css: 'code,blue',
        html: 'code,red',
        json: 'data_object,green',
        fig: 'design_services,brand'
    };

    const extension = String(name).split('?')[0].split('.').pop().toLowerCase();
    const [icon, color] = (kinds[extension] || 'draft,blue').split(',');

    return {
        extension,
        image: images.includes(extension),
        icon,
        color
    };
});
