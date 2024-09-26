// window.Asc.plugin.init = function() {
//     document.getElementById("uploadButton").addEventListener("click", function() {
//         var imageInput = document.getElementById("imageInput");
//         if (imageInput.files && imageInput.files[0]) {
//             var reader = new FileReader();
//             reader.onload = function(e) {
//                 var imgData = e.target.result;

//                 // 插入图片到文档中
//                 window.Asc.plugin.executeMethod("AddImage", [imgData]);
//             };
//             reader.readAsDataURL(imageInput.files[0]);
//         }
//     });
// };

// window.Asc.plugin.button = function(id) {
//     if (id === "back") {
//         this.executeCommand("close", "");
//     }
// };