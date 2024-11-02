import {nanoid} from "nanoid";

export function AppendFileInForm(records, form, formFile, formFileName) {
    var files = [];
    
    for (let index = 0; index < records.length; index++) {
        var docExt = GetFileExtension(records[index]);
        var file = {
            fileName: records[index].name,
            blobName: nanoid() + '.' + docExt
        };
        files.push(file);
        form.append(formFile, records[index]);
    }
    if (records != undefined && records.size > 0) {
        var docExt = records
            ?.name
                .substr(records
                    ?.name.lastIndexOf('.') + 1);
        var file = {
            fileName: records.name,
            blobName: nanoid() + '.' + docExt
        };
        files.push(file);
        form.append(formFile, records);
    }
    form.append(formFileName,JSON.stringify(files));
    return {formData: form, files: files};
}

export function AppendFileForRecords(records, form, formFile, formFileName) {
    var files = [];
    for (let index = 0; index < records.length; index++) {
        var record=records[index] ;
            if(record instanceof(File))
            {
                    const fileUploaded = record;
                    var docExt = GetFileExtension(fileUploaded);
                    var file = {
                        fileName: fileUploaded.name,
                        blobName: nanoid() + '.' + docExt
                    };
                    files.push(file);
                    form.append(formFile, fileUploaded);
            }
            else{
                files.push(record);
            }
    }
    form.append(formFileName,JSON.stringify(files));
    return {formData: form, files: files};
}

function GetFileExtension(file) {
    return file
        ?.name
            .substr(file
                ?.name.lastIndexOf('.') + 1);
}

export function AppendDocWithExistingDoc(existing,newDoc)
{
    var updatedDoc= existing!=null && existing!="" ? JSON.parse(existing):[];
    if(newDoc.length>0)
    {
     updatedDoc=updatedDoc.concat(newDoc);
    }
    return updatedDoc;
}