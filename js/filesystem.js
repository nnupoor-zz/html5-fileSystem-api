
var localFileSystem = {
  fileSystem : null,
	requestQuotaForFileSystem : function(fileSize,fileType,callback){
  	  var self=this;
       self.fileSystem = null;
      window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
      if(fileType==='PERSISTENT')
      {
        window.requestFileSystem(window.PERSISTENT, fileSize, function(filesystem) {
        navigator.webkitPersistentStorage.requestQuota( fileSize, function(grantedBytes) { 
          window.webkitRequestFileSystem(PERSISTENT , grantedBytes, errorHandler);
          }, function(e) {
        console.log('Error', e);
        });
        fs=filesystem;
        callback(fs);
        },errorHandler);
      }
      else
      {
        window.requestFileSystem(window.TEMPORARY, fileSize, function(filesystem) {
        navigator.webkitPersistentStorage.requestQuota( fileSize, function(grantedBytes) { 
          window.webkitRequestFileSystem(TEMPORARY , grantedBytes, errorHandler);
          }, function(e) {
              console.log('Error', e);
          });
       self.fileSystem=filesystem;
       callback(fs);
        },errorHandler);
      }
    },
    createDirectory : function(fs,root,callback){
        fileSystem = fs;
 	    var mainfolder = root;
        fileSystem.root.getDirectory(fs.root.fullPath + '/' + mainfolder, {create:true}, function(dir) {
            resourceDIR = dir;
          },errorHandler);
        callback(true);
    },
    createSubDirectory : function(fs,filePath,callback){
       fs.root.getDirectory(/*'/'+root+'/'+'more_directories_inside_root'*/filePath, {create: true}, function(dirEntry) {
        callback(true)
        }, errorHandler);
    },
    countFiles : function(filePath,callback){
    	var files=[];
    	fs.root.getDirectory(filePath, {}, function(dirEntry){
          var dirReaderPlan = dirEntry.createReader();
          dirReaderPlan.readEntries(function(entries) {
          for(var i = 0; i < entries.length; i++)
          {
            var entryPl = entries[i];
            if (entryPl.isDirectory){
            }
            else if (entryPl.isFile)
            {
              files.push(entryPl.name);
            }
          }
          callback(files,files.length);
        }, errorHandler);
      }, errorHandler);	
    },

    saveFiles : function(data,filePath,callback){
    	window.requestFileSystem(window.TEMPORARY, 20*1024*1024, function (filesystem) {
        fs = filesystem;
        fs.root.getFile( filePath, {create: true,exclusive: true}, function(fileEntry) 
        {
	      fileEntry.createWriter(function(fileWriter) {
	      var status=false;

	      fileWriter.onerror = function(e) {
	        console.log('Write failed: ' +e.toString());
	      };
	      var blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
	      fileWriter.write(blob);
	      status=true;
	      callback(status); 
	     }, errorHandler);
       }, errorHandler);
      }, errorHandler);
    },

    readFiles : function(filePath,callback){
    	 fs.root.getFile(filePath, {}, function(fileEntry) {           
	     fileEntry.file(function(file) {
	     var reader = new FileReader();
	     reader.onloadend = function(e) { 
	     var jsonBlob = this.result;
	     if((typeof(jsonBlob))!=='object'){ var fileDataJson = JSON.parse(jsonBlob); }
	     else{var fileDataJson = jsonBlob;} 
	     callback(fileDataJson);
	     };
	     reader.readAsText(file);
       }, errorHandler);
      }, errorHandler);
    },

    replaceFiles : function(data,filePath,callback){
    	var self=this;
    	fs.root.getFile(filePath, {create: false}, function(fileEntry) {
           fileEntry.remove(function() {
          
           self.saveFiles(data,filePath,function(status){
           	callback(status);
           });
        }, errorHandler);
      }, errorHandler);
  },

  showUsedSpace : function(storageType){
    window.webkitStorageInfo.queryUsageAndQuota(webkitStorageInfo.PERSISTENT, //the type can be either TEMPORARY or PERSISTENT(storageType)
      function(used, remaining) {
          console.log("Used quota: " + used + ", remaining quota: " + remaining);
      }, function(e) {
          console.log('Error', e); 
    });
  }
}

function errorHandler(e) {
  var msg = '';
console.log(e);
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

// localFileSystem.createDirectoryForLoggedUser();

