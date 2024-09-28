(
    function(window, undefined) {
        let tfliteModel;
        // window.Asc.plugin.button = function(id) {
        //     console.log(id)
        //     this.executeCommand("close", '');
        // };
        window.Asc.plugin.button = function(id) {
            this.executeCommand("close", "");
        };
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
            show1();

            document.getElementById("imageInput").addEventListener("change", function() {
                const fileNameSpan = document.getElementById('fileName');
                const fileName = imageInput.files[0] ? imageInput.files[0].name : 'No file chosen';
                fileNameSpan.textContent = fileName;

                var canvas = document.getElementById("pic");
                const file = imageInput.files[0];
                const imageUrl = URL.createObjectURL(file);
                // const tfimg = new Image();
                // tfimg.src = imageUrl;

                const img = new Image();
                img.src = imageUrl;
                img.onload = function() {

                    var context = canvas.getContext("2d");
                    const parentDiv = canvas.parentElement;

                    const parentWidth = parentDiv.clientWidth;
                    const targetWidth = parentWidth * 0.7;
                    const scaleFactor = targetWidth / img.width;
                    const targetHeight = img.height * scaleFactor;

                    canvas.width = targetWidth;
                    canvas.height = targetHeight;

                    context.clearRect(0, 0, canvas.width, canvas.height);
                    context.drawImage(img, 0, 0, targetWidth, targetHeight);
                    var pretext = document.getElementById("Previewtext");
                    pretext.style = "display:none;";
                    // context.drawImage(img, 0, 0); // 将图片绘制到Canvas的左上角坐标位置（0,0）

                };
            });

            document.getElementById("usageGauide").addEventListener("click", function() {
                show1();
            });
            document.getElementById("phrequir").addEventListener("click", function() {
                show2();
            });
            document.getElementById("privacysta").addEventListener("click", function() {
                show3();
            });
        };

        function show1() {
            const c1 = document.getElementById('help1')
            const c2 = document.getElementById('help2')
            const c3 = document.getElementById('help3')

            c1.style.display = 'block';
            c2.style.display = 'none';
            c3.style.display = 'none';

            const t1 = document.getElementById('usageGauide')
            const t2 = document.getElementById('phrequir')
            const t3 = document.getElementById('privacysta')

            t1.style.backgroundColor = '#94b5ce'
            t2.style.backgroundColor = '#e4e4e4'
            t3.style.backgroundColor = '#e4e4e4'

            t1.style.color = '#fff'
            t2.style.color = '#000'
            t3.style.color = '#000'

        }

        function show2() {
            const c1 = document.getElementById('help1')
            const c2 = document.getElementById('help2')
            const c3 = document.getElementById('help3')

            c1.style.display = 'none';
            c2.style.display = 'block';
            c3.style.display = 'none';

            const t1 = document.getElementById('usageGauide')
            const t2 = document.getElementById('phrequir')
            const t3 = document.getElementById('privacysta')

            t2.style.backgroundColor = '#94b5ce'
            t1.style.backgroundColor = '#e4e4e4'
            t3.style.backgroundColor = '#e4e4e4'

            t1.style.color = '#000'
            t2.style.color = '#fff'
            t3.style.color = '#000'
        }

        function show3() {
            const c1 = document.getElementById('help1')
            const c2 = document.getElementById('help2')
            const c3 = document.getElementById('help3')

            c1.style.display = 'none';
            c2.style.display = 'none';
            c3.style.display = 'block';

            const t1 = document.getElementById('usageGauide')
            const t2 = document.getElementById('phrequir')
            const t3 = document.getElementById('privacysta')

            t3.style.backgroundColor = '#94b5ce'
            t2.style.backgroundColor = '#e4e4e4'
            t1.style.backgroundColor = '#e4e4e4'

            t1.style.color = '#000'
            t2.style.color = '#000'
            t3.style.color = '#fff'
        }


        function console(mes) {
            let messageBox = document.getElementById("mess");
            var oritext = messageBox.innerText
            messageBox.innerText = oritext + '\n' + mes
                // console.log(oritext + '\n' + mes)
        }
        async function loadModelAndSetup() {
            tfliteModel = await tflite.loadTFLiteModel('./slim_reshape v2.tflite');
            // console("Model loaded successfully");
        }

        function ProcessImg() {
            let imageInput = document.getElementById("imageInput");
            if (imageInput.files && imageInput.files[0]) {
                // console('进入upload函数')
                const file = imageInput.files[0];
                const imageUrl = URL.createObjectURL(file);
                // const tfimg = new Image();
                // tfimg.src = imageUrl;

                const img = new Image();
                img.src = imageUrl;
                img.onload = async() => {
                    // console('onload')

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


                    // console('成功读取用户输入')





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
                    const canvas = document.getElementById('pic');
                    await tf.browser.draw(tf.div(croppedImage, 255), canvas);
                    // console('在插件内绘图')
                    // 释放资源
                    // URL.revokeObjectURL(imageUrl);
                    // img.dispose();
                    // input.dispose();
                    // outputTensor.dispose();
                    // mask.dispose();
                    // expandedMask.dispose();
                    // cropFloat.dispose();
                };

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

        }

        window.Asc.plugin.onTranslate = function() {
            document.getElementById("Previewtext").innerHTML = window.Asc.plugin.tr("Select a photo for preview");
            document.getElementById("usageGauide").innerHTML = window.Asc.plugin.tr("Usage Guide");
            document.getElementById("phrequir").innerHTML = window.Asc.plugin.tr("Photo requirements");
            document.getElementById("privacysta").innerHTML = window.Asc.plugin.tr("Privacy Statement");
            document.getElementById("hint1").innerHTML = window.Asc.plugin.tr("Select an image to upload");
            document.getElementById("bt1").innerHTML = window.Asc.plugin.tr("Upload Image");
            document.getElementById("fileName").innerHTML = window.Asc.plugin.tr("No file chosen");
            document.getElementById("rad1").innerHTML = window.Asc.plugin.tr("1 inch");
            document.getElementById("rad2").innerHTML = window.Asc.plugin.tr("2 inches");
            document.getElementById("rad3").innerHTML = window.Asc.plugin.tr("small 1 inch");
            document.getElementById("rad4").innerHTML = window.Asc.plugin.tr("small 2 inches");
            document.getElementById("rad5").innerHTML = window.Asc.plugin.tr("large 1 inch");
            document.getElementById("rad6").innerHTML = window.Asc.plugin.tr("large 2 inches");
            document.getElementById("rad7").innerHTML = window.Asc.plugin.tr("Chinese passport");
            document.getElementById("rad8").innerHTML = window.Asc.plugin.tr("driving license");
            document.getElementById("rad9").innerHTML = window.Asc.plugin.tr("electronic driving license");
            document.getElementById("rad10").innerHTML = window.Asc.plugin.tr("marriage registration photo");
            document.getElementById("rad11").innerHTML = window.Asc.plugin.tr("second-generation identity card");
            document.getElementById("rad12").innerHTML = window.Asc.plugin.tr("image information collection for college students");
            document.getElementById("rad13").innerHTML = window.Asc.plugin.tr("electronic social security card");
            document.getElementById("hint2").innerHTML = window.Asc.plugin.tr("Select the background color");
            document.getElementById("color1").innerHTML = window.Asc.plugin.tr("red");
            document.getElementById("color2").innerHTML = window.Asc.plugin.tr("white");
            document.getElementById("color3").innerHTML = window.Asc.plugin.tr("blue");
            document.getElementById("processButton").innerHTML = window.Asc.plugin.tr("Process");
            document.getElementById("uploadButton").innerHTML = window.Asc.plugin.tr("Export");

            document.getElementById("help1").innerHTML = window.Asc.plugin.tr("Step 1: Select a suitable picture to upload.<br>Step 2: Select the required format and size.<br>Step 3: Click the Process button and preview the effect of the ID photo.<br>Step 4: Click Export and insert the picture into the document.");



            document.getElementById("help2").innerHTML = window.Asc.plugin.tr("Not all photos are suitable for conversion into ID photos. The photo you use needs to be a frontal photo without a hat, dressed appropriately. Normally, the two ear contours of a person and the place corresponding to the Adam's apple of a man should be seen in the photo, and the bottom is higher than the chest position.");
            document.getElementById("help3").innerHTML = window.Asc.plugin.tr("After installation, this plug-in runs offline and will not upload or store any processed pictures or other user data.");
            document.getElementById("typeSelect").innerHTML = window.Asc.plugin.tr("Select the photo type:");

        }

    })(window, undefined);