//interactive code.
var folderInput=document.getElementById('addFolder'),
    fileName=document.getElementById('addFile'),
    createFileTemp=document.getElementById('createFileTemp'),
    createFilePers=document.getElementById('createFilePers'),
    fileSize=document.getElementById('fileSize'),
    deleteTemp=document.getElementById('deleteTemp'),
    deletePers=document.getElementById('deletePers'),
    deleteAll=document.getElementById('deleteAll'),
    dataRemainingTemp=document.getElementById('temporaryData'),
    dataRemainigPers=document.getElementById('persistentData'),
    fileListTemp=document.getElementById('fileTrayTemporary'),
    fileListPers=document.getElementById('fileTrayPersistent');

createFileTemp.onclick = function(){
    var directoryName=folderInput.value,
        filename=fileName.value,
        grantedBytes=fileSize.value;
    grantedBytes=grantedBytes===''?100*1024*1024:grantedBytes*1024*1024;
    localFileSystem.requestQuotaForFileSystem(grantedBytes,'TEMPORARY',function(fs){
        console.log(fs);
        if(directoryName!==''&&filename!=='')
        {
            var directoryPath='/'+directoryName, filePath=directoryPath+'/'+filename;
            localFileSystem.createDirectory(fs,directoryName,function(status){
                localFileSystem.saveFiles('hello world',filePath,function(status){
                    fileListTemp.innerHTML+= '<li>'+directoryName+' '+filename+'</li> <button class="read">Read File</button>';
                });
            });
        }
        else if(directoryName!=='')
        {
            localFileSystem.createDirectory(fs,directoryName,function(status){
                    fileListTemp.innerHTML+= '<li>'+directoryName+'</li> <button class="read">Read File</button>';
                });
        }
        else
        {
            var filePath=filename+'.txt';
                localFileSystem.saveFiles('hello world',filePath,function(status){
                    fileListTemp.innerHTML+= '<li>'+filename+'</li> <button class="read">Read File</button>';
                });
        }
        
    });
 }

createFilePers.onclick=function(){
    var directoryName=folderInput.value,
        filename=fileName.value,
        grantedBytes=fileSize.value;
    grantedBytes=grantedBytes===''?100*1024*1024:grantedBytes*1024*1024;
    localFileSystem.createDirectoryForLoggedUser(grantedBytes,'PERSISTENT',function(status){

    });
}