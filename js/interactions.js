//interactive code.
var folderInput=document.getElementById('addFolder'),
    fileName=document.getElementById('addFile'),
    fileDataInput=document.getElementById('fileData'),
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
        if(directoryName!==''&&filename!=='')
        {
            var directoryPath='/'+directoryName, filePath=directoryPath+'/'+filename,
                fileData=fileDataInput.value;
            localFileSystem.createDirectory(fs,directoryName,function(status){
                localFileSystem.saveFilesType('temporary',fileData,filePath,function(status){
                    fileListTemp.innerHTML+= '<li><a href="filesystem:http://localhost/temporary/" target="_blank">'+directoryName+'/'+filename+'</a></li> <button class="read">Read File</button>';
                });
            });
        }
        else if(directoryName!=='')
        {
            localFileSystem.createDirectory(fs,directoryName,function(status){
                    fileListTemp.innerHTML+= '<li><a href="filesystem:http://localhost/temporary/" target="_blank">'+directoryName+'</a></li> <button class="read">Read File</button>';
                });
        }
        else
        {
            var filePath=filename+'.txt', fileData=fileDataInput.value;
                localFileSystem.saveFilesType('temporary',fileData,filePath,function(status){
                    fileListTemp.innerHTML+= '<li><a href="filesystem:http://localhost/temporary/" target="_blank">'+filename+'</a></li> <button class="read">Read File</button>';
                });
        }
        
    });
 }

createFilePers.onclick=function(){
    var directoryName=folderInput.value,
        filename=fileName.value,
        grantedBytes=fileSize.value;
    grantedBytes=grantedBytes===''?100*1024*1024:grantedBytes*1024*1024;
    localFileSystem.requestQuotaForFileSystem(grantedBytes,'PERSISTENT',function(fs){
        if(directoryName!==''&&filename!=='')
        {
            var directoryPath='/'+directoryName, filePath=directoryPath+'/'+filename,
                fileData=fileDataInput.value;
            localFileSystem.createDirectory(fs,directoryName,function(status){
                localFileSystem.saveFilesType('persistent',fileData,filePath,function(status){
                    fileListTemp.innerHTML+= '<li><a href="filesystem:http://localhost/persistent/" target="_blank">'+directoryName+'/'+filename+'</a></li> <button class="read">Read File</button>';
                });
            });
        }
        else if(directoryName!=='')
        {
            localFileSystem.createDirectory(fs,directoryName,function(status){
                    fileListTemp.innerHTML+= '<li><a href="filesystem:http://localhost/persistent/" target="_blank">'+directoryName+'</a></li> <button class="read">Read File</button>';
                });
        }
        else
        {
            var filePath=filename+'.txt', fileData=fileDataInput.value;
                localFileSystem.saveFilesType('persistent',fileData,filePath,function(status){
                    fileListTemp.innerHTML+= '<li><a href="filesystem:http://localhost/persistent/" target="_blank">'+filename+'</a></li> <button class="read">Read File</button>';
                });
        }
        
    });
}