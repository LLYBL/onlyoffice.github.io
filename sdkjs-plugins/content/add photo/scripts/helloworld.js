(
    function(window, undefined) {
        let tfliteModel;
        window.Asc.plugin.init = function() {

            loadModelAndSetup();

            document.getElementById("processButton").addEventListener("click", function() {
                ProcessImg();
                var pretext = document.getElementById("Previewtext");
                pretext.style = "display:none;";
            });
            document.getElementById("uploadButton").addEventListener("click", function() {
                upload();
            });
            document.getElementById("imageInput").addEventListener("change", function(){
                const fileNameSpan = document.getElementById('fileName');
                const fileName = imageInput.files[0] ? imageInput.files[0].name : 'No file chosen';
                fileNameSpan.textContent = fileName;
            });
            document.getElementById("cancelButton").addEventListener("click", function() {
                window.Asc.plugin.executeCommand("close", ""); // Close plugin
            });
            // let b = document.getElementById("mess");
            // b.innerText = 'init finish'
            console('init finish')
            console(document.currentScript.src)
        };

        function console(mes) {
            let messageBox = document.getElementById("mess");
            var oritext = messageBox.innerText
            messageBox.innerText = oritext + '\n' + mes
                // console.log(oritext + '\n' + mes)
        }
        async function loadModelAndSetup() {
            tfliteModel = await tflite.loadTFLiteModel('./slim_reshape v2.tflite');
            console("Model loaded successfully");
        }

        function ProcessImg() {
            let imageInput = document.getElementById("imageInput");

            // if (imageInput.files && imageInput.files[0]) {
            //     let file = imageInput.files[0];
            //     let reader = new FileReader();
            //     reader.onload = function(e) {
            //         let imgData = e.target.result;
            //         if (imgData) {
            //             // 创建一个 Image 对象以获取实际尺寸
            //             let img = new Image();
            //             img.onload = function() {
            //                 let actualWidth = img.width;
            //                 let actualHeight = img.height;

            //                 let _param = {
            //                     "data": imgData,
            //                     "imgSrc": imgData, // 图片的 data URL
            //                     "guid": "asc.{0616AE85-5DBE-4B6B-A0A9-455C4F1503AD}", // 确保 GUID 是唯一的
            //                     "width": actualWidth / 10, // 将像素转换为磅（假设 96 DPI）
            //                     "height": actualHeight / 10, // 将像素转换为磅（假设 96 DPI）
            //                     "widthPix": actualWidth * 100, // 图片的宽度（像素）
            //                     "heightPix": actualHeight * 100 // 图片的高度（像素）
            //                 };

            //                 // 插入 OLE 对象
            //                 window.Asc.plugin.executeMethod("AddOleObject", [_param])
            //                     .then(() => {
            //                         window.Asc.plugin.executeCommand("close", ""); // Close plugin after image insertion
            //                     })
            //                     .catch((error) => {});
            //             };
            //             img.onerror = function(error) {};
            //             img.src = imgData; // 触发 image.onload
            //         } else {}
            //     };

            //     reader.onerror = function(error) {

            //     };

            //     reader.readAsDataURL(file);
            // } else {

            // }
            if (imageInput.files && imageInput.files[0]) {
                console('进入upload函数')
                const file = imageInput.files[0];
                const imageUrl = URL.createObjectURL(file);
                // const tfimg = new Image();
                // tfimg.src = imageUrl;

                const img = new Image();
                img.src = imageUrl;
                img.onload = async() => {
                    console('onload')

                    // 获取用户输入
                    var selectValue = getSelectedSizeValue();
                    // 获取输出像素 可以写个选择框给用户选
                    var targetWidth = 295;
                    var targetHeight = 413;
                    switch (selectValue) {
                        case "1":
                            // 1、 一寸：25mm x 35mm / 电子照：295px x 413px
                            var targetWidth = 295;
                            var targetHeight = 413;
                            break;
                        case "2":
                            // 2、 二寸：35mm x 49mm / 电子照：413px x 579px
                            var targetWidth = 413;
                            var targetHeight = 579;
                            break;
                        case "3":
                            // 3、 小一寸：22mm x 32mm / 电子照：260px x 378px
                            var targetWidth = 260;
                            var targetHeight = 378;
                            break;
                        case "4":
                            // 4、 小二寸：35mm x 45mm / 电子照：413px x 531px
                            var targetWidth = 413;
                            var targetHeight = 531;
                            break;
                        case "5":
                            // 5、 大一寸：33mm x 48mm / 电子照：390px x 567px
                            var targetWidth = 390;
                            var targetHeight = 567;
                            break;
                        case "6":
                            // 6、 大二寸：35mm x 53mm / 电子照：413px x 626px
                            var targetWidth = 413;
                            var targetHeight = 626;
                            break;
                        case "7":
                            // 7、中国护照：33mm x 48mm / 电子照：390px x 567px
                            var targetWidth = 390;
                            var targetHeight = 567;
                            break;
                        case "8":
                            // 8、驾驶证：22mm x 32mm / 电子照：260px x 378px
                            var targetWidth = 260;
                            var targetHeight = 378;
                            break;
                        case "9":
                            // 9、电子驾照：44mm x 64mm / 电子照：520px x 756px
                            var targetWidth = 520;
                            var targetHeight = 756;
                            break;
                        case "10":
                            // 10、结婚登记照：49mm x 35mm / 电子照：579px x 413
                            var targetWidth = 579;
                            var targetHeight = 413;
                            break;
                        case "11":
                            // 11、二代身份证(350dpi)：26mm x 32mm / 电子照：358px x 441px
                            var targetWidth = 358;
                            var targetHeight = 441;
                            break;
                        case "12":
                            // 12、大学生图像信息采集：41 x 54mm / 电子照：480px x 640px
                            var targetWidth = 480;
                            var targetHeight = 640;
                            break;
                        case "13":
                            // 13、电子社保卡：30mm x 37mm / 电子照：358px x 441px
                            var targetWidth = 358;
                            var targetHeight = 441;
                            break;
                        default:
                            var targetWidth = 295;
                            var targetHeight = 413;
                    }
                    // 1、 一寸：25mm x 35mm / 电子照：295px x 413px
                    // 2、 二寸：35mm x 49mm / 电子照：413px x 579px
                    // 3、 小二寸：35mm x 45mm / 电子照：413px x 531px
                    // 4、 小一寸：22mm x 32mm / 电子照：260px x 378px
                    // 5、 大一寸：33mm x 48mm / 电子照：390px x 567px
                    // 6、 大二寸：35mm x 53mm / 电子照：413px x 626px
                    // 7、中国护照：33mm x 48mm / 电子照：390px x 567px
                    // 8、驾驶证：22mm x 32mm / 电子照：260px x 378px
                    // 9、电子驾照：44mm x 64mm / 电子照：520px x 756px
                    // 8、结婚登记照：49mm x 35mm / 电子照：579px x 413
                    // 9、二代身份证(350dpi)：26mm x 32mm / 电子照：358px x 441px
                    // 10、大学生图像信息采集：41 x 54mm / 电子照：480px x 640px
                    // 11、电子社保卡：30mm x 37mm / 电子照：358px x 441px
                    // const finalImage = tf.image.resizeBilinear(colorImage, [img.height, img.width], alignCorners = true);

                    // 获取背景颜色：
                    var selectColor = getSelectedColorValue();
                    var backgroundColor = [255, 0, 0];
                    switch (selectColor) {
                        case "1":
                            backgroundColor = [255, 0, 0];
                            break;
                        case "2":
                            backgroundColor = [255, 255, 255];
                            break;
                        case "3":
                            backgroundColor = [67, 142, 219]
                            break;
                        default:
                            backgroundColor = [255, 0, 0];
                    }


                    console('成功读取用户输入')





                    // 算法环节

                    const imgdata = tf.browser.fromPixels(img);
                    const resizedImageData = tf.image.resizeBilinear(imgdata, [512, 512], alignCorners = true);

                    const input = tf.expandDims(tf.div(resizedImageData, 255));

                    const outputTensor = tfliteModel.predict(input);
                    const output = outputTensor.arraySync()[0];

                    const reshapedOutput = tf.reshape(output, [512, 512]);
                    const mask = tf.greater(reshapedOutput, 0.5);

                    const expandedMask = tf.stack([mask, mask, mask], -1);



                    const redBackground = tf.tile(tf.tensor(backgroundColor, [1, 1, 3]), [512, 512, 1]);

                    // 应用掩码到图像，背景变为红色
                    const foreground = tf.mul(resizedImageData, expandedMask);
                    const invertedMask = tf.logicalNot(expandedMask);
                    const background = tf.mul(redBackground, invertedMask);
                    const colorImage = tf.add(foreground, background);

                    const scale = Math.max(targetWidth / img.width, targetHeight / img.height);
                    const newWidth = Math.round(img.width * scale);
                    const newHeight = Math.round(img.height * scale);

                    // 缩放图像
                    const scaleData = tf.image.resizeBilinear(colorImage, [newHeight, newWidth]);

                    // 计算裁剪起始位置
                    const startX = Math.floor((newWidth - targetWidth) / 2);
                    const startY = Math.floor((newHeight - targetHeight) / 2);

                    // 裁剪图像
                    const croppedImage = tf.squeeze(tf.image.cropAndResize(
                        tf.expandDims(scaleData, 0), [
                            [startY / newHeight, startX / newWidth, (startY + targetHeight) / newHeight, (startX + targetWidth) / newWidth]
                        ], [0], [targetHeight, targetWidth]
                    ));
                    console('算法结束，裁切方式为中心裁切')
                        // 在 Canvas 上显示结果
                        // canvas.width = 512;

                    // canvas.height = 1024;
                    const canvas = document.getElementById('pic');
                    await tf.browser.draw(tf.div(croppedImage, 255), canvas);
                    console('在插件内绘图')
                        // 释放资源
                        // URL.revokeObjectURL(imageUrl);
                        // img.dispose();
                        // input.dispose();
                        // outputTensor.dispose();
                        // mask.dispose();
                        // expandedMask.dispose();
                        // cropFloat.dispose();
                };









                // tfimg.onload = async() => {
                //     const imgdata = tf.browser.fromPixels(tfimg);
                //     const resizedImageData = tf.image.resizeBilinear(imgdata, [512, 512], alignCorners = true);
                //     messageBox.innerText = '3'

                //     const input = tf.expandDims(tf.div(resizedImageData, 255));
                //     // console.log(input.shape)
                //     // input.array().then(data => {
                //     //     console.log(data);
                //     // });
                //     // Run inference and get output tensors
                //     const outputTensor = tfliteModel.predict(input);
                //     const output = outputTensor.arraySync()[0];
                //     messageBox.innerText = '4'

                //     const reshapedOutput = tf.reshape(output, [512, 512]);
                //     const mask = tf.greater(reshapedOutput, 0.5);

                //     const expandedMask = tf.stack([mask, mask, mask], -1);

                //     // 应用掩码到图像
                //     const cropFloat = tf.mul(resizedImageData, expandedMask);
                //     const canvas = document.createElement('canvas');
                //     canvas.width = 512;
                //     canvas.height = 512;
                //     // document.body.appendChild(canvas);
                //     messageBox.innerText = '5'

                //     await tf.browser.draw(tf.div(cropFloat, 255), canvas);
                //     const imgData = canvas.toDataURL('image/png');

                //     messageBox.innerText = '6'


                // };
            }
        }
        // 获取单选框选中照片大小的值
        function getSelectedSizeValue() {
            // 获取 name 为 'size' 的所有 radio 按钮
            const radios = document.getElementsByName('size');
            
            // 遍历每个 radio 按钮，找出被选中的那个
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    return radios[i].value; // 返回选中 radio 的值
                }
            }
            return null; // 如果没有选中任何 radio
        }
        // 获取单选框选中照片背景颜色的值
        function getSelectedColorValue() {
            // 获取 name 为 'size' 的所有 radio 按钮
            const radios = document.getElementsByName('color');
            
            // 遍历每个 radio 按钮，找出被选中的那个
            for (let i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    return radios[i].value; // 返回选中 radio 的值
                }
            }
            return null; // 如果没有选中任何 radio
        }
        function upload() {
            const canvas = document.getElementById('pic');
            const ouputimgData = canvas.toDataURL('image/png');

            let oImageData = {
                "src": ouputimgData,
                "width": canvas.width,
                "height": canvas.height
            };
            window.Asc.plugin.executeMethod("PutImageDataToSelection", [oImageData]);
            window.Asc.plugin.executeCommand("close", "");




            // let outputImg = new Image();
            // outputImg.onload = function() {
            //     let actualWidth = outputImg.width;
            //     let actualHeight = outputImg.height;
            //     console("actualWidth:" + actualWidth)
            //     console("actualHeight:" + actualHeight)

            //     let _param = {
            //         // "data": ouputimgData,
            //         "imgSrc": ouputimgData, // 图片的 data URL
            //         "guid": "asc.{0616AE85-5DBE-4B6B-A0A9-455C4F1503AD}", // 确保 GUID 是唯一的
            //         "width": 25, // 将像素转换为磅
            //         "height": 35, // 将像素转换为磅 一寸照片
            //         "widthPix": actualWidth, // 图片的宽度（像素）
            //         "heightPix": actualHeight // 图片的高度（像素）
            //     };

            //     // 插入 OLE 对象
            //     window.Asc.plugin.executeMethod("AddOleObject", [_param])
            //         .then(() => {
            //             window.Asc.plugin.executeCommand("close", ""); // Close plugin after image insertion
            //         })
            //         .catch((error) => {});
            // };
            // outputImg.src = ouputimgData; // 触发 image.onload
        }
        window.Asc.plugin.button = function(id) {
            if (id == 0) {
                this.executeCommand("close", "");
            }
        };

    })(window, undefined);